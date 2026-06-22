# HexTactics

Premium Minecraft server project voor **HexTactics.nl**.

## Domeinen

- `hextactics.nl` - homepage
- `shop.hextactics.nl` - webshop
- `play.hextactics.nl` - Minecraft Java server
- `bedrock.hextactics.nl` - Bedrock connectie
- `map.hextactics.nl` - optionele map later

## Projectstructuur

```txt
website/            Homepage, shop, privacy, terms en TOS
worker/             Node.js RCON worker voor webshop-orders
minecraft-configs/  Basis configs voor plugins en server setup
branding/           MOTD, Discord setup en branding teksten
```

## Aanpak vanaf nul

1. Installeer PaperMC met Java 21.
2. Koppel `play.hextactics.nl` aan je server-IP.
3. Installeer de basis plugins uit `minecraft-configs/plugin-list.md`.
4. Zet LuckPerms ranks op met `minecraft-configs/luckperms/commands.txt`.
5. Deploy de website via Vercel.
6. Zet Stripe webhook naar de RCON worker.
7. Test een bestelling met een test-rank.

## Serverconcept

**HexTactics** is een tactical survival/anarchy-style Minecraft server met PvP, clans, economy, crates, ranks en crossplay voor Java + Bedrock.

## Veiligheid

Zet nooit echte secrets in GitHub. Gebruik `.env` op je server en `.env.example` als voorbeeldbestand.
