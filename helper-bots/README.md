# HexTactics Helper Bots

Veilige kleine helper-bot setup voor je eigen HexTactics server.

Deze setup gebruikt:

- 1 CommanderBot
- 2 WorkerBots
- Node.js
- Mineflayer
- Pathfinder
- Optionele Discord webhook logs

## Belangrijk

Gebruik dit alleen op je eigen server.

Niet gebruiken voor:

- AFK-limits omzeilen
- Player count kunstmatig boosten
- Massaal bots spammen
- Andere servers zonder toestemming

Deze setup is bedoeld voor:

- Testen van je server
- Testen van commands
- Helpers laten volgen
- Naar testlocaties lopen
- Simpele build/farm testcommands

## Installatie

```bash
cd helper-bots
npm install
```

Kopieer voorbeeld env:

```bash
copy env.example.txt .env
```

Of op Linux/Mac:

```bash
cp env.example.txt .env
```

Pas daarna aan:

```txt
OWNER_USERNAME=JouwMinecraftNaam
BOT_HOST=play.hextactics.nl
BOT_PORT=25565
BOT_VERSION=1.21.1
BOT_AUTH=offline
```

## Starten

```bash
npm start
```

## Commands in Minecraft chat

Alleen de eigenaar uit `OWNER_USERNAME` mag commands sturen.

```txt
!help
!status
!follow
!come
!stop
!goto spawn
!goto farm
!goto build
!builder test
!farm test
```

## Bot rollen

```txt
HexCommander = commander
HexBuilder = builder
HexFarmer = farmer
```

## Locaties aanpassen

Open:

```txt
config.json
```

Pas aan:

```json
"locations": {
  "spawn": { "x": 0, "y": 64, "z": 0 },
  "farm": { "x": 20, "y": 64, "z": 20 },
  "build": { "x": 30, "y": 64, "z": 30 }
}
```

## Discord logs

Maak een Discord webhook en zet hem in `.env`:

```txt
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
```

## Online-mode of offline-mode

Voor een lokale/offline testserver:

```txt
BOT_AUTH=offline
```

Voor Microsoft login heb je extra setup nodig. Begin eerst simpel met offline-mode op een testserver.

## Tips

1. Test eerst met 1 bot.
2. Zet daarna pas 2 worker bots aan.
3. Geef bots geen OP.
4. Maak een aparte testwereld of testgebied.
5. Houd commands rustig en overzichtelijk.
