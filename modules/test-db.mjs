import pool from "./db.mjs";

async function testDatabase() {
    try {
        const result = await pool.query("SELECT NOW()");
        console.log("✅ Tilkoblet til databasen! Nåværende tid:", result.rows[0].now);
    } catch (err) {
        console.error("⚠️ Databasefeil:", err);
    } finally {
        pool.end();
    }
}

testDatabase();
