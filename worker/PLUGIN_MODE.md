# Worker koppelen aan HexTacticsStore plugin

Je hebt nu twee manieren om producten te leveren:

## Optie A: Worker met RCON

Stripe webhook -> Node worker -> Minecraft RCON -> console commands

Dit staat al in `worker/server.js`.

## Optie B: Worker met Java plugin

Stripe webhook -> Node worker -> HexTacticsStore plugin API -> console commands

Dit is vaak makkelijker als je geen RCON wilt gebruiken.

## Plugin API test

```bash
curl -X POST http://SERVER_IP:4567/deliver \
  -H "Content-Type: application/json" \
  -H "X-HexTactics-Token: jouw-token" \
  -d '{"player":"Steve","product":"vip"}'
```

## Aanbevolen setup

Voor live webshop:

```txt
Stripe Checkout
      ↓
Node worker webhook
      ↓
HexTacticsStore plugin /deliver endpoint
      ↓
Minecraft console commands
```

## Veiligheid

- Gebruik een lange geheime token.
- Zet de plugin API niet zomaar publiek open zonder firewall.
- Gebruik eventueel een reverse proxy met HTTPS.
- Laat alleen je worker-IP toe naar poort 4567.
