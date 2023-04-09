const express = require('express')
const path= require('path')
const app = express()
const axios = require('axios');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const fs = require('fs');

let dataJson = '';

app.use(cors({
  origin: '*'
}));

app.set('view engine', 'ejs')

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));

app.get('/', async (req, res) => {
  var origin = req.get('host');
  if (fs.existsSync(path.join(__dirname,'public','produk.txt'))) {
    var data = await fs.readFileSync(path.join(__dirname,'public','produk.txt'), 'utf8');
    res.render('index', {origin: origin, port: PORT, data: data}) 
  }else{
    let data = await axios.get('https://sindomall.com/seller/0c3905aab62bb06905442d31e93e48d0f57b12f3836c831e9e39049a70b9b163/products');  
    fs.writeFileSync(path.join(__dirname,'public','produk.txt'), JSON.stringify(data.data), 'utf8');
    res.render('index', {origin: origin, port: PORT, data: JSON.stringify(data.data)}) 
  }
})

app.get('/live', cors() ,async (req,res)=>{
  let data = await axios.get('https://sindomall.com/seller/0c3905aab62bb06905442d31e93e48d0f57b12f3836c831e9e39049a70b9b163/products');  
  let Json = JSON.stringify(data.data);
  fs.writeFileSync(path.join(__dirname,'public','produk.txt'), Json, 'utf8');
})

app.get('/plant/:produk', async (req, res) => {
  var origin = req.get('host');
  var data = await fs.readFileSync(path.join(__dirname,'public','produk.txt'), 'utf8');
  data = JSON.parse(data);
  data = data.data.filter(function(c){
    if(c.post_id === req.params.produk){
      return c;
    }
  });
  res.render('produk', {origin: origin, port: PORT, data: data[0]}) 
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})