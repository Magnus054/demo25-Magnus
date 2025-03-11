import express from "express";
import { chessData } from "../data/chess.mjs";

const chessRouter = express.Router();

chessRouter.get("/players", (req, res) => {
    res.json(chessData.players);
});

chessRouter.get("/players/:id", (req, res) => {
    const player = chessData.players[req.params.id];
    if (!player) return res.status(404).json({ error: "Spiller ikke funnet" });
    res.json(player);
});

chessRouter.post("/players", (req, res) => {
    const { id, rating } = req.body;
    if (!id || !rating) return res.status(400).json({ error: "Mangler id eller rating" });
    
    chessData.players[id] = { id, rating, gamesPlayed: 0, gamesWon: 0 };
    res.status(201).json({ message: `Spiller ${id} lagt til` });
});

chessRouter.get("/games", (req, res) => {
    res.json(chessData.games);
});

chessRouter.post("/games", (req, res) => {
    const { id, players } = req.body;
    if (!id || !players || players.length !== 2) {
        return res.status(400).json({ error: "Spillet må ha et ID og to spillere" });
    }
    
    chessData.games[id] = { id, players, moves: [], winner: null };
    res.status(201).json({ message: `Spill ${id} opprettet` });
});

chessRouter.patch("/games/:id/move", (req, res) => {
    const { move } = req.body;
    const game = chessData.games[req.params.id];
    
    if (!game) return res.status(404).json({ error: "Spill ikke funnet" });
    if (!move) return res.status(400).json({ error: "Mangler trekk" });

    game.moves.push(move);
    res.json({ message: `Trekk ${move} lagt til i spill ${req.params.id}` });
});

chessRouter.delete("/games/:id", (req, res) => {
    if (!chessData.games[req.params.id]) {
        return res.status(404).json({ error: "Spill ikke funnet" });
    }
    
    delete chessData.games[req.params.id];
    res.json({ message: `Spill ${req.params.id} slettet` });
});

export default chessRouter;
