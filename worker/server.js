require('dotenv').config();

const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
const { Rcon } = require('rcon-client');

const app = express();
const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

const PRODUCTS = {
  vip: {
    name: 'VIP Rank - 30 dagen',
    priceInCents: 499,
    commands: ['lp user {player} parent settemp vip 30d']
  },
  elite: {
    name: 'Elite Rank - 30 dagen',
    priceInCents: 999,
    commands: ['lp user {player} parent settemp elite 30d']
  },
  legend: {
    name: 'Legend Rank - 30 dagen',
    priceInCents: 1499,
    commands: ['lp user {player} parent settemp legend 30d']
  },
  keys_3: {
    name: '3 Premium Crate Keys',
    priceInCents: 299,
    commands: ['crate key give {player} premium 3']
  },
  pvp_bundle: {
    name: 'PvP Bundle',
    priceInCents: 399,
    commands: ['give {player} diamond_sword 1', 'give {player} golden_apple 8']
  },
  coins_50k: {
    name: '50.000 Coins',
    priceInCents: 499,
    commands: ['eco give {player} 50000']
  }
};

app.use(cors());
app.get('/health', (req, res) => res.json({ ok: true, service: 'HexTactics RCON Worker' }));

async function sendDiscord(message) {
  if (!process.env.DISCORD_WEBHOOK_URL) return;
  try {
    await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: message })
    });
  } catch (error) {
    console.error('Discord webhook error:', error.message);
  }
}

function getProductCommands(productKey) {
  return PRODUCTS[productKey]?.commands || null;
}

function isValidMinecraftName(player) {
  return typeof player === 'string' && /^[a-zA-Z0-9_.]{3,16}$/.test(player);
}

async function runRconCommands(commands) {
  const rcon = await Rcon.connect({
    host: process.env.RCON_HOST,
    port: Number(process.env.RCON_PORT || 25575),
    password: process.env.RCON_PASSWORD
  });

  try {
    const results = [];
    for (const command of commands) {
      results.push(await rcon.send(command));
    }
    return results;
  } finally {
    rcon.end();
  }
}

app.post('/stripe/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  if (!stripe) return res.status(500).send('Stripe not configured');

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, req.headers['stripe-signature'], process.env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    console.error('Webhook signature error:', error.message);
    return res.status(400).send('Invalid signature');
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const player = session.metadata?.player;
    const product = session.metadata?.product;
    const commandsTemplate = getProductCommands(product);

    if (!player || !commandsTemplate) {
      await sendDiscord(`HexTactics order mist metadata. Product: ${product || 'unknown'}, speler: ${player || 'unknown'}`);
      return res.json({ received: true });
    }

    const commands = commandsTemplate.map(cmd => cmd.replaceAll('{player}', player));
    try {
      await runRconCommands(commands);
      await sendDiscord(`HexTactics bestelling geleverd aan ${player} | Product: ${product}`);
    } catch (error) {
      console.error('RCON error:', error.message);
      await sendDiscord(`HexTactics RCON fout voor ${player} | Product: ${product} | ${error.message}`);
    }
  }

  res.json({ received: true });
});

app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  if (!stripe) return res.status(500).json({ error: 'Stripe is nog niet ingesteld.' });

  const { player, product } = req.body;
  const item = PRODUCTS[product];

  if (!isValidMinecraftName(player)) return res.status(400).json({ error: 'Ongeldige Minecraft gebruikersnaam.' });
  if (!item) return res.status(400).json({ error: 'Onbekend product.' });

  const baseUrl = process.env.WEBSITE_URL || 'https://hextactics.nl';

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card', 'ideal'],
    success_url: `${baseUrl}/success.html?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/shop.html`,
    metadata: { player, product },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'eur',
          unit_amount: item.priceInCents,
          product_data: {
            name: item.name,
            description: `HexTactics product voor Minecraft speler ${player}`
          }
        }
      }
    ]
  });

  res.json({ url: session.url });
});

app.post('/test-delivery', async (req, res) => {
  const { player, product } = req.body;
  const commandsTemplate = getProductCommands(product);
  if (!isValidMinecraftName(player) || !commandsTemplate) return res.status(400).json({ error: 'Gebruik: { player, product }' });
  const commands = commandsTemplate.map(cmd => cmd.replaceAll('{player}', player));
  const results = await runRconCommands(commands);
  res.json({ ok: true, commands, results });
});

const port = Number(process.env.PORT || 4000);
app.listen(port, () => console.log(`HexTactics RCON Worker draait op poort ${port}`));
