# Sjakk-API

Et REST API for sjakkspillere og sjakkpartier.

## Live URL (hostet på Render)
[https://demo25-magnus.onrender.com](https://demo25-magnus.onrender.com)

---

## Hvordan bruke API-et

### Spillere
- **GET /chess/players** → Henter alle spillere
- **GET /chess/players/:id** → Henter en spesifikk spiller
- **POST /chess/players** → Legger til en ny spiller
  ```json
  { "id": "Carlsen", "rating": 2850 }
###🔹 Sjakkpartier
- **GET /chess/games Henter alle sjakkpartier
- **POST /chess/games Oppretter et nytt sjakkparti
{ "id": "game456", "players": ["Carlsen", "Hikaru"] }
- **PATCH /chess/games/:id/move Legger til et trekk
{ "move": "e2-e4" }
- **DELETE /chess/games/:id → Sletter et spill
