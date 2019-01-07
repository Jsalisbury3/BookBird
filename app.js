const express = require('express');
const webserver = express();
const jwt = require('jwt-simple');
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

webserver.get('/api/listings', (request, response) => {
    console.log("listing running");
    db.connect(() => {
        console.log("connected to database");
        const query = "SELECT l.book_condition, l.price, l.comments, l.book_id, b.title, b.ISBN, b.author, b.edition FROM `listing` AS l JOIN `books` AS b ON l.book_id = b.id";
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


webserver.post('/api/addListing', (request, response) => {
    const {title, condition, ISBN, author, edition, price, comments, images} = request.body;
    db.connect(() => {
        console.log("connected posting");
        const query = "SELECT b.ID FROM `books` AS b WHERE b.ISBN = '"+ ISBN +"'";
        // book_condition = '" + condition + "', price = " + price + ", comments = '" + comments + "', images = '" + images + "'
        db.query(query, (err, data) => {
            if(!data.length) {
                const query = "INSERT INTO `books` SET title = '" + title + "', ISBN = '" + ISBN + "', author = '" + author + "', edition = " + edition + "";
                db.query(query, (err, data) => {
                    if(!err) {
                        const query = "INSERT INTO `listing` SET listing.book_id = '" +data.insertId+"', price = '"+ price +"', book_condition = '"+condition+"', comments = '"+comments+"'";
                        db.query(query, (err, response) => {
                            if(!err) {
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

            if(!err) {
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
    console.log('filter worked');
    console.log('Request filter: ', request.body);

    const { ISBN } = request.body;
    
    db.connect(()=> {
        console.log('Connected Filter!');
        const query = "SELECT b.title, b.ISBN, b.author FROM `books` AS b WHERE b.title LIKE '%"+ISBN+"%' OR b.ISBN LIKE '%"+ISBN+"%' OR b.author LIKE '%"+ISBN+"%' "

        db.query(query,(err, data) => {
            if(!err) {
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
    console.log("listing running");
    console.log("HEYYYYYOOO", request);
    db.connect(() => {
        console.log("connected to database");
        console.log("LLOOOOKIE HERE: ", request.params.bookId);
        const query = "SELECT l.ID, l.accounts_id, l.book_condition, l.price, l.comments, l.book_id, b.ID, b.title, b.author, b.edition, b.ISBN, a.email, a.ID FROM `listing` AS l JOIN `books` AS b ON l.book_id = b.ID JOIN `accounts` AS a ON a.ID = l.accounts_id WHERE l.`id` = "+request.params.bookId+"";
        db.query(query, (err, data) => {
            console.log("query valid");
            console.log(query);
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

//sign-in endpoint to grab the users id.
webserver.post('/api/SignIn', (request, response) => {
    console.log("sign-in running");
    const {email, password} = request.body;
    console.log("BODYYYYYYY: ", request.body);
    console.log("email and password: ", email, password);
    db.connect(() => {
        console.log("connected to db sign-in");
        const query = "SELECT a.ID from `accounts` AS a WHERE a.email = '"+email+"' ";
        db.query(query, (err, data) => {
            console.log("sign-in query valid");
            console.log("THE QUERYYYYYYY: ", query);
            console.log("SIGN IN ID FROM QUERY: ", data);
            if(!err) {
                // const userToken = jwt.encode(data, secret);
                let output = {
                    success: true,
                    data: data,
                };
                console.log("THIS IS THE TOKEN I MADEEEEE: ", data);
                response.send(output);
            } else {
                console.log("Error sign-in", err);
            }
        })
    })
});


//kuroash's profile page.
// webserver.post('api/UserProfile', (request, response) => {
//     console.log("user profile is running");
//     db.connect(() => {
//         console.log("connected to db profile");
//         const query = "SELECT l.book_condition, l.price, l.comments, l.book_id, b.title, b.ISBN, b.author, b.edition FROM `` AS  JOIN `` AS  ON";
//         db.query(query, (err, data) => {
//             console.log("query valid profile");
//             if(!err) {
//                 const output = {
//                     success: true,
//                     data: data,
//                 };
//                 response.send(output);
//             } else {
//                 console.log("Profile error: ", error);
//             }
//         })
//     })
// });




// webserver.post('/api/login', (request, response) => {
//
// });


















