# Poem, quote, sum
- http://localhost:8000/tmp/poem Viser et dikt
- http://localhost:8000/tmp/quote Viser et tilfeldig sitat
- http://localhost:8000/tmp/sum/#/# Summerer tallene man legger inn i URLen (Bytt ut hastags med tallene du vil summere)

---

# Sjakk-API

Et REST API for sjakkspillere og sjakkpartier.

## Live URL (hostet på Render)
[https://demo25-magnus.onrender.com](https://demo25-magnus.onrender.com)

## Hvordan bruke API-et

### Spillere
- **GET /chess/players** → Henter alle spillere
- **GET /chess/players/:id** → Henter en spesifikk spiller
- **POST /chess/players** → Legger til en ny spiller
  ```json
  { "id": "Carlsen", "rating": 2850 }
### Sjakkpartier
- **GET /chess/games Henter alle sjakkpartier
- **POST /chess/games Oppretter et nytt sjakkparti
{ "id": "game456", "players": ["Carlsen", "Hikaru"] }
- **PATCH /chess/games/:id/move Legger til et trekk
{ "move": "e2-e4" }
- **DELETE /chess/games/:id → Sletter et spill

---

# Kortstokk API

## Live API
https://demo25-magnus.onrender.com

## Teknologier
Node.js (Express)
PostgreSQL
Render (Hosting)
## API Endepunkter
- ### Opprette en ny kortstokk
POST /deck
Oppretter en ny kortstokk og returnerer en deck_id.
curl -X POST https://demo25-magnus.onrender.com/deck -H "Content-Type: application/json" -d "{}"

- ### Hente en kortstokk
GET /deck/:deck_id

- ### Henter en eksisterende kortstokk.
curl -X GET https://demo25-magnus.onrender.com/deck/{deck_id}

- ### Stokke en kortstokk
PATCH /deck/shuffle/:deck_id

- ### Stokker kortene i en eksisterende kortstokk.
curl -X PATCH https://demo25-magnus.onrender.com/deck/shuffle/{deck_id}

- ### Trekke et kort
GET /deck/:deck_id/card

- ### Trekker et kort fra en kortstokk.
curl -X GET https://demo25-magnus.onrender.com/deck/{deck_id}/card

## Lokal installasjon
- ### Klon repoet
git clone https://github.com/Magnus054/demo25.git
cd demo25

- ### Installer avhengigheter
npm install

- ### Opprett en .env-fil med PostgreSQL-URL
DATABASE_URL=postgresql://bruker:passord@host/database

- ### Start serveren
node server.mjs
