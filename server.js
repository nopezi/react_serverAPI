var express = require('express');
var app = express();

var mysql = require('mysql');
var bodyParser = require('body-parser');
const cors = require('cors')

app.use(bodyParser.json({type:'application/json'}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
var con = mysql.createConnection({
    host : 'remotemysql.com',
    user : 'j4kViAm1sf',
    password : 'PksqOonHCd',
    database : 'j4kViAm1sf',
    multipleStatements : true
});

app.get('/with-cors', cors(), (req, res, next) => {
    res.json({ msg: 'WHOAH with CORS it works! 🔝 🎉' })
  })

var server = app.listen(1000, function(){
    var host = server.address().address
});

con.connect(function(error){
    if(error) console.log(error);
    else console.log("connected");
});

// show all data profile

app.get('/profil', function(req, res){
    con.query('select * from profil', function(error, rows, fields){
        if(error) console.log(error);

        else{
            console.log(rows);
            res.send(rows);
        }
    });
});

// show data profile per id

app.get('/profil/:id', function(req, res){
    con.query('SELECT * FROM profil WHERE id = ?',[req.params.id], function(error, rows, fields){
        if(error) console.log(error);
            
        else{
            console.log(rows);
            res.send(rows);
        }
    });
});

// delete data profil

app.delete('/profil/:id', function(req, res){
    con.query('DELETE FROM profil WHERE id = ?',[req.params.id], function(error, rows, fields){
        if(error) console.log(error);
            
        else{
            console.log(rows);
            res.send('delete sukses');
        }
    });
});

// insert data profil

app.post('/profil', function(req, res){
    let emp = req.body;
    var sql = "INSERT INTO profil (nama, alamat) VALUES (?, ?)";
    con.query(sql,[emp.nama, emp.alamat], function(error, rows, fields){
        if(error) console.log(error);
            
        else{
            // console.log(rows);
            res.send('sukses input data');
            // rows.forEach(element => {
            //     if(element.constructor == Array)
            //     res.send('Inserted profil id : ' +element[0].nama);
            // });
        }
    });
});