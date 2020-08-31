var Client = require('mysql2')

var conn = Client.createConnection({
    host : 'localhost',
    user : 'irfan91',
    password : '123',
    database : 'ddmysql'
});

var sql = `
UPDATE buku
SET buku_judul = 'Profesional Node.JS ',
    buku_penulis = 'Andri Herlambang',
    buku_penerbit = 'Wrox'
WHERE buku_id = 'B001'

`;

conn.query(sql, function (error, result) {
    
    if (error) {
        console.log('Perubahan Data Gagal ');
        throw error;
    }
    console.log('Perubahan Data Berhasil !');
});

conn.end()
