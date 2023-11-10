const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            phone TEXT,
            website TEXT,
            items TEXT
        );
    `)

    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            phone,
            website,
            items
        ) VALUES (?,?,?,?,?,?,?,?,?);
    `

    const values = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ]

    function afterInsertData(err) {
        if(err) {
        }
    }

    db.run(query, values, afterInsertData)

    db.all(`SELECT name FROM places`, function(err, rows) {
        if(err) {
            return console.log(err)
        }
    })

    db.run(`DELETE FROM places WHERE id = ?`, [3], function(err) {
        if(err) {
            return console.log(err)
        }
    })
})