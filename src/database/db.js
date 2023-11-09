// importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

// criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
// utilizar o objeto de banco de dados, para nossas operações
db.serialize(() => {

    // com commandos SQL eu vou:node src/database/database.db

    // // 1 Criar uma tabela 
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

    // 2 Inserir dados na tabela
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
            return console.log(err)
        }

        console.log("Cadastrado com sucesso")
        console.log(this)
    }

    // const checkQuery = `SELECT COUNT(*) as count FROM places;`

    // db.get(checkQuery, function (err, row) {
    //     if (err) {
    //         return console.log(err);
    //     }

    //     if (row.count === 0) {
    //         // Se não houver registros, inserir os dados
    //         db.run(query, values, afterInsertData);
    //     } else {
    //         console.log("Os dados já foram inseridos anteriormente.");
    //     }
    // });

    db.run(query, values, afterInsertData)


    // 3 Consultar os dados da tabela
    db.all(`SELECT name FROM places`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        console.log("Aqui estão seus registros: ")
        console.log(rows)
    })

    // 4 Deletar um dado da tabela
    db.run(`DELETE FROM places WHERE id = ?`, [3], function(err) {
        if(err) {
            return console.log(err)
        }

        console.log("Registro deletado com sucesso!")
    })

})