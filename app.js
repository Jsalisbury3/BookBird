const axios = require('axios');
const bodyParser = require('body-parser');
const multer = require('multer');
const express = require('express');
const webserver = express();
const jwt = require('jwt-simple');
const mysql_creds = require('./config/mysql_creds.js');
const mysql = require('mysql');
const db = mysql.createConnection(mysql_creds);


const awsUpload = require('./services/file-upload');



webserver.post('/api/photo',function(req,res){
    let storage = multer.diskStorage({
        destination: function (req, file, callback) {
          callback(null, './uploads');
        },
        filename: function (req, file, callback) {
          callback(null, file.fieldname + '-' + Date.now());
        }
      });
    
    let fsUpload = multer({ storage : storage }).array('userPhoto',2);

    var response = fsUpload(req,res,function(err) {
        console.log('Request: ', req);
    
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded", );
    });
});


webserver.post('/api/file-upload', function ( req, res ) {
    console.log('File UPload Req')
    awsUpload(req, res, function(err) {
          return res.json({ 'imageUrl: ': req.file });
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
webserver.use(bodyParser.json())

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
    const {title, condition, ISBN, author, edition, price, comments, images, photoArray,files} = request.body;
    console.log("ADD LISTING IS RUNNING");
    console.log('REQUEST BODY', request.body);
    const output = {
        data: photoArray
    }

    // axios({
    //     method: 'post',
    //     url: 'http://localhost:3000/api/file-upload',
    //     image: request.body.fileString[0]
    // }).then( (response)=> {

    //     const output={
    //         success: true,
    //         data: response
    //     }
    //     response.send(output);
    //     // console.log("WORKED!", response)
        
    // })
    response.send(output);
   
    // const userIDToken = request.headers['token'];
    // db.connect(() => {
    //     console.log("connected posting");
    //     const query = "SELECT b.ID FROM `books` AS b WHERE b.ISBN = '"+ ISBN +"'";
    //     db.query(query, (err, data) => {
    //         if(!data.length) {
    //             const query = "INSERT INTO `books` SET title = '" + title + "', ISBN = '" + ISBN + "', author = '" + author + "', edition = " + edition + "";
    //             db.query(query, (err, data) => {
    //                 if(!err) {
    //                     const query = "INSERT INTO `listing` SET listing.book_id = '" +data.insertId+"', price = '"+ price +"', book_condition = '"+condition+"', comments = '"+comments+"', accounts_id = '1', public_id='21'";
    //                     db.query(query, (err, response) => {
    //                         if(!err) {
    //                             console.log("all queries are good")
                                
    //                         } else {
    //                             console.log("error", err);
    //                         }
    //                     })
    //                 } else {
    //                     console.log("error", err);
    //                 }
    //             })
    //         } else {
    //             console.log("data: ", data);
    //         }

    //         if(!err) {
    //             let output = {
    //                 photoArray: photoArray,
    //                 success: true,
    //                 data: data,
    //             };

    //             response.send(output);
                
    //         } else {
    //             console.log("error", err);
    //         }
    //     });
    // })
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
    console.log("HEYYYYYOOO", request.body);
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
    const {email, password} = request.body;
    
    db.connect(() => {
        
        const query = "SELECT a.ID from `accounts` AS a WHERE a.email = '"+email+"' ";
        db.query(query, (err, data) => {
        
            if(!err) {
                const userToken = jwt.encode(data, 'HS256');
                let output = {
                    success: true,
                    data: userToken,
                };
               
                response.send(output);
            } else {
                
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



















