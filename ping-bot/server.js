require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { status } = require('minecraft-server-util');

const app = express();
app.use(cors());
app.use(express.json());

const config = {
  port: Number(process.env.PORT || 3001),
  mcHost: process.env.MC_HOST || 'play.hextactics.nl',
  mcPort: Number(process.env.MC_PORT || 25565),
  bedrockHost: process.env.BEDROCK_HOST || 'bedrock.hextactics.nl',
  bedrockPort: Number(process.env.BEDROCK_PORT || 19132),
  discordWebhook: process.env.DISCORD_WEBHOOK_URL || '',
  statusToken: process.env.STATUS_TOKEN || ''
};

let lastState = {
  online: null,
  checkedAt: null,
  playersOnline: 0,
  maxPlayers: 0,
  latency: null,
  error: null
};

async function sendDiscord(content) {
  if (!config.discordWebhook) return;
  try {
    await axios.post(config.discordWebhook, { content });
  } catch (error) {
    console.error('Discord webhook error:', error.message);
  }
}

async function checkMinecraft() {
  try {
    const result = await status(config.mcHost, config.mcPort, { timeout: 5000 });
    const newState = {
      online: true,
      checkedAt: new Date().toISOString(),
      playersOnline: result.players.online,
      maxPlayers: result.players.max,
      latency: result.roundTripLatency,
      version: result.version.name,
      motd: result.motd.clean,
      error: null
    };

    if (lastState.online === false) {
      await sendDiscord(`🟢 **HexTactics is weer online!** ${config.mcHost}:${config.mcPort}`);
    }

    lastState = newState;
    return newState;
  } catch (error) {
    const newState = {
      online: false,
      checkedAt: new Date().toISOString(),
      playersOnline: 0,
      maxPlayers: 0,
      latency: null,
      error: error.message
    };

    if (lastState.online !== false) {
      await sendDiscord(`🔴 **HexTactics lijkt offline!** ${config.mcHost}:${config.mcPort}\nError: ${error.message}`);
    }

    lastState = newState;
    return newState;
  }
}

function requireToken(req, res, next) {
  if (!config.statusToken || config.statusToken === 'change_this_optional_token') return next();
  const token = req.headers['x-status-token'] || req.query.token;
  if (token !== config.statusToken) return res.status(401).json({ ok: false, error: 'unauthorized' });
  next();
}

app.get('/', (req, res) => {
  res.json({
    ok: true,
    service: 'HexTactics Ping Bot',
    endpoints: ['/health', '/status', '/ping-minecraft']
  });
});

app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'HexTactics Ping Bot', time: new Date().toISOString() });
});

app.get('/status', requireToken, (req, res) => {
  res.json({
    ok: true,
    minecraft: lastState,
    java: `${config.mcHost}:${config.mcPort}`,
    bedrock: `${config.bedrockHost}:${config.bedrockPort}`
  });
});

app.get('/ping-minecraft', requireToken, async (req, res) => {
  const result = await checkMinecraft();
  res.json({ ok: true, minecraft: result });
});

app.post('/discord-test', requireToken, async (req, res) => {
  await sendDiscord('✅ HexTactics Ping Bot Discord test werkt.');
  res.json({ ok: true });
});

setInterval(checkMinecraft, 5 * 60 * 1000);
setTimeout(checkMinecraft, 3000);

app.listen(config.port, () => {
  console.log(`HexTactics Ping Bot draait op poort ${config.port}`);
});
