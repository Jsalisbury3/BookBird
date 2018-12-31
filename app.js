const express = require('express');
const webserver = express();
const mysql_creds = require('./config/mysql_creds.js');
const mysql = require('mysql');
const db = mysql.createConnection(mysql_creds);

webserver.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

webserver.use(express.static(__dirname + '/client/dist/html'));
webserver.use(express.urlencoded({extended : false}));
webserver.use(express.json());

webserver.get('/listings', (request, response) => {
    console.log("listing running");
    db.connect(() => {
        console.log("connected to database");
        const query = "SELECT * FROM `listing`";
        db.query(query, (err, data) => {
            console.log("query valid");
            if(!err) {
                let output = {
                    success: true,
                    data: data,
                };
                response.send(output);
            } else {
                console.log(err);
            }
        })
    })
});


webserver.post('/addListing', (request, response) => {
    const {title, condition, ISBN, author, edition, price, comments, images} = request.body;
    db.connect(() => {
        console.log("connected posting");
        const query = "INSERT INTO `listing` SET title = '" + title + "', book_condition = '" + condition + "', ISBN = '" + ISBN + "', author = '" + author + "', edition = " + edition + ", price = " + price + ", comments = '" + comments + "', images = '" + images + "'";
        db.query(query, (err, data) => {
            if(!err) {
                let output = {
                    success: true,
                    data: data,
                };
            } else {
                console.log("you dunn fuhhh up bruh");
            }
        });
    })
});


webserver.listen(7000, () => {
    console.log("listening on port 7000");
});
