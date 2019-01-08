const express = require('express');
const webserver = express();
const jwt = require('jwt-simple');
const mysql_creds = require('./config/mysql_creds.js');
const mysql = require('mysql');
const db = mysql.createConnection(mysql_creds);

const upload = require('./services/file-upload');
console.log('UPLOAD: ', upload)

const imageUpload = upload.single('image');

webserver.post('/api/file-upload', function ( req, res ) {

    imageUpload(req, res, function(err) {
          return res.json({ 'imageUrl: ': req.file.location });
    })

});

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
    const userIDToken = request.headers['token'];
    console.log("THIS IS THE USER ID TOKEN: ", userIDToken);
    db.connect(() => {
        console.log("connected posting");
        const query = "SELECT b.ID FROM `books` AS b WHERE b.ISBN = '"+ ISBN +"'";
        db.query(query, (err, data) => {
            if(!data.length) {
                const query = "INSERT INTO `books` SET title = '" + title + "', ISBN = '" + ISBN + "', author = '" + author + "', edition = " + edition + "";
                db.query(query, (err, data) => {
                    if(!err) {
                        const query = "INSERT INTO `listing` SET listing.book_id = '" +data.insertId+"', price = '"+ price +"', book_condition = '"+condition+"', comments = '"+comments+"', accounts_id = '1', public_id='21'";
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
        //need l.price, l.condition and b.edition
        const query = "SELECT b.title, b.ISBN, b.author, b.edition, l.price, l.book_condition FROM `books` AS b JOIN `listing` AS l ON l.book_id = b.ID WHERE b.title LIKE '%"+ISBN+"%' OR b.ISBN LIKE '%"+ISBN+"%' OR b.author LIKE '%"+ISBN+"%' "
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
                const userToken = jwt.encode(data, 'HS256');
                let output = {
                    success: true,
                    data: userToken,
                };
                console.log("THIS IS THE TOKEN I MADEEEEE: ", userToken);
                response.send(output);
            } else {
                console.log("Error sign-in", err);
            }
        })
    })
});



webserver.get('/api/UserProfile', (request, response) => {
    console.log("user profile is running");
    const userIDToken = request.headers['token'];
    const decoded = jwt.decode(userIDToken, 'HS256', true);
    const userID = decoded[0];
    console.log("USER ID: ", userID);
    db.connect(() => {
        console.log("connected to db profile");
        const query = "SELECT a.ID, l.book_condition, l.price, l.comments, l.book_id, b.title, b.ISBN, b.author, b.edition FROM `listing` AS l JOIN `books` AS b ON l.book_id = b.ID JOIN `accounts` AS a ON a.ID = l.accounts_id WHERE a.ID = '"+userID.ID+"'";
        db.query(query, (err, data) => {
            console.log("query valid profile");
            if(!err) {
                console.log("THIS IS THE DATA FROM PROFILE QUERY: ", data);
                const output = {
                    success: true,
                    data: data,
                };
                response.send(output);
            } else {
                console.log("Profile error: ", err);
            }
        })
    })
});



















