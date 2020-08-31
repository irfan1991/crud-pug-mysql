var Client = require('mysql2')

var conn = Client.createConnection({
    host : 'localhost',
    user : 'irfan91',
    password : '123',
    database : 'ddmysql'
});

var sql = `DELETE FROM buku WHERE buku_id = 'B002'`;
conn.query(sql, function (error, result) {
    
    if (error) {
        console.log('Data Gagal Dihapus');
        throw error;
    }
    console.log('Data Berhasil Dihapus');
    
});
conn.end()