# HexTactics Ping Bot + UptimeRobot

Veilige ping/status bot voor HexTactics.

Deze bot doet **geen playercount/AFK automatisering**. Hij draait alleen een webservice met health endpoints en checkt of je Minecraft server online is.

## Wat doet dit?

- `/health` voor UptimeRobot
- `/status` voor laatste Minecraft status
- `/ping-minecraft` voor directe Minecraft server check
- Discord melding als Minecraft offline/online gaat

## Installatie

```bash
cd ping-bot
npm install
copy env.example.txt .env
npm start
```

Linux/Mac:

```bash
cd ping-bot
npm install
cp env.example.txt .env
npm start
```

## .env instellen

```txt
PORT=3001
MC_HOST=play.hextactics.nl
MC_PORT=25565
BEDROCK_HOST=bedrock.hextactics.nl
BEDROCK_PORT=19132
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
STATUS_TOKEN=maak_een_geheime_token
```

## Endpoints

```txt
GET /health
GET /status
GET /ping-minecraft
POST /discord-test
```

Voorbeeld lokaal:

```txt
http://localhost:3001/health
http://localhost:3001/status
http://localhost:3001/ping-minecraft
```

## UptimeRobot instellen

1. Ga naar UptimeRobot.
2. Kies **New Monitor**.
3. Monitor Type: **HTTP(s)**.
4. Friendly Name: `HexTactics Ping Bot`.
5. URL:

```txt
https://jouw-ping-bot-url.nl/health
```

6. Monitoring interval: 5 minuten.
7. Zet alerts aan via e-mail of Discord/integratie.

## Render/Railway/VPS hosting

Je kunt deze ping-bot gratis of goedkoop hosten op:

- Render
- Railway
- eigen VPS
- eigen Windows pc met port forwarding

Belangrijk: als je gratis hosting slaapt, kan UptimeRobot alleen de webservice wakker maken. Dit is bedoeld voor status/monitoring, niet om Minecraft-spelers te faken.

## Discord test

```bash
curl -X POST "https://jouw-ping-bot-url.nl/discord-test?token=JOUW_STATUS_TOKEN"
```

## Minecraft status test

```bash
curl "https://jouw-ping-bot-url.nl/ping-minecraft?token=JOUW_STATUS_TOKEN"
```

## Aanbevolen Discord kanaal

```txt
🟢｜online-status
🚨｜alerts
```

Gebruik de webhook van `alerts` of `online-status` in `.env`.
