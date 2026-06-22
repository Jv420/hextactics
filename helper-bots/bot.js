require('dotenv').config();

const fs = require('fs');
const mineflayer = require('mineflayer');
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');
const { GoalNear, GoalFollow, GoalBlock } = goals;
const axios = require('axios');
const { status } = require('minecraft-server-util');

const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
const bots = new Map();
const lastCommandAt = new Map();

const settings = {
  host: process.env.BOT_HOST || config.server.host,
  port: Number(process.env.BOT_PORT || config.server.port),
  version: process.env.BOT_VERSION || config.server.version,
  auth: process.env.BOT_AUTH || config.server.auth,
  ownerUsername: process.env.OWNER_USERNAME || config.ownerUsername,
  discordWebhook: process.env.DISCORD_WEBHOOK_URL || '',
  cooldownSeconds: Number(process.env.COMMAND_COOLDOWN_SECONDS || config.safety.commandCooldownSeconds || 5),
  autoReconnect: String(process.env.AUTO_RECONNECT || config.safety.autoReconnect) === 'true',
  reconnectDelaySeconds: Number(process.env.RECONNECT_DELAY_SECONDS || config.safety.reconnectDelaySeconds || 20),
  pingBotUrl: process.env.PING_BOT_URL || '',
  pingBotToken: process.env.PING_BOT_TOKEN || ''
};

function log(message) {
  const line = `[HexTactics Helpers] ${message}`;
  console.log(line);
  if (settings.discordWebhook) {
    axios.post(settings.discordWebhook, { content: line }).catch(() => {});
  }
}

async function checkMinecraftStatus() {
  const result = await status(settings.host, settings.port, { timeout: 5000 });
  return {
    online: true,
    host: settings.host,
    port: settings.port,
    playersOnline: result.players.online,
    maxPlayers: result.players.max,
    latency: result.roundTripLatency,
    version: result.version.name,
    motd: result.motd.clean
  };
}

async function checkPingBotHealth() {
  if (!settings.pingBotUrl) return null;
  const url = `${settings.pingBotUrl.replace(/\/$/, '')}/health`;
  const response = await axios.get(url, { timeout: 5000 });
  return response.data;
}

async function checkPingBotStatus() {
  if (!settings.pingBotUrl) return null;
  const base = settings.pingBotUrl.replace(/\/$/, '');
  const tokenQuery = settings.pingBotToken ? `?token=${encodeURIComponent(settings.pingBotToken)}` : '';
  const response = await axios.get(`${base}/status${tokenQuery}`, { timeout: 5000 });
  return response.data;
}

function createBot(botConfig) {
  const bot = mineflayer.createBot({
    host: settings.host,
    port: settings.port,
    username: botConfig.name,
    version: settings.version,
    auth: settings.auth
  });

  bot.role = botConfig.role;
  bot.loadPlugin(pathfinder);

  bot.once('spawn', () => {
    const mcData = require('minecraft-data')(bot.version);
    bot.pathfinder.setMovements(new Movements(bot, mcData));
    log(`${bot.username} joined als ${bot.role}`);
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    if (username !== settings.ownerUsername) return;
    if (!message.startsWith('!')) return;

    if (!canRunCommand(username)) {
      if (bot.role === 'commander') bot.chat('Command cooldown actief. Wacht even.');
      return;
    }

    handleCommand(bot, username, message.trim()).catch(error => {
      bot.chat(`Command fout: ${error.message}`);
      log(`Command fout bij ${message}: ${error.message}`);
    });
  });

  bot.on('kicked', reason => log(`${bot.username} kicked: ${reason}`));
  bot.on('error', error => log(`${bot.username} error: ${error.message}`));
  bot.on('end', () => {
    log(`${bot.username} disconnected.`);
    bots.delete(bot.username);
    if (settings.autoReconnect) {
      setTimeout(() => createBot(botConfig), settings.reconnectDelaySeconds * 1000);
    }
  });

  bots.set(botConfig.name, bot);
}

function canRunCommand(username) {
  const now = Date.now();
  const last = lastCommandAt.get(username) || 0;
  if (now - last < settings.cooldownSeconds * 1000) return false;
  lastCommandAt.set(username, now);
  return true;
}

function getWorkers() {
  return [...bots.values()].filter(bot => bot.role !== 'commander');
}

