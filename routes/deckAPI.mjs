import express from "express";
import { Deck } from "../data/deck.mjs";

const deckRouter = express.Router();
const decks = {};

deckRouter.post("/temp/deck", (req, res) => {
    const deck_id = Math.random().toString(36).substring(2, 10);
    decks[deck_id] = new Deck();
    res.json({ deck_id });
});

deckRouter.patch("/temp/deck/shuffle/:deck_id", (req, res) => {
    const { deck_id } = req.params;
    if (!decks[deck_id]) {
        return res.status(404).json({ error: "Kortstokk ikke funnet" });
    }
    decks[deck_id].shuffle();
    res.json({ message: `Kortstokken ${deck_id} er stokket` });
});

deckRouter.get("/temp/deck/:deck_id", (req, res) => {
    const { deck_id } = req.params;
    if (!decks[deck_id]) {
        return res.status(404).json({ error: "Kortstokk ikke funnet" });
    }
    res.json({ deck: decks[deck_id].cards });
});

deckRouter.get("/temp/deck/:deck_id/card", (req, res) => {
    const { deck_id } = req.params;
    if (!decks[deck_id]) {
        return res.status(404).json({ error: "Kortstokk ikke funnet" });
    }

    const card = decks[deck_id].drawCard();
    if (!card) {
        return res.status(400).json({ error: "Ingen flere kort i kortstokken" });
    }
    res.json({ card });
});

export default deckRouter;
