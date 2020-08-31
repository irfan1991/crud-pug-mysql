var Client = require('mysql2')

var conn = Client.createConnection({
    host : 'localhost',
    user : 'irfan91',
    password : '123',
    database : 'ddmysql'
});

var sql = `SELECT * FROM buku`;

conn.query(sql, function (error, result) {
    
    if (error) {
        console.log('Data tidak dapat ditampilkan');
        throw error
    }

    for (let index = 0; index < result.length; index++) {
       let row = result[index]
       console.log('%s,%s,%s,%s',
            row['buku_id'],
            row['buku_judul'],
            row['buku_penulis'],
            row['buku_penerbit']
       );
    }
})
conn.end()