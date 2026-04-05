const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, '../felanmalan.db'));

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    status TEXT DEFAULT 'open',
    reporter_name TEXT,
    reporter_email TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    icon TEXT
  );

  INSERT OR IGNORE INTO categories (id, name, icon) VALUES
    (1, 'IT & Datorer', '💻'),
    (2, 'Belysning', '💡'),
    (3, 'Ventilation & Värme', '🌡️'),
    (4, 'Möbler & Inredning', '🪑'),
    (5, 'Toaletter & Sanitet', '🚿'),
    (6, 'Säkerhet & Lås', '🔒'),
    (7, 'Utomhusmiljö', '🌳'),
    (8, 'Övrigt', '📋');
`);

const Report = {
  getAll() {
    return db.prepare('SELECT * FROM reports ORDER BY created_at DESC').all();
  },

  getById(id) {
    return db.prepare('SELECT * FROM reports WHERE id = ?').get(id);
  },

  create({ title, description, category, location, reporter_name, reporter_email }) {
    const stmt = db.prepare(`
      INSERT INTO reports (title, description, category, location, reporter_name, reporter_email)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(title, description, category, location, reporter_name || null, reporter_email || null);
    return this.getById(result.lastInsertRowid);
  },

  updateStatus(id, status) {
    const validStatuses = ['open', 'in_progress', 'resolved'];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }
    db.prepare('UPDATE reports SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(status, id);
    return this.getById(id);
  }
};

module.exports = { Report, db };
