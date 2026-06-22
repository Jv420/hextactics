# HexTactics Deployment Guide

## 1. Website deployen op Vercel

1. Ga naar Vercel.
2. Kies **Add New Project**.
3. Selecteer GitHub repo `Jv420/hextactics`.
4. Zet Root Directory op `website`.
5. Framework preset: **Other**.
6. Build command leeg laten.
7. Output directory leeg laten.
8. Deploy.

## 2. Domein koppelen

Koppel in Vercel:

- `hextactics.nl`
- `www.hextactics.nl`
- `shop.hextactics.nl`

## 3. Worker starten

Ga lokaal of op je server naar de worker map:

```bash
cd worker
npm install
cp .env.example .env
npm start
```

Vul in `.env` je echte RCON, Stripe en Discord gegevens in.

## 4. Minecraft RCON aanzetten

In `server.properties`:

```properties
enable-rcon=true
rcon.port=25575
rcon.password=JOUW_STERKE_WACHTWOORD
```

Herstart daarna de Minecraft server.

## 5. Stripe instellen

Webhook URL:

```txt
https://jouw-worker-url.nl/stripe/webhook
```

Event:

```txt
checkout.session.completed
```

## 6. Product metadata

De worker gebruikt automatisch metadata:

```txt
player = Minecraft naam
product = vip, elite, legend, keys_3, pvp_bundle, coins_50k
```

## 7. Test delivery

Test met:

```bash
curl -X POST http://localhost:4000/test-delivery \
  -H "Content-Type: application/json" \
  -d '{"player":"Steve","product":"vip"}'
```
