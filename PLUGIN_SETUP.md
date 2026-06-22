# HexTactics Plugin Setup - Paper 1.21.11

Deze lijst is gemaakt voor **HexTactics** op **Paper 1.21.11** met Java 21.

Doel:

- Survival / tactical SMP
- Economy
- Ranks
- Crates
- NPC's
- Webshop delivery
- Java + Bedrock crossplay
- Goede basisbeveiliging

> Download plugins bij voorkeur alleen van de officiële pagina's hieronder. Vermijd random mirrors.

---

## Installatievolgorde

1. Start Paper 1.21.11 één keer zonder plugins.
2. Stop de server.
3. Installeer eerst de basis dependencies.
4. Start opnieuw en check errors.
5. Installeer gameplay plugins per groep.
6. Start opnieuw na elke groep.
7. Configureer LuckPerms, Essentials, Geyser/Floodgate en HexTacticsStore.

---

## 1. Verplicht - Core basis

| Plugin | Waarvoor | Download |
|---|---|---|
| LuckPerms | Ranks en permissies | https://luckperms.net/download |
| Vault | Economy/permissions bridge | https://www.spigotmc.org/resources/vault.34315/ |
| EssentialsX | Basis commands, homes, spawn, economy | https://essentialsx.net/downloads.html |
| PlaceholderAPI | Placeholders voor TAB, scoreboards en menus | https://www.spigotmc.org/resources/placeholderapi.6245/ |
| ProtocolLib | Dependency voor veel plugins | https://www.spigotmc.org/resources/protocollib.1997/ |

Aanbevolen EssentialsX jars:

- `EssentialsX`
- `EssentialsXSpawn`
- Optioneel: `EssentialsXChat`
- Optioneel: `EssentialsXDiscord`

---

## 2. Crossplay - Java + Bedrock

| Plugin | Waarvoor | Download |
|---|---|---|
| Geyser-Spigot | Bedrock spelers laten joinen op Java server | https://geysermc.org/download |
| Floodgate-Spigot | Bedrock spelers zonder Java account toelaten | https://geysermc.org/download |
| ViaVersion | Nieuwe/andere clientversies ondersteunen | https://hangar.papermc.io/ViaVersion/ViaVersion |
| ViaBackwards | Oudere clientversies ondersteunen | https://hangar.papermc.io/ViaVersion/ViaBackwards |

Belangrijk:

- Java poort meestal: `25565`
- Bedrock poort meestal: `19132`
- Zet Floodgate key goed in Geyser config.

---

## 3. Website / shop delivery

| Plugin | Waarvoor | Download |
|---|---|---|
| HexTacticsStore | Eigen webshop delivery plugin | Bouw zelf uit deze repo: `plugin/` |

Build command:

```bash
cd plugin
mvn clean package
```

Output:

```txt
plugin/target/HexTacticsStore.jar
```

Plaats deze jar in:

```txt
/plugins
```

Na eerste start configureer:

```txt
/plugins/HexTacticsStore/config.yml
```

---

## 4. Server uiterlijk / branding

| Plugin | Waarvoor | Download |
|---|---|---|
| MiniMOTD | Mooie server MOTD | https://modrinth.com/plugin/minimotd |
| TAB | Tablist, nametags en header/footer | https://github.com/NEZNAMY/TAB/releases |
| FancyHolograms | Holograms bij spawn | https://modrinth.com/plugin/fancyholograms |
| FancyNpcs | NPC's voor shop, RTP, rules en Discord | https://modrinth.com/plugin/fancynpcs |

Gebruik deze MOTD:

```txt
&5&lHexTactics &8| &dTactical Survival
&6⚔ Raid &8• &cPvP &8• &bJava + Bedrock &8• &aplay.hextactics.nl
```

---

## 5. Wereldbeheer en bescherming

| Plugin | Waarvoor | Download |
|---|---|---|
| FastAsyncWorldEdit | Snel bouwen/editten | https://intellectualsites.github.io/download/fawe.html |
| WorldGuard | Regio protectie voor spawn | https://dev.bukkit.org/projects/worldguard |
| CoreProtect | Rollbacks en grief logging | https://www.spigotmc.org/resources/coreprotect.8631/ |
| Chunky | Wereld pre-genereren | https://modrinth.com/plugin/chunky |
| ChunkyBorder | Worldborder koppeling voor Chunky | https://modrinth.com/plugin/chunkyborder |

Aanrader:

```txt
Gebruik WorldGuard voor spawn bescherming.
Gebruik CoreProtect altijd vanaf dag 1.
Gebruik Chunky voordat je de server public maakt.
```

---

## 6. Gameplay / survival / tactical

| Plugin | Waarvoor | Download |
|---|---|---|
| BetterRTP | Random teleport | https://www.spigotmc.org/resources/betterrtp.36081/ |
| CombatLogX | PvP combat logging voorkomen | https://www.spigotmc.org/resources/combatlogx.31689/ |
| GSit | Zitten/liggen/crawl animaties | https://modrinth.com/plugin/gsit |
| Graves | Spullen bewaren na dood | https://modrinth.com/plugin/graves |

Optioneel voor clans/teams:

| Plugin | Waarvoor | Download |
|---|---|---|
| SimpleClans | Clans / teams | https://www.spigotmc.org/resources/simpleclans.71242/ |
| Lands | Claims, landen en teams | https://www.spigotmc.org/resources/lands.53313/ |

Voor HexTactics zou ik kiezen:

```txt
Start simpel: BetterRTP + CombatLogX + GSit
Later: SimpleClans of Lands
```

---

## 7. Economy, shop en trading

