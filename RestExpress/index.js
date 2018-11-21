var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'myDB';

app.listen(3000, function(){
    console.log('Rest Express running on port 3000!');
});

app.use(cookieParser());

app.use(function (req, res, next){
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");

    // Request methods you wish to allow
    //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
})

app.get('/getSomeData', function (req, res) {
    //return res.json({data: "Just Hello!"});
    console.log(req.cookies.lastName);
    var nome = req.query['Nome'];
    res.cookie('lastName', nome);

    MongoClient.connect(url, function(err, client) {
        if(!err){
            const db = client.db(dbName);
            db.collection('peoples').findOne({Nome: nome}, function(err, result){
                res.send(result);
            });
            client.close();
        } 
    });   
});

app.get('/', function (req, res){
    res.send('<h1>Hello World</h1>');
});