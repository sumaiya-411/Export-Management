var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'exportDbs';

str = "string";

var billNum = 1001;

/*
app.route('/apparelsCategory').get(function (req, res) {

                res.render('apparelsCat');
});

*/

app.route('/').get(function (req, res) {

    res.render('login',{username:""});
});


app.route('/admin').get(function (req, res) {

    res.render('adminlogin', { username: "" });
});

app.route('/userhome').get(function (req, res) {

    res.render('userhome');
});


app.route('/payment').post(function (req, res) {
    //res.render('apparelsCat');
    res.render('payment', { products: req.body.products });
});


app.route('/adminroutes').post(function (req, res) {

    res.render("routes");
});




app.route('/register').post(function (req, res) {

    res.render('register');
});

app.route('/registered').post(function (req, res) {
    MongoClient.connect(url, function (err, client) {

        assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        db.collection('login').insert({
            fname: req.body.fname, sname: req.body.sname, email: req.body.email,
            userPassword: req.body.userPassword, dob: req.body.dob, gender: req.body.gender, phone: req.body.phone
        }, function (err, result) {
            if (err) throw err;

            if (!result) {
                db.close;
                res.send("Registration Error");
            }
            else {
                db.close;
                res.render('login', { username: "" });
            }
        });
    });
    //    res.send(req.body);
});

app.route('/adminregister').post(function (req, res) {

    res.render('adminregister');
});

app.route('/adminregistered').post(function (req, res) {
    MongoClient.connect(url, function (err, client) {

        assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        db.collection('adminlogin').insert({
            fname: req.body.fname, sname: req.body.sname, email: req.body.email,
            userPassword: req.body.userPassword, dob: req.body.dob, gender: req.body.gender, phone: req.body.phone
        }, function (err, result) {
            if (err) throw err;

            if (!result) {
                db.close;
                res.send("Registration Error");
            }
            else {
                db.close;
                res.render('adminlogin', { username: "" });
            }
        });
    });
    //    res.send(req.body);
});

app.post('/addCategory', function (req, res) {
    //var prodD = req.body.prods;
    var catArr = [];
    console.log(req.body);
    //prodArr = JSON.parse(req.body);
    catArr = req.body;
    console.log(catArr);
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        var col = db.collection('category');

        col.insert(catArr, { w: 1 }, function (err, result) {

            //col.insert({ pCost: 100, hosName: 'Something' }, { w: 1 }, function (err, result) {
            if (err) {
                console.log('error occured');
                res.json("error occured");
            }
            else {
                db.close;
                res.json("Data Submitted Successfully");
            }
        });
    });
});


app.post('/addRoute', function (req, res) {
    //var prodD = req.body.prods;
    var rArr = [];
    console.log(req.body);
    //prodArr = JSON.parse(req.body);
    rArr = req.body;
    console.log(rArr);
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        var col = db.collection('routes');

        col.insert(rArr, { w: 1 }, function (err, result) {

            //col.insert({ pCost: 100, hosName: 'Something' }, { w: 1 }, function (err, result) {
            if (err) {
                console.log('error occured');
                res.json("error occured");
            }
            else {
                db.close;
                res.json("Data Submitted Successfully");
            }
        });
    });
});



app.post('/updatecategory', function (req, res) {
    //var prodD = req.body.prods;
    var catArr = [];
    console.log(req.body);
    //prodArr = JSON.parse(req.body);
    catArr = req.body;
    catString = catArr[0];
    console.log("catArr array from updateProduct http post");
    console.log(catString);
    console.log(catArr[0].ccode);
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        var col = db.collection('category');
        
        col.update({ ccode: catArr[0].ccode }, catString, function (err, result) {
            if (err) {
                console.log(err);
                res.json("error occured");
            }
            else {
                db.close;
                res.json("Data Updated Successfully");
            }
        });
        
    });
});


app.post('/updateroute', function (req, res) {
    //var prodD = req.body.prods;
    var rArr = [];
    console.log(req.body);
    //prodArr = JSON.parse(req.body);
    rArr = req.body;
    rString = rArr[0];
    console.log("catArr array from updateProduct http post");
    console.log(rString);
    console.log(rArr[0].rcode);
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        var col = db.collection('routes');

        col.update({ rcode: rArr[0].rcode }, rString, function (err, result) {
            if (err) {
                console.log(err);
                res.json("error occured");
            }
            else {
                db.close;
                res.json("Data Updated Successfully");
            }
        });

    });
});

