const express = require('express')
const path= require('path')
const app = express()
const axios = require('axios');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const fs = require('fs');
const html2canvas = require('html2canvas')
const mysql = require('mysql');
const reader = require('xlsx')

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

let dataJson = '';

app.use(cors({
  origin: '*'
}));

app.set('view engine', 'ejs')

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));

app.get('/', async (req, res) => {
  var origin = req.get('host');
  query(`SELECT data kl FROM datapz WHERE kode = 'data'`, function(d){
    const plain = Buffer.from(d[0].kl, 'base64').toString('utf8')
    res.render('index', {origin: origin, port: PORT, data : plain}) 
  })
})


app.get('/sitemap.xml', cors(), async (req,res) => {
  var data = await fs.readFileSync(path.join(__dirname,'public','plants.txt'), 'utf8');
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
  data.forEach((dd)=>{
    xml_content.push('  <url>');
    xml_content.push('    <loc>https://plantszone.vercel.app/plant/'+dd.post_id+'</loc>')
    xml_content.push('    <lastmod>2023-04-23</lastmod>')
    xml_content.push('    <changefreq>daily</changefreq>')
    xml_content.push('    <priority>1.0</priority>')
    xml_content.push('  </url>');

  })
  xml_content.push('</urlset>');
  res.set('Content-Type', 'text/xml')
  res.send(xml_content.join('\n'))
})

app.get('/live', cors() , async (req,res)=>{
  let data = await axios.get('https://sindomall.com/seller/0c3905aab62bb06905442d31e93e48d0f57b12f3836c831e9e39049a70b9b163/products?v='+Date.now());  
  dataJson = JSON.stringify(data.data);
  res.send({
    message: 'success'
  })
})

app.get('/getdata', cors() ,(req,res) => {
  axios.get('https://sindomall.com/v2/mobile/products/455317')
  .then(function(data){
    res.send(data.data)
  });
})

app.get('/plant/:produk', async (req, res) => {
  var origin = req.get('host');
  query(`SELECT data kl FROM datapz WHERE kode = 'data'`, function(d){
    const plain = Buffer.from(d[0].kl, 'base64').toString('utf8');
    var data = plain;
    data = JSON.parse(data);
    data = data.data.filter(function(c){
      if(c.post_id === req.params.produk){
        return c;
      }
    });
    res.render('produk', {origin: origin, port: PORT, data: data[0], datas: plain}) 
  })
})

app.get('/excel', async (req,res) => {
  const file = reader.readFile(path.join(__dirname,'public','post.xlsx'))
  
  let data = []
    
  const sheets = file.SheetNames
    
  for(let i = 0; i < sheets.length; i++)
  {
     const temp = reader.utils.sheet_to_json(
          file.Sheets[file.SheetNames[i]])
          temp.forEach((res) => {
          data.push(res)
     })
  }
    
  // Printing data
  res.render(data);
})


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})