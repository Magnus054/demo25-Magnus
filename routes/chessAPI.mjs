import express from "express";
import pool from "../modules/db.mjs";

const chessRouter = express.Router();

chessRouter.get("/players", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM players");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

chessRouter.get("/players/:id", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM players WHERE name = $1", [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Spiller ikke funnet" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

chessRouter.post("/players", async (req, res) => {
    const { id, rating } = req.body;
    try {
        await pool.query("INSERT INTO players (name, rating) VALUES ($1, $2)", [id, rating]);
        res.json({ message: `Spiller ${id} lagt til` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

chessRouter.get("/games", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM games");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

chessRouter.post("/games", async (req, res) => {
    const { id, players } = req.body;
    try {
        await pool.query("INSERT INTO games (id, player1, player2) VALUES ($1, $2, $3)", [id, players[0], players[1]]);
        res.json({ message: `Spill ${id} opprettet` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

chessRouter.patch("/games/:id/move", async (req, res) => {
    const { move } = req.body;
    try {
        await pool.query("UPDATE games SET moves = array_append(moves, $1) WHERE id = $2", [move, req.params.id]);
        res.json({ message: `Trekk ${move} lagt til` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

chessRouter.delete("/games/:id", async (req, res) => {
    try {
        await pool.query("DELETE FROM games WHERE id = $1", [req.params.id]);
        res.json({ message: `Spill ${req.params.id} slettet` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default chessRouter;