const html2canvas = require('html2canvas');
const fs = require('fs');
const path= require('path')

let data = fs.readFileSync( path.join(__dirname,'public','canvas','data.txt') , 'utf8');
data = JSON.parse(data);
console.log(data);