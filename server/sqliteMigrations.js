import { db } from './db.js'

export const migrateDb = db.transaction((version) => {


  const { user_version: dbVersion } = db.prepare('PRAGMA user_version').get();

  console.log('SQLite Version:', dbVersion);

  if (dbVersion >= version) {
    console.log(`SQLite Version ${version} up to date (db@${dbVersion})`);
    return
  } 

  console.log(`SQLite Migrating ${dbVersion}->${version}`, version);

  if (version >= 1) {
    db.prepare(`
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        done INTEGER NOT NULL DEFAULT 0,  -- 0 for false, 1 for true
        description TEXT
      )
    `).run()
  }

  db.prepare(`PRAGMA user_version = ${version}`).run()

  console.log(`SQLite Migration Done`);
})
