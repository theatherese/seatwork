var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

app.get('/',function(req,res){
    res.render('index');
});

app.post('/', urlencodedParser,function(req,res){
    // console.log(req.body);
    res.render('index',{qs: req.query});
});

app.listen(8000);