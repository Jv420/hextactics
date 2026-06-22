# HexTactics API Key Generator

Gebruik deze tool om sterke API keys te maken voor:

- `plugins/HexTacticsStore/config.yml`
- `worker/.env`
- webhook/API beveiliging

## Optie 1: Node.js generator

```bash
cd tools/api-key-generator
node generate.js
```

Lange key:

```bash
node generate.js --length 64 --prefix ht_live
```

Meerdere keys:

```bash
node generate.js --length 64 --prefix ht_live --count 5
```

## Optie 2: Browser generator

Open lokaal:

```txt
index.html
```

Klik op **Genereer API key**.

## Waar plak je de key?

In Minecraft plugin config:

```yml
security:
  api-token: "JOUW_KEY_HIER"
```

In worker `.env`:

```env
PLUGIN_API_TOKEN=JOUW_KEY_HIER
```

## Veiligheid

- Zet echte keys nooit in GitHub.
- Deel keys nooit in Discord screenshots.
- Gebruik minimaal lengte 48, liever 64.
- Maak een nieuwe key als je denkt dat iemand hem heeft gezien.
