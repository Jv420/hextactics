# HexTacticsStore Plugin

Java/Paper plugin voor HexTactics webshop-delivery.

Deze plugin doet hetzelfde soort werk als een RCON-worker, maar draait direct in je Minecraft server:

- Ontvangt webshop-orders via HTTP API
- Controleert een geheime token
- Voert console commands uit
- Geeft ranks, keys, coins en bundles
- Heeft een admin command voor testen en reloaden

## Builden

Installeer Java 21 en Maven.

```bash
cd plugin
mvn clean package
```

De plugin komt hier:

```txt
target/HexTacticsStore.jar
```

Plaats deze jar in:

```txt
/plugins
```

Herstart daarna je server.

## Config

Na de eerste start komt dit bestand:

```txt
/plugins/HexTacticsStore/config.yml
```

Verander minimaal:

```yml
security:
  api-token: "maak-hier-een-lange-geheime-token"
```

## API endpoints

Health check:

```txt
GET http://SERVER_IP:4567/health
```

Order leveren:

```txt
POST http://SERVER_IP:4567/deliver
Header: X-HexTactics-Token: jouw-token
Body: {"player":"Steve","product":"vip"}
```

## Test command in Minecraft console

```txt
hextacticsstore deliver Steve vip
hextacticsstore deliver Steve elite
hextacticsstore deliver Steve legend
hextacticsstore deliver Steve keys_3
hextacticsstore deliver Steve coins_50k
```

Reload:

```txt
hextacticsstore reload
```

## Product keys

- `vip`
- `elite`
- `legend`
- `keys_3`
- `pvp_bundle`
- `coins_50k`

## Belangrijk

Zet poort `4567` alleen open als je firewall goed staat. Gebruik altijd een sterke geheime token.
