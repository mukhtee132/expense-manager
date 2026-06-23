const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, '../data/expenses.db'), {
  verbose: console.log
});

// Create expenses table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS expenses (
    id TEXT PRIMARY KEY,
    amount REAL NOT NULL,
    category TEXT NOT NULL,
    date TEXT NOT NULL,
    description TEXT,
    created_at TEXT NOT NULL
  )
`);

module.exports = db;