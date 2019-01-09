const express = require('express');
const webserver = express();
const jwt = require('jwt-simple');
const mysql_creds = require('./config/mysql_creds.js');
const mysql = require('mysql');
const db = mysql.createConnection(mysql_creds);

webserver.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

webserver.use(express.static(__dirname + '/client/dist/html'));
webserver.use(express.urlencoded({extended: false}));
webserver.use(express.json());

webserver.get('/api/listings', (request, response) => {
    db.connect(() => {
        const query = "SELECT l.book_condition, l.price, l.comments, l.book_id, b.title, b.ISBN, b.author, b.edition FROM `listing` AS l JOIN `books` AS b ON l.book_id = b.id";
        db.query(query, (err, data) => {
            if (!err) {
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


webserver.post('/api/addListing', (request, response) => {
    const {title, condition, ISBN, author, edition, price, comments, images} = request.body;
    const userIDToken = request.headers['token'];
    db.connect(() => {
        const query = "SELECT b.ID FROM `books` AS b WHERE b.ISBN = '" + ISBN + "'";
        db.query(query, (err, data) => {
            if (!data.length) {
                const query = "INSERT INTO `books` SET title = '" + title + "', ISBN = '" + ISBN + "', author = '" + author + "', edition = " + edition + "";
                db.query(query, (err, data) => {
                    if (!err) {
                        const query = "INSERT INTO `listing` SET listing.book_id = '" + data.insertId + "', price = '" + price + "', book_condition = '" + condition + "', comments = '" + comments + "', accounts_id = '1', public_id='21'";
                        db.query(query, (err, response) => {
                            if (!err) {
                                console.log("all queries are good")
                            } else {
                                console.log("error", err);
                            }
                        })
                    } else {
                        console.log("error", err);
                    }
                })
            } else {
                console.log("data: ", data);
            }

            if (!err) {
                let output = {
                    success: true,
                    data: data,
                };
            } else {
                console.log("error", err);
            }
        });
    })
});

webserver.post('/api/filter', (request, response) => {
    const {ISBN} = request.body;
    db.connect(() => {
        const query = "SELECT b.title, b.ISBN, b.author, b.edition, l.price, l.book_condition FROM `books` AS b JOIN `listing` AS l ON l.book_id = b.ID WHERE b.title LIKE '%" + ISBN + "%' OR b.ISBN LIKE '%" + ISBN + "%' OR b.author LIKE '%" + ISBN + "%' "
        db.query(query, (err, data) => {
            if (!err) {
                let output = {
                    success: true,
                    data: data,
                };
                response.send(output);
            } else {
                console.log("error", err);
            }
        })
    })
})


webserver.listen(7000, () => {
    console.log("listening on port 7000");
});


webserver.get('/api/BookInfoIndex/:bookId', (request, response) => {
    db.connect(() => {
        const query = "SELECT l.ID, l.accounts_id, l.book_condition, l.price, l.comments, l.book_id, b.ID, b.title, b.author, b.edition, b.ISBN, a.email, a.ID FROM `listing` AS l JOIN `books` AS b ON l.book_id = b.ID JOIN `accounts` AS a ON a.ID = l.accounts_id WHERE l.`id` = " + request.params.bookId + "";
        db.query(query, (err, data) => {
            if (!err) {
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

//sign-in endpoint to grab the users id.
webserver.post('/api/SignIn', (request, response) => {
    const {email, password} = request.body;
    db.connect(() => {
        const query = "SELECT a.ID from `accounts` AS a WHERE a.email = '" + email + "' AND a.password = '" + password + "'";
        db.query(query, (err, data) => {
            var userToken = jwt.encode(email + password + Date.now(), 'HS256');
            if (!err) {
                const query = "INSERT INTO `loggedin` SET loggedin.account_id = " + data[0].ID + ", loggedin.token = '" + userToken + "'";
                db.query(query, (err, data) => {
                });
                let output = {
                    success: true,
                    data: userToken,
                };
                response.send(output);
            } else {
                console.log("Error sign-in", err);
            }
        })
    })
});

webserver.get('/api/UserProfile', (request, response) => {
    const userIDToken = request.headers['token'];
    db.connect(() => {
        const query = 'SELECT lg.account_id FROM `loggedin` AS lg WHERE lg.token = "' + userIDToken + '"';
        db.query(query, (err, data) => {
            if (!err) {
                const query = "SELECT a.ID, l.book_condition, l.ID, l.price, l.comments, l.book_id, b.title, b.ISBN, b.author, b.edition FROM `listing` AS l JOIN `books` AS b ON l.book_id = b.ID JOIN `accounts` AS a ON a.ID = l.accounts_id WHERE a.ID = '" + data[0].account_id + "'";
                db.query(query, (err, data) => {
                    if (!err) {
                        const output = {
                            success: true,
                            data: data,
                        };
                        response.send(output);
                    } else {
                        console.log("Profile error: ", err);
                    }
                })
            } else {
                console.log("query error getting account id from token: ", err);
            }
        })
    })
});

webserver.delete("/api/UserProfile",(request,response)=>{
    const userIDToken = request.headers['token'];
    const listingID = request.body.ID;
    db.connect(()=>{
        const query = "SELECT lg.account_id FROM `loggedin` AS lg WHERE lg.token = '"+userIDToken+"'";
        db.query(query,(err, data)=>{
            console.log("query valid deletePost");
            if(!err){
                const query = "DELETE FROM `listing` WHERE accounts_id = '"+data[0].account_id+"' AND ID = '"+listingID+"'";
                console.log("delete query: ", query);
                db.query(query, (err, data) => {
                    if(!err) {
                        console.log("deleted ID: " + listingID);
                    } else {
                        console.log("error deleting post: ", err);
                    }
                })
            }else{
                console.log("Delete error:",err);
            }
        })
    })
});


















