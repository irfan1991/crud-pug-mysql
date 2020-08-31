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


// const sql = `
//     INSERT INTO buku VALUES('B001','Belajar Node JS','IRFAN','Jakarta Pos')
// `;
// // mengirim perintah SQL
// conn.query(sql,function (error, result) {
    
//     if (error) {
//         console.log('Penambahan Data gagal dibuat')
//         throw error;
//     }

//     console.log('Penambahan Data  berhasil dibuat');

    
    
// })


const sql = `
    INSERT INTO buku VALUES(?,?,?,?)
`;
// mengirim perintah SQL
conn.query(sql,['B002','Javascript','Irfan','Angga press']
    // {id:'B002',judul:'Javascript', penulis: 'Ahmad Dhani',penerbit : 'Angga Press' }
    ,function (error, result) {
    
    if (error) {
        console.log('Penambahan Data gagal dibuat')
        throw error;
    }

    console.log('Penambahan Data  berhasil dibuat');

    
    
})
    
conn.end();// memutus koneksi