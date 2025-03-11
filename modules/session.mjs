import * as crypto from "node:crypto";
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const SESSION_KEY = "session";
const SESSION_FILE = "./data/sessions.json";
let SESSIONS = {};

function loadSessions() {
    if (existsSync(SESSION_FILE)) {
        try {
            const data = readFileSync(SESSION_FILE, "utf-8");
            SESSIONS = JSON.parse(data);
            console.log("✅ Sessions loaded from file.");
        } catch (error) {
            console.error("⚠️ Failed to load sessions:", error);
        }
    }
}

function saveSessions() {
    try {
        writeFileSync(SESSION_FILE, JSON.stringify(SESSIONS, null, 2), "utf-8");
    } catch (error) {
        console.error("⚠️ Klarte ikke å lagre sesjoner:", error);
    }
}

function startSession(req, res, next) {
    let sessionId = req.get(SESSION_KEY);
    let session = SESSIONS[sessionId];

    if (!sessionId || !session) {
        sessionId = createUniqueSessionId(20, SESSIONS);
        session = { id: sessionId };
        SESSIONS[sessionId] = session;
    }

    req.session = session;
    res.set(SESSION_KEY, sessionId);
    next();
}

function updateSession(req, res, next) {
    SESSIONS[req.session.id] = req.session;
    saveSessions();
    next();
}

function createUniqueSessionId(length, sessions) {
    let id;
    do {
        id = crypto.randomBytes(length).toString("hex");
    } while (sessions[id] !== undefined);
    return id;
}

loadSessions();

export { startSession, updateSession };
