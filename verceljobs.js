const mysql = require('mysql');
const axios = require('axios');

function query(qr, func){
    var connection = mysql.createConnection({
    host     : '103.152.118.236',
    user     : 'gugus',
    password : 'feed$123$',
    database : 'pz'
    });
    
    connection.connect();
    
    connection.query(qr, function (error, results, fields) {
    if (error) throw error;
        func(results);
    });
    
    connection.end();
}

axios.get('https://sindomall.com/seller/0c3905aab62bb06905442d31e93e48d0f57b12f3836c831e9e39049a70b9b163/products?v='+Date.now())
.then(function(c){
    var t = JSON.stringify(c.data);
    t = Buffer.from(t, 'utf8').toString('base64');
    query(`UPDATE datapz SET data = '${t}' WHERE kode = 'data' `, function(r){
        console.log('save')
    })
});  