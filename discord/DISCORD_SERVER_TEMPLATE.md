# HexTactics Discord Server Template

Complete Discord server-template voor **HexTactics**.

Thema:

```txt
HexTactics — Build. Raid. Survive. Conquer.
```

---

## 1. Server naam en branding

```txt
Server name: HexTactics
Icon: paars/rood tactical hexagon logo
Banner tekst: Build. Raid. Survive. Conquer.
Primary colors: Purple, Red, Gold, Dark Gray
```

---

## 2. Rollen

Maak rollen in deze volgorde van hoog naar laag.

```txt
👑 Owner
🛠 Admin
🛡 Moderator
🔨 Builder
🤖 Bot
💎 Legend
🔷 Elite
✅ VIP
⚔ Tactician
🧪 Beta Tester
🎮 Java Player
📱 Bedrock Player
👤 Member
🔇 Muted
```

### Kleuradvies

```txt
Owner: Dark Red
Admin: Red
Moderator: Blue
Builder: Yellow
Bot: Purple
Legend: Gold
Elite: Aqua
VIP: Green
Tactician: Purple
Beta Tester: Orange
Java Player: Lime
Bedrock Player: Cyan
Member: Gray
Muted: Dark Gray
```

---

## 3. Categorieën en kanalen

### 📌 INFORMATION

```txt
📢｜announcements
📜｜rules
🎮｜how-to-join
🛒｜store-info
🗺｜server-info
📊｜server-status
```

### 💬 COMMUNITY

```txt
💬｜general
🎮｜minecraft-chat
📸｜media
🎬｜clips
🤝｜looking-for-team
💡｜suggestions
```

### ⚔ HEXTACTICS GAMEPLAY

```txt
⚔｜pvp-talk
🏰｜base-showcase
💰｜trading
🧾｜auction-talk
🎁｜giveaways
🏆｜leaderboards
```

### 🛒 SHOP & SUPPORT

```txt
🛒｜shop-orders
💰｜sales-trades
🎫｜support
🧾｜order-help
🚨｜reports
🔨｜ban-appeals
```

### 📡 SERVER LOGS

```txt
👋｜joins-leaves
🟢｜online-status
📊｜player-stats
🧾｜server-logs
🚨｜alerts
```

### 🛡 STAFF ONLY

```txt
🛡｜staff-chat
📋｜staff-todo
🔐｜staff-logs
⚙｜admin-commands
```

---

## 4. Permissie-advies

### Iedereen / Member

Toestaan:

```txt
View Channels
Send Messages
Read Message History
Add Reactions
Use Slash Commands
Connect
Speak
```

Niet toestaan:

```txt
Manage Channels
Manage Roles
Manage Webhooks
Administrator
Mention @everyone
Ban Members
Kick Members
```

### Staff

Moderator:

```txt
Manage Messages
Timeout Members
Kick Members
View Audit Log
```

Admin:

```txt
Manage Channels
Manage Messages
Manage Nicknames
Ban Members
Kick Members
```

Owner:

```txt
Administrator
```

---

## 5. Kanaalbeschrijvingen

### 📜｜rules

```txt
Lees de regels voordat je speelt. Door HexTactics te joinen ga je akkoord met onze serverregels.
```

### 🎮｜how-to-join

```txt
Java IP: play.hextactics.nl
Bedrock IP: bedrock.hextactics.nl
Bedrock Port: 19132
```

### 🛒｜store-info

```txt
Koop ranks, keys en bundles via shop.hextactics.nl. Vul je Minecraft naam exact goed in.
```

### 🎫｜support

```txt
Open hier een ticket bij problemen met de server, shop of je rank.
```

### 🧾｜order-help

```txt
Gebruik dit kanaal als je aankoop niet automatisch is geleverd.
```

---

## 6. Embed templates

### Welcome embed

```txt
Title: Welkom bij HexTactics!
Description:
Welkom bij HexTactics — Tactical Survival.

Java: play.hextactics.nl
Bedrock: bedrock.hextactics.nl:19132
Shop: shop.hextactics.nl

Build. Raid. Survive. Conquer.
Color: Purple
```

### Rules embed

```txt
Title: HexTactics Regels
Description:
1. Geen dupes, crash exploits of lag machines.
2. PvP en raiden zijn toegestaan binnen de regels.
3. Geen haat, spam of bedreigingen.
4. Gebruik geen bugs voor voordeel.
5. Vul je Minecraft naam correct in bij aankopen.
6. Staff heeft altijd het laatste woord.
Color: Red
```

### Store embed

```txt
Title: HexTactics Store
Description:
Ranks, keys, coins en bundles zijn beschikbaar via onze shop.

Shop: shop.hextactics.nl
Support: #order-help
Color: Gold
```

---

## 7. Bot/webhook namen

Maak deze webhooks:

```txt
HexTactics Shop -> #shop-orders
HexTactics Alerts -> #alerts
HexTactics Status -> #online-status
HexTactics Logs -> #joins-leaves
HexTactics Stats -> #player-stats
HexTactics Sales -> #sales-trades
```

Gebruik de webhook URLs in:

```txt
plugins/HexTacticsStore/config.yml
worker/.env
```

Nooit echte webhook URLs in GitHub zetten.

---

## 8. DiscordSRV mapping

Gebruik:

```txt
minecraft-chat channel ID -> DiscordSRV Channels.global
server-logs channel ID -> DiscordSRV DiscordConsoleChannelId
```

HexTacticsStore gebruikt webhooks voor:

```txt
shop-orders
joins-leaves
online-status
player-stats
alerts
```

---

## 9. Aanbevolen Discord onboarding

Zet server guide/onboarding aan met vragen:

```txt
Speel je Java of Bedrock?
- Java Player
- Bedrock Player

Waar kom je voor?
- PvP
- Survival
- Trading
- Building
```

---

## 10. Launch checklist

```txt
[ ] Rollen aangemaakt
[ ] Kanalen aangemaakt
[ ] Webhooks aangemaakt
[ ] DiscordSRV bot toegevoegd
[ ] DiscordSRV config ingevuld
[ ] HexTacticsStore webhooks ingevuld
[ ] Test join/leave logs
[ ] Test shop order log
[ ] Test online status log
[ ] Test player death log
```
