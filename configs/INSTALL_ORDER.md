# HexTactics Config Install Order

Gebruik deze volgorde voor een schone Paper 1.21.11 setup.

## 1. Server basis

Kopieer of vergelijk:

```txt
configs/server/server.properties.example
```

Naar:

```txt
server.properties
```

Pas minimaal aan:

```txt
rcon.password
max-players
view-distance
simulation-distance
```

## 2. Plugins installeren

Gebruik:

```txt
PLUGIN_SETUP.md
```

Installeer eerst:

```txt
LuckPerms
Vault
EssentialsX
EssentialsXSpawn
PlaceholderAPI
ProtocolLib
MiniMOTD
Geyser
Floodgate
ViaVersion
ViaBackwards
WorldGuard
FAWE
CoreProtect
DeluxeMenus
TAB
HexTacticsStore
```

## 3. Eerste start

Start server 1x met plugins.
Stop daarna de server.

## 4. Configs kopiëren

### LuckPerms

Gebruik commands uit:

```txt
configs/luckperms/setup-commands.txt
```

### Essentials

Kopieer/vergelijk:

```txt
configs/essentials/config.yml
configs/essentials/kits.yml
```

Naar:

```txt
plugins/Essentials/config.yml
plugins/Essentials/kits.yml
```

### MiniMOTD

Kopieer:

```txt
configs/minimotd/main.conf
```

Naar:

```txt
plugins/MiniMOTD/main.conf
```

### DeluxeMenus

Kopieer:

```txt
configs/deluxemenus/config.yml
configs/deluxemenus/main_menu.yml
configs/deluxemenus/rules_menu.yml
configs/deluxemenus/ranks_menu.yml
```

Naar:

```txt
plugins/DeluxeMenus/config.yml
plugins/DeluxeMenus/gui_menus/main_menu.yml
plugins/DeluxeMenus/gui_menus/rules_menu.yml
plugins/DeluxeMenus/gui_menus/ranks_menu.yml
```

### TAB

Kopieer/vergelijk:

```txt
configs/tab/config.yml
```

Naar:

```txt
plugins/TAB/config.yml
```

### HexTacticsStore

Kopieer:

```txt
configs/hextacticsstore/config.yml
```

Naar:

```txt
plugins/HexTacticsStore/config.yml
```

Verander altijd:

```txt
security.api-token
```

### Geyser/Floodgate

Gebruik checklist:

```txt
configs/geyser/config-notes.yml
```

### DiscordSRV

Gebruik checklist:

```txt
configs/discordsrv/config-notes.yml
```

Vul nooit je echte bot token in GitHub.

## 5. Wereld setup

Gebruik:

```txt
configs/chunky/commands.txt
configs/worldguard/spawn-protection-commands.txt
```

## 6. Test commands

```txt
/plugins
/lp editor
/kit starter
/menu
/rules
/ranks
/hextacticsstore reload
/hextacticsstore deliver JouwNaam vip
```

## 7. Klaar voor webshop

Als dit werkt, koppel daarna Stripe/worker aan:

```txt
worker/PLUGIN_MODE.md
DEPLOYMENT.md
```
