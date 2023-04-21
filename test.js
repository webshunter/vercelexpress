const html2canvas = require('html2canvas');
const fs = require('fs');
const path= require('path');
const axios = require('axios');

axios.get('https://sindomall.com/seller/0c3905aab62bb06905442d31e93e48d0f57b12f3836c831e9e39049a70b9b163/products')
.then(function(data){
    console.log(data.data)
});  