| Plugin | Waarvoor | Download |
|---|---|---|
| EconomyShopGUI | Server shop GUI | https://www.spigotmc.org/resources/economyshopgui.69927/ |
| ChestShop | Player shops met chests | https://www.spigotmc.org/resources/chestshop.51856/ |
| AuctionHouse | Veilingen/player market | https://www.spigotmc.org/resources/auctionhouse.61836/ |

Let op:

- Kies niet te veel economy plugins tegelijk.
- EssentialsX economy + Vault is genoeg als basis.
- Later kun je een betere economy plugin toevoegen.

---

## 8. Crates / keys

Gratis/bekende opties:

| Plugin | Waarvoor | Download |
|---|---|---|
| ExcellentCrates | Crates en keys | https://www.spigotmc.org/resources/excellentcrates-advanced-custom-crates.48732/ |
| CrazyCrates | Crates en rewards | https://www.spigotmc.org/resources/crazy-crates.17599/ |

Gebruik in HexTacticsStore config dezelfde key command als jouw crate plugin gebruikt.

Voorbeeld:

```yml
keys_3:
  commands:
    - "crate key give {player} premium 3"
```

Pas dit aan als jouw crate plugin een ander command gebruikt.

---

## 9. Menus / GUI

| Plugin | Waarvoor | Download |
|---|---|---|
| DeluxeMenus | Menus voor rules, shop, warps, commands | https://www.spigotmc.org/resources/deluxemenus.11734/ |
| CommandPanels | Alternatief voor menu's | https://www.spigotmc.org/resources/commandpanels.67788/ |

Aanbevolen voor HexTactics:

```txt
DeluxeMenus
```

Menus die je kunt maken:

- `/menu`
- `/rules`
- `/shop`
- `/discord`
- `/ranks`
- `/rtp`

---

## 10. Discord en logs

| Plugin | Waarvoor | Download |
|---|---|---|
| DiscordSRV | Minecraft chat/logs naar Discord | https://www.spigotmc.org/resources/discordsrv.18494/ |
| Plan | Server analytics | https://www.spigotmc.org/resources/plan-player-analytics.32536/ |

Aanrader:

```txt
DiscordSRV voor chat en joins.
Worker/HexTacticsStore webhook voor webshop ordermeldingen.
```

---

## 11. Map plugin optioneel

| Plugin | Waarvoor | Download |
|---|---|---|
| BlueMap | Mooie 3D webmap | https://bluemap.bluecolored.de/ |
| Dynmap | Klassieke Minecraft webmap | https://www.spigotmc.org/resources/dynmap.274/ |

Mijn advies:

```txt
Gebruik BlueMap als je een moderne map wilt.
Gebruik Dynmap als je simpel en bekend wilt.
```

---

## 12. Anti-cheat / veiligheid

| Plugin | Waarvoor | Download |
|---|---|---|
| GrimAC | Moderne anti-cheat | https://modrinth.com/plugin/grimac |
| AntiPopup | Verwijdert chat report popup | https://modrinth.com/plugin/antipopup |
| IllegalStack | Blokkeert illegale items/stacks | https://www.spigotmc.org/resources/dupe-fixes-illegal-stack-remover.44411/ |

Voor een tactical/anarchy stijl moet je kiezen hoeveel je wilt toestaan.

Advies:

```txt
Wel toestaan: PvP, raiden, harde survival
Niet toestaan: dupes, crash exploits, server lag exploits
```

---

## 13. Aanbevolen eerste installatielijst

Begin hiermee, niet meteen met 50 plugins:

```txt
LuckPerms
Vault
EssentialsX
EssentialsXSpawn
PlaceholderAPI
ProtocolLib
MiniMOTD
TAB
Geyser-Spigot
Floodgate-Spigot
ViaVersion
ViaBackwards
WorldGuard
FastAsyncWorldEdit
CoreProtect
Chunky
BetterRTP
DeluxeMenus
FancyNpcs
FancyHolograms
EconomyShopGUI
ExcellentCrates
DiscordSRV
HexTacticsStore.jar
```

---

## 14. Test checklist

Na installatie:

```txt
/plugins
/lp editor
/spawn
/setspawn
/rtp
/balance
/pay speler 10
/give speler diamond 1
/hextacticsstore reload
/hextacticsstore deliver speler vip
```

Check ook:

```txt
Bedrock join via bedrock.hextactics.nl:19132
Java join via play.hextactics.nl
Discord webhook werkt
Shop delivery werkt
CoreProtect logt blocks
WorldGuard beschermt spawn
```

---

## 15. Belangrijke mapstructuur

```txt
server/
├─ paper-1.21.11.jar
├─ server.properties
├─ plugins/
│  ├─ LuckPerms.jar
│  ├─ EssentialsX.jar
│  ├─ Geyser-Spigot.jar
│  ├─ floodgate-spigot.jar
│  ├─ HexTacticsStore.jar
│  └─ ...
└─ worlds/
```

---

## 16. Server properties basis

```properties
online-mode=true
enable-rcon=true
rcon.port=25575
rcon.password=CHANGE_THIS_STRONG_PASSWORD
motd=HexTactics
server-port=25565
view-distance=8
simulation-distance=6
```

Als je alleen de Java plugin delivery gebruikt, is RCON niet verplicht.

---

## 17. Volgende stap

Na plugins installeren:

1. LuckPerms ranks instellen.
2. Spawn bouwen en beschermen met WorldGuard.
3. Geyser/Floodgate testen.
4. HexTacticsStore token instellen.
5. Shop koppelen aan Stripe.
6. Eerste testbetaling doen.
