const express = require('express')
const path= require('path')
const app = express()
const axios = require('axios');
const PORT = process.env.PORT || 3000;

let dataJson = '';

app.set('view engine', 'ejs')

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));

app.get('/', async (req, res) => {
  if(dataJson == ''){
    let data = await axios.get('https://sindomall.com/seller/0c3905aab62bb06905442d31e93e48d0f57b12f3836c831e9e39049a70b9b163/products');  
    dataJson = JSON.stringify(data.data);
    res.render('index', {port: PORT, data: JSON.stringify(data.data)}) 
  }else{
    res.render('index', {port: PORT, data: dataJson}) 
  }
})

app.get('/about', (req, res) => {
  res.render('about')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})