app.post('/getcat', function (req, res) {
    var catArr = [];
    catArr = req.body;
    console.log("catArr array from getCategory http post");
    console.log(catArr);
    console.log(catArr[0].ccode); 
    
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        var col = db.collection('category');
        db.collection('category').findOne({ ccode: catArr[0].ccode }, {projection: { _id: 0 }}, function (err, result) {
            if (err) throw err;

            if (!result) {
                db.close;
                res.json('Invalid category code');
            }
            else {
                db.close;
                console.log("result");
                console.log(result);
                var r = [];
                r.push(result);

                console.log(r);
//                console.log(Array.isArray(r));
                s=JSON.stringify(r);
                        
                console.log(s);
                res.json(s);

            }
        });
        
    }); 
});

app.post('/getroute', function (req, res) {
    var rArr = [];
    rArr = req.body;
    console.log("rArr array from getCategory http post");
    console.log(rArr);
    console.log(rArr[0].rcode);

    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        var col = db.collection('routes');
        db.collection('routes').findOne({ rcode: rArr[0].rcode }, { projection: { _id: 0 } }, function (err, result) {
            if (err) throw err;

            if (!result) {
                db.close;
                res.json('Invalid route code');
            }
            else {
                db.close;
                console.log("result");
                console.log(result);
                var r = [];
                r.push(result);

                console.log(r);
                //                console.log(Array.isArray(r));
                s = JSON.stringify(r);

                console.log(s);
                res.json(s);

            }
        });

    });
});



app.post('/deletecategory', function (req, res) {
    var catArr = [];
    catArr = req.body;
    console.log("catArr array from deleteProduct http post");
    console.log(catArr);
    console.log(catArr[0].ccode);

    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        var col = db.collection('category');
        db.collection('category').deleteOne({ ccode: catArr[0].ccode }, function (err, result) {
            if (err) throw err;

            if (!result) {
                db.close;
                res.json('Invalid product code');
            }
            else {
                db.close;
                console.log(result);
                res.json("category deleted successfully");
            }
        });

    });
});


app.post('/deleteroute', function (req, res) {
    var rArr = [];
    rArr = req.body;
    console.log("rArr array from deleteroute http post");
    console.log(rArr);
    console.log(rArr[0].rcode);

    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        var col = db.collection('routes');
        db.collection('routes').deleteOne({ rcode: rArr[0].rcode }, function (err, result) {
            if (err) throw err;

            if (!result) {
                db.close;
                res.json('Invalid route code');
            }
            else {
                db.close;
                console.log(result);
                res.json("route deleted successfully");
            }
        });

    });
});

app.post('/getCategoryDetails', function (req, res) {

    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        var col = db.collection('books');

        db.collection('category').find({}, { projection: { _id: 0 } }).toArray(function (err, result) {
            if (err) throw err;

            if (!result) {
                db.close;
                res.json('Invalid product code');
            }
            else {
                db.close;
                console.log("result");
                console.log(result);

                // var r = [];
                // r.push(result);

                //console.log(r);
                //console.log(Array.isArray(r));
                s = JSON.stringify(result);

                console.log(s);

                res.json(s);

            }
        });

    });
});


app.post('/getRouteDetails', function (req, res) {

    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        var col = db.collection('books');

        db.collection('routes').find({}, { projection: { _id: 0 } }).toArray(function (err, result) {
            if (err) throw err;

            if (!result) {
                db.close;
                res.json('Invalid product code');
            }
            else {
                db.close;
                console.log("result");
                console.log(result);

                // var r = [];
                // r.push(result);

                //console.log(r);
                //console.log(Array.isArray(r));
                s = JSON.stringify(result);

                console.log(s);

                res.json(s);

            }
        });

    });
});


app.route('/admincargo').post(function (req, res) {

    MongoClient.connect(url, function (err, client) {

        assert.equal(null, err);
        console.log("Connected successfully to server");
        //console.log(req.body.userid);
        //console.log(req.body.username);
        //uid=req.body.userid;
        const db = client.db(dbName);
        db.collection('adminlogin').findOne({ email: req.body.email, userPassword: req.body.userPassword }, function (err, result) {
            if (err) throw err;
            
            if (!result) {
                db.close;
                res.send("Invalid Login");
            }
            else {
                db.close;
                res.render('cargo');
            }
        });
    });
});


app.route('/userhome').post(function (req, res) {

    MongoClient.connect(url, function (err, client) {

        assert.equal(null, err);
        console.log("Connected successfully to server");
        //console.log(req.body.userid);
        //console.log(req.body.username);
        //uid=req.body.userid;
        const db = client.db(dbName);
        db.collection('login').findOne({ email: req.body.email, userPassword: req.body.userPassword }, function (err, result) {
            if (err) throw err;

            if (!result) {
                db.close;
                res.send("Invalid Login");
            }
            else {
                db.close;
                res.render('userhome');
            }
        });
    });
});



app.route('/billing').post(function (req, res) {

    res.render('billing', { products: req.body.products });
});

