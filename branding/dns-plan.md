# HexTactics DNS Plan

## Subdomeinen

- hextactics.nl voor de homepage
- shop.hextactics.nl voor de webshop
- play.hextactics.nl voor Java
- bedrock.hextactics.nl voor Bedrock
- map.hextactics.nl voor een map later

## Website

Gebruik Vercel voor `hextactics.nl`, `www.hextactics.nl` en `shop.hextactics.nl`.

## Minecraft Java

Maak een A-record voor `play` naar het IP-adres van je Minecraft server.

Maak daarna een SRV-record voor Java:

- service: `_minecraft`
- protocol: `_tcp`
- naam: `play`
- poort: `25565`
- doel: `play.hextactics.nl`

## Minecraft Bedrock

Maak een A-record voor `bedrock` naar het IP-adres van je Minecraft server.

Bedrock gebruikt normaal poort `19132`.
