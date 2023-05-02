const html2canvas = require('html2canvas');
const fs = require('fs');
const path= require('path');
const axios = require('axios');

axios.get('https://sindomall.com/v2/mobile/products/455317')
.then(function(data){
    console.log(data.data)
});  