async function handleCommand(bot, username, message) {
  const args = message.split(' ');
  const cmd = args[0].toLowerCase();

  if (cmd === '!help') {
    bot.chat('Commands: !status, !ping, !server, !health, !follow, !stop, !come, !goto spawn|farm|build, !builder test, !farm test');
    return;
  }

  if (cmd === '!status') {
    const online = [...bots.values()].map(b => `${b.username}:${b.role}`).join(', ');
    bot.chat(`Helpers online: ${online}`);
    log(`Status gevraagd door ${username}: ${online}`);
    return;
  }

  if (cmd === '!ping' || cmd === '!server') {
    try {
      const mc = await checkMinecraftStatus();
      const msg = `Server online: ${mc.playersOnline}/${mc.maxPlayers} spelers | ping ${mc.latency}ms | ${mc.version}`;
      bot.chat(msg);
      log(msg);
    } catch (error) {
      bot.chat(`Server ping fout: ${error.message}`);
      log(`Server ping fout: ${error.message}`);
    }
    return;
  }

  if (cmd === '!health') {
    try {
      const health = await checkPingBotHealth();
      if (!health) {
        bot.chat('PING_BOT_URL is niet ingesteld. Gebruik !ping voor directe Minecraft status.');
        return;
      }
      bot.chat(`Ping-bot health: ${health.ok ? 'OK' : 'NIET OK'} | ${health.service || 'unknown'}`);
      const fullStatus = await checkPingBotStatus().catch(() => null);
      if (fullStatus?.minecraft) {
        const mc = fullStatus.minecraft;
        bot.chat(`Ping-bot Minecraft: ${mc.online ? 'online' : 'offline'} | ${mc.playersOnline || 0}/${mc.maxPlayers || 0}`);
      }
    } catch (error) {
      bot.chat(`Health fout: ${error.message}`);
      log(`Health fout: ${error.message}`);
    }
    return;
  }

  if (cmd === '!stop') {
    for (const worker of getWorkers()) {
      worker.pathfinder.setGoal(null);
      worker.clearControlStates();
    }
    bot.chat('Alle worker bots gestopt.');
    return;
  }

  if (cmd === '!follow') {
    for (const worker of getWorkers()) {
      const target = worker.players[username]?.entity;
      if (target) worker.pathfinder.setGoal(new GoalFollow(target, 2), true);
    }
    bot.chat('Workers volgen jou nu.');
    return;
  }

  if (cmd === '!come') {
    for (const worker of getWorkers()) {
      const target = worker.players[username]?.entity;
      if (target) worker.pathfinder.setGoal(new GoalNear(target.position.x, target.position.y, target.position.z, 2));
    }
    bot.chat('Workers komen naar je toe.');
    return;
  }

  if (cmd === '!goto') {
    const locationName = args[1];
    const loc = config.locations[locationName];
    if (!loc) {
      bot.chat('Onbekende locatie. Gebruik: spawn, farm, build');
      return;
    }
    for (const worker of getWorkers()) {
      worker.pathfinder.setGoal(new GoalBlock(loc.x, loc.y, loc.z));
    }
    bot.chat(`Workers gaan naar ${locationName}.`);
    return;
  }

  if (cmd === '!builder' && args[1] === 'test') {
    const builder = [...bots.values()].find(b => b.role === 'builder');
    if (!builder) return bot.chat('Geen builder bot online.');
    builder.chat('Builder test gestart. Geef mij blocks en gebruik later echte build templates.');
    log('Builder test uitgevoerd.');
    return;
  }

  if (cmd === '!farm' && args[1] === 'test') {
    const farmer = [...bots.values()].find(b => b.role === 'farmer');
    if (!farmer) return bot.chat('Geen farmer bot online.');
    farmer.chat('Farm test gestart. Ik kan naar farm locatie lopen en later oogsten/planten testen.');
    const loc = config.locations.farm;
    farmer.pathfinder.setGoal(new GoalBlock(loc.x, loc.y, loc.z));
    log('Farm test uitgevoerd.');
    return;
  }

  if (bot.role === 'commander') bot.chat('Onbekend command. Gebruik !help');
}

function start() {
  if (!settings.ownerUsername || settings.ownerUsername === 'JouwMinecraftNaam') {
    console.log('Stel eerst OWNER_USERNAME in config.json of env.example.txt in.');
    process.exit(1);
  }

  const maxBots = Math.min(config.safety.maxBots || 3, 3);
  config.bots.slice(0, maxBots).forEach((botConfig, index) => {
    setTimeout(() => createBot(botConfig), index * 3500);
  });
}

start();
