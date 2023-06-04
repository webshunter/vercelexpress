const express = require('express')
const path = require('path')
const app = express()
const axios = require('axios');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const fs = require('fs');
const mysql = require('mysql');
const reader = require('xlsx')

function query(qr, func) {
  var connection = mysql.createConnection({
    host: '103.112.244.66',
    user: 'indowebs_wp970',
    password: 'A]SpW(2c96',
    database: 'indowebs_wp970'
  });

  connection.connect();

  connection.query(qr, function (error, results, fields) {
    if (error) throw error;
    func(results);
  });

  connection.end();
}

let dataJson = '';

app.use(cors({
  origin: '*'
}));

app.set('view engine', 'ejs')

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));

app.get('/', async (req, res) => {
  var origin = req.get('host');
  query(`SELECT data kl FROM datapz WHERE kode = 'data'`, function (d) {
    const plain = Buffer.from(d[0].kl, 'base64').toString('utf8')
    res.render('index', { origin: origin, port: PORT, data: plain })
  })
})


app.get('/sitemap.xml', cors(), async (req, res) => {
  var data = await fs.readFileSync(path.join(__dirname, 'public', 'plants.txt'), 'utf8');
  data = JSON.parse(data).data;
  let xml_content = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '  <url>',
    '    <loc>https://plantszone.vercel.app/</loc>',
    '    <lastmod>2023-04-23</lastmod>',
    '    <changefreq>daily</changefreq>',
    '    <priority>1.0</priority>',
    '  </url>'
  ];
  data.forEach((dd) => {
    xml_content.push('  <url>');
    xml_content.push('    <loc>https://plantszone.vercel.app/plant/' + dd.post_id + '</loc>')
    xml_content.push('    <lastmod>2023-04-23</lastmod>')
    xml_content.push('    <changefreq>daily</changefreq>')
    xml_content.push('    <priority>1.0</priority>')
    xml_content.push('  </url>');

  })
  xml_content.push('</urlset>');
  res.set('Content-Type', 'text/xml')
  res.send(xml_content.join('\n'))
})

app.get('/live', cors(), async (req, res) => {
  let data = await axios.get('https://sindomall.com/seller/0c3905aab62bb06905442d31e93e48d0f57b12f3836c831e9e39049a70b9b163/products?v=' + Date.now());
  dataJson = JSON.stringify(data.data);
  res.send({
    message: 'success'
  })
})

app.get('/getdata', cors(), (req, res) => {
  axios.get('https://sindomall.com/v2/mobile/products/455317')
    .then(function (data) {
      res.send(data.data)
    });
})

app.get('/plant/:produk', async (req, res) => {
  var origin = req.get('host');
  query(`SELECT data kl FROM datapz WHERE kode = 'data'`, function (d) {
    const plain = Buffer.from(d[0].kl, 'base64').toString('utf8');
    var data = plain;
    data = JSON.parse(data);
    data = data.data.filter(function (c) {
      if (c.post_id === req.params.produk) {
        return c;
      }
    });
    res.render('produk', { origin: origin, port: PORT, data: data[0], datas: plain })
  })
})

app.get('/excel', async (req, res) => {
  const file = reader.readFile(path.join(__dirname, 'public', 'post.xlsx'))

  let data = []

  const sheets = file.SheetNames

  for (let i = 0; i < sheets.length; i++) {
    const temp = reader.utils.sheet_to_json(
      file.Sheets[file.SheetNames[i]])
    temp.forEach((res) => {
      data.push(res)
    })
  }

  // Printing data
  res.json(data);
})

const updateX = function(c){
  var t = c.data.data;
  var d = t.map(function (y, z) {
    var num = 6;
    var c = {
      post_id: y._id,
      product_name: y.name,
      description: y.description,
      qty: '1',
      price: y.price.toString(),
      pot_number: y.number,
      product_media: y.images.map(function (a, i) {
        return {
          id: (function () {
            num++;
            return num;
          }),
          image: 'https://api.sindomall.com/storage/browse?key=' + a.w1024,
        }
      })
    }
    return c;
  })
  return d;
}

app.get('/update/data/pr', cors(), (req, res) => {
  axios.get('https://api.sindomall.com/products?limit=300&keyword=plantszone&page=1&order=_id:desc')
  .then(function (c) {
    let d = `INSERT INTO produk (kode,data) SELECT a.kode, a.data FROM (\n`+updateX(c).map(function(r){
      return {
        kode: r.post_id,
        data: Buffer.from(JSON.stringify(r), 'utf8').toString('base64')
      }
    }).map(function(r){
      return `SELECT '${r.kode}' kode, '${r.data}' data`
    }).join("\n UNION ALL \n")+`) a LEFT JOIN produk p ON p.kode = a.kode WHERE p.kode IS NULL`;
    query(`TRUNCATE produk`, function(r){
      query(d, function(r){
        res.send(`alert('update)`)
      });
    });
  })
})

app.get('/update/data', cors(), (req, res) => {
  axios.get('http://103.152.118.236:5000/update/data')
    .then(function (c) {
        res.send(`alert('update')`)
    });
})

app.get('/get/data', cors(), (req, res) => {
  query(`SELECT * FROM produk `, function (r) {
    res.json(r)
  });
})

app.get('/delete/data/:kode', cors(), (req, res) => {
  var kode = req.params.kode;
  query(`DELETE FROM produk WHERE kode = '${kode}' `, function (r) {
    res.send('alert("' + kode + ' dihapus"');
  });
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})