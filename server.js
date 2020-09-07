var http = require('http')
var Client = require('mysql2')
var pug = require('pug')
var qs = require('querystring')
var url = require('url')

var listPug = './template/list.pug';
var addFormPug = './template/addForm.pug';
var editFormPug = './template/editForm.pug';

var db = Client.createConnection({
    host : 'us-cdbr-east-02.cleardb.com',
    user : 'b2b02b4b638c75',
    password : 'b6bcd367',
    database : 'heroku_618a36d3cf74263'
})


var server = http.createServer(function (request, response) {
    if (request.url === '/') {
        db.query('SELECT * FROM buku', function (error, result) {
            if (error) {
                throw error
            }
            var template = pug.renderFile(listPug, {books : result})
            response.end(template)
        });
    } else if(request.url === '/add') {
        switch (request.method) {
            case 'GET':
                var template = pug.renderFile(addFormPug)
                response.end(template)
                break;
            
            case 'POST':
                var body = ''

                request.on('data', function (data) {
                    body += data
                })

                request.on('end', function () {
                    var form = qs.parse(body)
                    var newRow = [
                        form['buku_id'],
                        form['buku_judul'],
                        form['buku_penulis'],
                        form['buku_penerbit']
                    ];

                    var sql = 'INSERT INTO buku VALUES(?,?,?,?)';
                    db.query(sql,newRow, function (error, result) {
                        if (error) {
                            throw error
                        }
                        // kode untuk direct ke root 
                        response.writeHead(302,{'Location' : '/'})
                        response.end();
                    })
                })
                break;
        
            default:
                console.log('Metode tidak dikenali');
                
        }

    } else if(url.parse(request.url).pathname === '/edit') {

        switch (request.method) {
            case 'GET':
                var id = qs.parse(url.parse(request.url).query).id;
                var sql = 'SELECT * FROM buku WHERE buku_id = ?';
                db.query(sql, [id] , function (error, result) {
                    if (error) {
                        throw error
                    }
                    console.log(result[0]);
                    
                    var template2 = pug.renderFile(editFormPug, {book:result[0]})
                   
                  
                    response.end(template2)
                })
                
                break;
            
            case 'POST':
                var body = ''

                request.on('data', function (data) {
                    body += data
                })

                request.on('end', function () {
                    var form = qs.parse(body)
                    var params = [
                        form['buku_judul'],
                        form['buku_penulis'],
                        form['buku_penerbit'],
                        form['buku_id']
                    ];

                    var sql = `
                        UPDATE buku
                            SET
                                buku_judul=?,
                                buku_penulis=?,
                                buku_penerbit=?
                            WHERE
                                buku_id=?
                    `;
                    db.query(sql,params, function (error, result) {
                        if (error) {
                            throw error
                        }
                        // kode untuk direct ke root 
                        response.writeHead(302,{'Location' : '/'})
                        response.end();
                    })
                })
                
                break;
        
            default:
                console.log('Metode tidak dikenali');
                
        }

    } else if(url.parse(request.url).pathname === '/delete') {
        var id = qs.parse(url.parse(request.url).query).id;
        var sql = 'DELETE FROM buku WHERE buku_id = ?';
        db.query(sql,[id], function (error, result) {
            if (error) {
                throw error
            }
            // kode untuk direct ke root 
            response.writeHead(302,{'Location' : '/'})
            response.end();
        })
    }
})
server.listen(3000)
console.log('Server aktif di port 3000');
