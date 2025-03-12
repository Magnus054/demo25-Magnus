import express from "express";
import pool from "../modules/db.mjs"; 

const deckRouter = express.Router();

deckRouter.post("/deck", async (req, res) => {
    console.log("Received POST /deck request");

    try {
        const result = await pool.query(
            "INSERT INTO decks (cards) VALUES ($1) RETURNING deck_id",
            [JSON.stringify([])]
        );

        console.log("Kortstokk opprettet med ID:", result.rows[0].deck_id);
        res.json({ deck_id: result.rows[0].deck_id });

    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Databasefeil" });
    }
});

deckRouter.get("/deck/:deck_id", async (req, res) => {
    try {
        const { deck_id } = req.params;
        const result = await pool.query("SELECT * FROM decks WHERE deck_id = $1", [deck_id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Kortstokk ikke funnet" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Databasefeil" });
    }
});

deckRouter.patch("/deck/shuffle/:deck_id", async (req, res) => {
    try {
        const { deck_id } = req.params;
        const result = await pool.query("SELECT * FROM decks WHERE deck_id = $1", [deck_id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Kortstokk ikke funnet" });
        }

        let deck = result.rows[0].cards ? JSON.parse(result.rows[0].cards) : [];

        if (deck.length === 0) {
            deck = generateDeck();
        }

        deck = shuffleDeck(deck);

        await pool.query("UPDATE decks SET cards = $1 WHERE deck_id = $2", [JSON.stringify(deck), deck_id]);

        res.json({ message: `Kortstokken ${deck_id} er stokket` });
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Databasefeil" });
    }
});

deckRouter.get("/deck/:deck_id/card", async (req, res) => {
    try {
        const { deck_id } = req.params;
        const result = await pool.query("SELECT * FROM decks WHERE id = $1", [deck_id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Kortstokk ikke funnet" });
        }

        let deck = JSON.parse(result.rows[0].cards);
        if (deck.length === 0) {
            return res.status(400).json({ error: "Ingen flere kort i kortstokken" });
        }

        const card = deck.pop();
        await pool.query("UPDATE decks SET cards = $1 WHERE id = $2", [JSON.stringify(deck), deck_id]);

        res.json({ card });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Databasefeil" });
    }
});

function generateDeck() {
    const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
    const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    const deck = [];

    for (const suit of suits) {
        for (const rank of ranks) {
            deck.push({ suit, rank });
        }
    }
    return deck;
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

export default deckRouter;
