var express = require('express');
var path = require('path');
var fs = require('fs');

const app = express()

app.use(express.static('app'))

app.get('/', function(req, res){
    res.render('index')
})
app.get('/api/download/cv', function(req, res){
    var filePath = path.join(__dirname, 'app/source/sandeepghosh.pdf');
    var fileName = "sandeepghosh.pdf"; // file name 
    res.download(filePath, fileName);
})


app.listen(3001, function(){
    console.log('application started on port 3001')
})