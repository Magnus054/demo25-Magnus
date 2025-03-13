# Poem, Quote, Sum

- **GET /tmp/poem** → Viser et dikt
  - http://localhost:10000/tmp/poem
- **GET /tmp/quote** → Viser et tilfeldig sitat
  - http://localhost:10000/tmp/quote
- **GET /tmp/sum/:a/:b** → Summerer to tall
  - http://localhost:10000/tmp/sum/5/10 → returnerer 15

---

# Sjakk-API

Et REST API for sjakkspillere og sjakkpartier.

## Live URL (hostet på Render)
[https://demo25-magnus.onrender.com](https://demo25-magnus.onrender.com)

## API-endepunkter

### Spillere
- **GET /chess/players** → Henter alle spillere
- **GET /chess/players/:id** → Henter en spesifikk spiller
- **POST /chess/players** → Legger til en ny spiller
  ```json
  { "id": "Carlsen", "rating": 2850 }
  ```

### Sjakkpartier
- **GET /chess/games** → Henter alle sjakkpartier
- **POST /chess/games** → Oppretter et nytt sjakkparti
  ```json
  { "id": "game456", "players": ["Carlsen", "Hikaru"] }
  ```
- **PATCH /chess/games/:id/move** → Legger til et trekk
  ```json
  { "move": "e2-e4" }
  ```
- **DELETE /chess/games/:id** → Sletter et spill

---

# Kortstokk-API

Et REST API for administrasjon av kortstokker.

## Live API
[https://demo25-magnus.onrender.com](https://demo25-magnus.onrender.com)

## Teknologier
- **Backend:** Node.js (Express)
- **Database:** PostgreSQL
- **Hosting:** Render

## API-endepunkter

### Opprette en ny kortstokk
- **POST /deck** → Oppretter en ny kortstokk og returnerer en `deck_id`
  ```sh
  curl -X POST https://demo25-magnus.onrender.com/deck -H "Content-Type: application/json" -d "{}"
  ```

### Hente en kortstokk
- **GET /deck/:deck_id** → Henter en eksisterende kortstokk
  ```sh
  curl -X GET https://demo25-magnus.onrender.com/deck/{deck_id}
  ```

### Stokke en kortstokk
- **PATCH /deck/shuffle/:deck_id** → Stokker kortene i en kortstokk
  ```sh
  curl -X PATCH https://demo25-magnus.onrender.com/deck/shuffle/{deck_id}
  ```

### Trekke et kort
- **GET /deck/:deck_id/card** → Trekker et kort fra en kortstokk
  ```sh
  curl -X GET https://demo25-magnus.onrender.com/deck/{deck_id}/card
  ```

---

# Klient (PWA)

Applikasjonen er en **Progressive Web App (PWA)** som kan installeres og fungerer offline.

## PWA-funksjoner
- **Service Worker** for caching og offline-modus
- **Webmanifest** for installasjon
- **Responsiv design**

For å installere appen:
1. Åpne applikasjonen i Chrome eller Edge.
2. Klikk på **Install PWA** i adressefeltet.
3. Følg instruksjonene for installasjon.

---

# Lokal installasjon

### 1. Klon repoet
```sh
git clone https://github.com/Magnus054/demo25.git
cd demo25
```

### 2. Installer avhengigheter
```sh
npm install
```

### 3. Konfigurer database
Opprett en `.env`-fil og legg inn PostgreSQL-URL:
```
DATABASE_URL=postgresql://bruker:passord@host/database
```

### 4. Start serveren
```sh
node server.mjs
```

Serveren kjører nå på **http://localhost:10000/**.

---

# Struktur

```
/demo25
├── public/                # Klient-filer
│   ├── index.html         # Hovedside
│   ├── manifest.webmanifest # PWA-manifest
│   ├── sw.js              # Service Worker
│   ├── css/style.css      # CSS-stil
│   ├── icons/             # Ikoner
│
├── routes/                # API-ruter
│   ├── deckAPI.mjs        # Kortstokk-API
│   ├── chessAPI.mjs       # Sjakk-API
│
├── modules/               # Moduler
│   ├── db.mjs             # Databasehåndtering
│   ├── session.mjs        # Middleware for session-lagring
│
├── .env                   # Miljøvariabler
├── schema.sql             # SQL-script for databaseoppsett
├── package.json           # Prosjektavhengigheter
└── server.mjs             # Hovedserver
```

---

# Hosting

- **Backend & Database:** Hostet på Render
- **Frontend:** Serves via Express static files

**Live URL:** [https://demo25-magnus.onrender.com](https://demo25-magnus.onrender.com)
