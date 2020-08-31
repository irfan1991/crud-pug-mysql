// import library
var Client = require('mysql2')

// membuat objek koneksi
var conn = Client.createConnection({
    host : 'localhost',
    user : 'irfan91',
    password : '123',
    database : 'ddmysql'
})

//memanggil method connect
// conn.connect(function (error) {
    
//     if (error) {
//         console.log('Koneksi server MariaDB gagal ')
//         throw error;
//     }

//     console.log('Koneksi MariaDB berhasil ');
//     conn.end();
    
// })


const sql = `
    CREATE TABLE buku (
        buku_id CHAR(4) NOT NULL PRIMARY KEY,
        buku_judul VARCHAR(30),
        buku_penulis VARCHAR(25),
        buku_penerbit VARCHAR(20)
    )
`;
// mengirim perintah SQL
conn.query(sql,function (error, result) {
    
    if (error) {
        console.log('Tabel gagal dibuat')
        throw error;
    }

    console.log('Tabel berhasil dibuat');

    
    
})

    
conn.end();// memutus koneksi