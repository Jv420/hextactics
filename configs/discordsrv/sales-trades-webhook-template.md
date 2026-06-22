# HexTactics Sales / Trades Logging

Niet elke economy/shop plugin geeft automatisch verkoop-events door aan DiscordSRV.

Daarom gebruiken we voor HexTactics deze aanpak:

## Voor nu

- Shop aankopen via webshop: **HexTacticsStore** -> `shop-orders`
- Join/leave/deaths/online: **HexTacticsStore listener** -> Discord webhooks
- Minecraft chat/console: **DiscordSRV**

## Voor verkopen/trades later

Koppel je shop/economy plugin aan een webhook of eigen listener.

Aanbevolen Discord kanaal:

```txt
💰｜sales-trades
```

Webhook naam:

```txt
HexTactics Sales
```

Voorbeeld embed payload:

```json
{
  "username": "HexTactics Sales",
  "embeds": [
    {
      "title": "💰 Nieuwe verkoop/trade",
      "description": "Een speler heeft iets verkocht of verhandeld.",
      "color": 15844367,
      "fields": [
        { "name": "Speler", "value": "`Steve`", "inline": true },
        { "name": "Item", "value": "`Diamond`", "inline": true },
        { "name": "Aantal", "value": "`16`", "inline": true },
        { "name": "Prijs", "value": "`$5000`", "inline": true }
      ]
    }
  ]
}
```

## Plugins waarbij dit later mogelijk is

- ChestShop: via log parsing of event listener
- EconomyShopGUI: afhankelijk van API/events
- AuctionHouse: afhankelijk van plugin API/events
- Eigen shop plugin: makkelijkste optie

## Advies

Voor volledige automatische sales/trade logging is een kleine extra eigen plugin-listener de beste oplossing. Die kan later aan HexTacticsStore toegevoegd worden zodra je definitief kiest welke shop plugin je gebruikt.
