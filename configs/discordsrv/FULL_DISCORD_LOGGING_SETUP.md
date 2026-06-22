# HexTactics Full Discord Logging Setup

Doel: zoveel mogelijk server-events naar Discord sturen.

## Aanbevolen Discord kanalen

Maak deze kanalen in je Discord server:

```txt
📢｜announcements
💬｜minecraft-chat
👋｜joins-leaves
🟢｜online-status
🛒｜shop-orders
💰｜sales-trades
📊｜player-stats
🧾｜server-logs
🛡｜staff-logs
🚨｜alerts
```

## Welke plugin doet wat?

DiscordSRV is goed voor:

```txt
Minecraft chat -> Discord
Discord chat -> Minecraft
Join/leave berichten
Server start/stop berichten
Console/log kanaal
```

HexTacticsStore/worker is beter voor:

```txt
Aankopen
Webshop orders
Delivery success/fail
Stripe status
```

Extra plugin of eigen uitbreiding is nodig voor:

```txt
Verkoop/trade events
Player stats summaries
Online spelers status embed
Kills/deaths/statistieken
```

## Beste aanpak voor HexTactics

```txt
DiscordSRV = chat + server logs + join/leave
HexTacticsStore = shop aankopen + delivery logs
HexTacticsStats plugin later = online spelers + stats + kills/deaths
```

## DiscordSRV config checklist

In `plugins/DiscordSRV/config.yml`:

```yml
BotToken: "VUL_JE_BOT_TOKEN_IN"

Channels:
  global: "MINECRAFT_CHAT_CHANNEL_ID"

DiscordConsoleChannelId: "SERVER_LOGS_CHANNEL_ID"
DiscordChatChannelDiscordToMinecraft: true
DiscordChatChannelMinecraftToDiscord: true
DiscordChatChannelRequireLinkedAccount: false

MinecraftChatToDiscordMessageFormat: "**%primarygroup%** %displayname%: %message%"
DiscordToMinecraftChatMessageFormat: "&9Discord &8» &f%name%&7: &f%message%"

ServerWatchdogEnabled: true
```

## Alerts.yml advies

Gebruik `configs/discordsrv/alerts.yml` voor:

```txt
Join
Leave
Death
Achievement
Advancement
Server start
Server stop
Player count
```

## Webhooks

Maak aparte Discord webhooks voor:

```txt
shop-orders
sales-trades
player-stats
alerts
```

Gebruik deze in:

```txt
worker/.env
plugins/HexTacticsStore/config.yml
```

## Belangrijk

Zet nooit echte bot tokens, webhook URLs of API tokens in GitHub.
