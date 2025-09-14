import { Database } from "bun:sqlite";

const db = new Database("db.sqlite");

db.run(`CREATE TABLE IF NOT EXITS urls (
    slug TEXT PRIMARY KEY,
    url TEXT NOT NULL,
    )`);

export { db };
