# HexTactics Helper Bot Commands

Alle commands stuur je in Minecraft chat als jouw `OWNER_USERNAME`.

## Basis

```txt
!help
```

Laat beschikbare commands zien.

```txt
!status
```

Laat zien welke bots online zijn.

```txt
!ping
!server
```

CommanderBot checkt direct de Minecraft serverstatus:

```txt
online spelers / max spelers
latency/ping
server versie
```

```txt
!health
```

CommanderBot checkt de aparte `ping-bot` service als `PING_BOT_URL` is ingesteld.

```txt
!stop
```

Stopt beweging van alle worker bots.

## Bewegen

```txt
!follow
```

Worker bots volgen jou.

```txt
!come
```

Worker bots komen naar jouw huidige positie.

```txt
!goto spawn
!goto farm
!goto build
```

Worker bots lopen naar locaties uit `config.json`.

## Testtaken

```txt
!builder test
```

Builder bot voert een veilige testactie uit.

```txt
!farm test
```

Farmer bot loopt naar farm locatie en meldt dat farm-test gestart is.

## Ping-bot koppeling

Zet in `.env`:

```txt
PING_BOT_URL=https://jouw-ping-bot-url.nl
PING_BOT_TOKEN=change_this_optional_token
```

Daarna kun je gebruiken:

```txt
!health
```

## Veiligheidsregels

- Geen spamcommands.
- Cooldown staat standaard op 5 seconden.
- Maximaal 3 bots.
- Geen AFK-loop.
- Geen server-actief-houden functie.