app.route('/payment').post(function (req, res) {
    console.log(req.body.products);
    res.render('payment', { products: req.body.products });
});


app.route('/makePayment').post(function (req, res) {

    res.render("paymentPortal");
  
    /*
    prodsSoldWithBillNo = [{
        pCode: '',
        pCost: '',
        hosName: '',
        pImage: '',
        pDisc: '',
        pQuantity: '',
        billNo: ''
    }];


    MongoClient.connect(url, function (err, client) {

        assert.equal(null, err);
        console.log("Connected successfully to makePayment mongo");

        const db = client.db(dbName);

        db.collection('sales').find({}).sort({ billNo: -1 }).limit(1).toArray(function (err, result) {
            if (err) throw err;

            if (!result) {
                db.close;
                res.send("Database error");
            }
            else {
                db.close;
                //comment below line since billNum will be empty first time; later comment has to be removed
                billNum = result[0].billNo;

                console.log("Inside sales.find()");
                console.log(billNum);
                billNum = billNum + 1;
                db.collection('sales').insert({
                    billNo: billNum, totalAmount: req.body.totalAmount, fname: req.body.fname, cardno: req.body.cardno,
                    cardcvc: req.body.cardcvc, expmonth: req.body.month, expyear: req.body.year
                }, function (err, result) {
                    if (err) throw err;

                    if (!result) {
                        db.close;
                        res.send("Erro adding sales in database");
                    }
                    else {
                        db.close;
                    }
                    });
                //Insert sold products along with bill No

                var prodD = req.body.products;
                var prodArr = [];
                prodArr = JSON.parse(prodD);
                prodsSoldWithBillNo = prodArr;


                for (index = 0; index < prodsSoldWithBillNo.length; ++index) {
                    prodsSoldWithBillNo[index].billNo = billNum;
                    console.log(prodsSoldWithBillNo[index].billNo);
                }

                //angular.forEach(prodsSoldWithBillNo, function (item) { item.billNo = billNum; });
                console.log("Before Inserting");
                console.log(prodsSoldWithBillNo);

                var col = db.collection('productsSold');


                col.insert(prodsSoldWithBillNo, { w: 1 }, function (err, result) {
                    if (err) { db.close(); console.log('error occured'); res.send("Error adding sales products details"); }
                    else {
                        db.close;
                        res.render('homepageredirection');
                    }
                });


            }
        });


    });
*/
});

app.route('/vieworders').post(function (req, res) {

    res.render('order');
});



app.post('/getOrder', function (req, res) {
    var prodArr = [];
    prodArr = req.body;
    console.log("bill Num array from getOrder http post");
    console.log(prodArr);
    console.log(prodArr[0].billNo);
    var bno = prodArr[0].billNo;
    //var bno = parseInt(prodArr[0].billNo,10);
    //var bno = parseInt(prodArr[0].billNo, 10);
    //var bno = parseInt(prodArr[0].billNo, 10);
    //var bno = (typeof prodArr[0].billNo === 'string') ? parseInt(Number(n.replace(/"|'/g, ''))) : n;
    //var bno = parseInt(Number(n.replace(/"|'/g, '')));

    console.log(bno);

    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        var col = db.collection('shipment');
        db.collection('shipment').find({ billNo: bno }, { projection: { _id: 0 } }).toArray(function (err, result) {
            if (err) throw err;

            if (!result) {
                db.close;
                res.json('Invalid product code');
            }
            else {
                db.close;
                console.log("result");
                console.log(result);

                // var r = [];
                // r.push(result);

                //console.log(r);
                //console.log(Array.isArray(r));
                s = JSON.stringify(result);

                console.log(s);

                res.json(s);

            }
        });

    });
});

app.post('/addCargoOrder', function (req, res) {
    //var prodD = req.body.prods;
    var prodArr = [];
    console.log(req.body);
    //prodArr = JSON.parse(req.body);
    prodArr = req.body;
    console.log(prodArr);
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        var col = db.collection('shipment');

        col.insert(prodArr, { w: 1 }, function (err, result) {

            //col.insert({ pCost: 100, pName: 'Something' }, { w: 1 }, function (err, result) {
            if (err) {
                console.log('error occured');
                res.json("error occured");
            }
            else {
                db.close;
                res.json("Data Submitted Successfully");
            }
        });
    });
});

app.route('/homepage').post(function (req, res) {
    res.render('apparelsCat');
});

app.route('/aboutUs').post(function (req, res) {

    res.render("aboutUs");
});

app.route('/ourServices').post(function (req, res) {

    res.render("ourServices");
});



var exp = app.listen(port, function () {
    console.log('3000 is the magic port');
});

//exp.close;
