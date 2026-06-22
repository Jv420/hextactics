# HexTactics Discord Channel Template

Maak deze kanalen aan en vul daarna de IDs in DiscordSRV/config.yml, alerts.yml en HexTacticsStore/config.yml.

## Kanalen

```txt
announcements_id=
minecraft_chat_id=
joins_leaves_id=
online_status_id=
shop_orders_id=
sales_trades_id=
player_stats_id=
server_logs_id=
staff_logs_id=
alerts_id=
```

## Aanbevolen gebruik

| Kanaal | Wordt gebruikt voor |
|---|---|
| minecraft-chat | Minecraft chat heen/terug via DiscordSRV |
| joins-leaves | Join/leave embeds via HexTacticsStore en/of DiscordSRV alerts |
| online-status | Online spelers, TPS en server start/stop |
| shop-orders | Webshop aankopen en delivery status |
| sales-trades | Verkoop/trade events later via shop plugin hook |
| player-stats | Deaths, kills en player stats |
| server-logs | Console/logs via DiscordSRV |
| staff-logs | Staff acties, bans, mutes, warnings |
| alerts | Errors, webhook failures, API/token problemen |

## Webhooks maken

Per kanaal:

1. Discord kanaal openen.
2. Edit Channel.
3. Integrations.
4. Webhooks.
5. New Webhook.
6. Copy Webhook URL.
7. Plak in `plugins/HexTacticsStore/config.yml`.

Nooit echte webhook URLs in GitHub zetten.
