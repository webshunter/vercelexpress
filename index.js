const express = require('express')
const path= require('path')
const app = express()
const axios = require('axios');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const fs = require('fs');
const html2canvas = require('html2canvas')

let dataJson = '';

app.use(cors({
  origin: '*'
}));

app.set('view engine', 'ejs')

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));

app.get('/', async (req, res) => {
  var origin = req.get('host');
  if(dataJson != ''){
      res.render('index', {origin: origin, port: PORT, data: dataJson}) 
  }else{
      let data = await axios.get('https://sindomall.com/seller/0c3905aab62bb06905442d31e93e48d0f57b12f3836c831e9e39049a70b9b163/products?v='+Date.now());  
      dataJson = JSON.stringify(data.data)
      res.render('index', {origin: origin, port: PORT, data: JSON.stringify(data.data)}) 
  }
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

app.get('/plant/:produk', async (req, res) => {
  var origin = req.get('host');
  var data = dataJson;
  data = JSON.parse(data);
  data = data.data.filter(function(c){
    if(c.post_id === req.params.produk){
      return c;
    }
  });
  var datas = await fs.readFileSync(path.join(__dirname,'public','plants.txt'), 'utf8');
  res.render('produk', {origin: origin, port: PORT, data: data[0], datas: datas}) 
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})