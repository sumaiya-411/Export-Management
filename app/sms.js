var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine','ejs');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'productsDbs';

app.route('/dispbill').post(function (req, res) {

    var prodD = req.body.prods;
    var prodArr = [];

    //prodArr=prodD;

    //prodArr = JSON.parse(angular.toJson(prodData));
    prodArr = JSON.parse(prodD);

    /*
    var prodData = new prod({
        pCost: "1001",
        pName: "Nikon"
    });
*/

    /*     var prodData = new prod(prodArr );

             prodData.save(function (err) {
           res.send(prodArr);
           if (err) {
               res.send("Data not saved");
           }
       });
      */
// Use connect method to connect to the server
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        var col = db.collection('products');

        col.insert(prodArr, {w: 1}, function (err, result) {
            if(err)
            {console.log('error occured');}
            else{
                db.close;
            }
        });
    });
    res.send("data saved");
});


app.route('/register').post(function (req, res) {

    res.render('register');
});

app.route('/registered').post(function (req, res) {
    MongoClient.connect(url, function (err, client) {

        assert.equal(null, err);
        console.log("Connected successfully to server");
        //console.log(req.body.userid);
        //console.log(req.body.username);
        //uid=req.body.userid;
        const db = client.db(dbName);
        db.collection('login').insert({fname:req.body.fname, sname:req.body.sname, email:req.body.email,
        userPassword:req.body.userPassword, dob:req.body.dob, gender:req.body.gender, phone:req.body.phone},function (err,result) {
            if (err) throw err;

            if (!result)
            {
                db.close;
                res.send("Registration Error");
            }
            else {
                db.close;
                res.render('login',{username:req.body.fname});
            }
        });
    });
//    res.send(req.body);
});


app.route('/apparels').post(function (req, res) {

    MongoClient.connect(url, function (err, client) {

        assert.equal(null, err);
        console.log("Connected successfully to server");
        //console.log(req.body.userid);
        //console.log(req.body.username);
        //uid=req.body.userid;
        const db = client.db(dbName);
        db.collection('login').findOne({email:req.body.email, userPassword:req.body.userPassword},function (err,result) {
            if (err) throw err;

if (!result)
{
    db.close;
                res.send("Invalid Login");
            }
            else {
    db.close;
                res.render('apparels');
                }
        });
    });
});



app.route('/').get(function (req, res) {

    res.render('login',{username:""});
});



app.route('/billing').post(function (req, res) {
    res.render('billing',{products:req.body.prods});

});


var exp=    app.listen(port,function() {
      console.log('3000 is the magic port');
    });

//exp.close;
