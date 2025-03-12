CREATE TABLE IF NOT EXISTS players (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    rating INT NOT NULL
);

CREATE TABLE IF NOT EXISTS games (
    id SERIAL PRIMARY KEY,
    player1 TEXT NOT NULL REFERENCES players(name),
    player2 TEXT NOT NULL REFERENCES players(name),
    moves TEXT[] DEFAULT '{}'
);
