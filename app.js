const { accessKeyId, secretAccessKey,region } = require('./config/amzns3_creds');
const AWS = require('aws-sdk');
const uuid = require('uuid/v4');
const axios = require('axios');
var cors = require('cors')
const bodyParser = require('body-parser');
const multer = require('multer');
const express = require('express');
const webserver = express();
const jwt = require('jwt-simple');
const mysql_creds = require('./config/mysql_creds.js');
const mysql = require('mysql');
const db = mysql.createConnection(mysql_creds);
const hash = require('./config/token-hash');

AWS.config.update( {
    accessKeyId, 
    secretAccessKey,
    region 
});

const s3 = new AWS.S3({
    signatureVersion: 'v4'
  });

const awsUpload = require('./services/file-upload');

webserver.get('/api/prepUpload', function(request, response) {

    const { query: {fileType}} = request;
    console.log(fileType);
    const key = `testing/jhgkghjg/${uuid()}`;

    s3.getSignedUrl('putObject', {
        Bucket: 'book-bird-test-bucket',  
        Key: key,      
        ContentType: fileType.type,
        Expires: 500,
        
    }, (err, url) => response.send({
            success: true, 
            key, 
            url,
            getUrl: url.split("?")[0],
    
    }));

});

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
    // const awsUpload = require('./services/file-upload');
    console.log('File UPload Req')
    awsUpload(req, res, function(err) {
          return res.json({ 'imageUrl: ': req.file });
    })

});

webserver.post('/api/save-image', function (request, response) {
    console.log('request: ', request.query)
    const { key, listingId, fileType } = request.query;
    console.log('hello save image')
    // console.log('KEEY: ', key);
    // console.log('Listing ID: ', insertId);
    db.connect( () => {
        console.log('Save Item')
        const query = "INSERT INTO `images` SET url='"+key+"',listing_id="+listingId+",imageType='"+fileType+"'";

        db.query(query, (err, data) => {
            if (!err) {
                let output = {
                    success: true,
                    data: data
                }
                response.send(output);
            } else {
                console.log('save image to database did not work');
            }
        })
    })
});

webserver.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

webserver.use(express.static(__dirname + '/client/dist'));
webserver.use(express.urlencoded({extended: false}));
webserver.use(express.json());
webserver.use(bodyParser.json())
webserver.use(cors());

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
    const {title, condition, ISBN, author, edition, price, comments, images, photoArray,files} = request.body;
    console.log("ADD LISTING IS RUNNING");
    console.log('REQUEST BODY', request.body);
    console.log('Photo Array: ', photoArray);

    // const output={
    //     success: true,
    //     data: response,
    // }
    // response.send(output);

    

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
   
    const userIDToken = request.headers['token'];
    db.connect(() => {
        const query = "SELECT b.ID FROM `books` AS b WHERE b.ISBN = '" + ISBN + "'";
        console.log(query)
        db.query(query, (err, data) => {
            if (!data.length) {
                const query = "INSERT INTO `books` SET title = '" + title + "', ISBN = '" + ISBN + "', author = '" + author + "', edition = " + edition + "";
                db.query(query, (err, data) => {
                    if(!err) {
                        console.log('INSERT INTO LISTINGS')
                        console.log('Listings Data: ', data)
                        const query = "INSERT INTO `listing` SET listing.book_id = "+data[0].ID+", price = '"+ price +"', book_condition = '"+condition+"', comments = '"+comments+"', accounts_id = '1', public_id='21'";
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
                console.log('INSERT INTO LISTINGS')
                console.log('Listings Data: ', data)
                const query = "INSERT INTO `listing` SET listing.book_id = "+data[0].ID+", price = '"+ price +"', book_condition = '"+condition+"', comments = '"+comments+"', accounts_id = '1', public_id='21'";
                db.query(query, async (err, data) => {
                        if(!err) {
                            console.log("all queries are good")
                            let output = {
                                success: true,
                                data: data,
                            };
                            response.send(output);
                        } else {
                            console.log("error", err);
                        }
                })                    
            }
        })

        //         if(!err) {
        //             let output = {
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


webserver.get('/api/BookInfoIndex/:bookId', (request, response) => {
    console.log("listing running");
    console.log("HEYYYYYOOO", request.body);
    console.log(request.params);

    db.connect(() => {
        const query = "SELECT l.ID, l.accounts_id, l.book_condition, l.price, l.comments, l.book_id, b.ID, b.title, b.author, b.edition, b.ISBN, a.email, a.ID FROM `listing` AS l JOIN `books` AS b ON l.book_id = b.ID JOIN `accounts` AS a ON a.ID = l.accounts_id WHERE l.`book_id` = " + request.params.bookId + "";
        db.query(query, (err, data) => {
            if (!err) {
                console.log("bookidData: ", data);
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

//profile listings
webserver.get('/api/UserProfile', (request, response) => {
    const userIDToken = request.headers['token'];
    db.connect(() => {
        const query = 'SELECT lg.account_id FROM `loggedin` AS lg WHERE lg.token = "' + userIDToken + '"';
        db.query(query, (err, data) => {
            if (!err) {
                if (data.length !== 1) {
                    const outputNoMatch = {
                        success: false,
                        message: "no match found for token given"
                    };
                    response.send(outputNoMatch);
                } else {
                    console.log("Data: ", data);
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
                }
            } else {
                console.log("query error getting account id from token: ", err);
            }

        })
    })
});

//delete user postings
webserver.delete("/api/UserProfile", (request, response) => {
    const userIDToken = request.headers['token'];
    const listingID = request.body.ID;
    db.connect(() => {
        const query = "SELECT lg.account_id FROM `loggedin` AS lg WHERE lg.token = '" + userIDToken + "'";
        db.query(query, (err, data) => {
            console.log("query valid deletePost");
            if (!err) {
                const query = "DELETE FROM `listing` WHERE accounts_id = '" + data[0].account_id + "' AND ID = '" + listingID + "'";
                console.log("delete query: ", query);
                db.query(query, (err, data) => {
                    console.log("DATA: ", data);
                    if (!err) {
                        const output = {
                            data: data
                        }
                        response.send(output);
                    } else {
                        console.log("error deleting post: ", err);
                    }
                })
            } else {
                console.log("Delete error:", err);
            }
        })
    })
});

//sign-in endpoint to grab the users id.
webserver.post('/api/SignIn', (request, response) => {
    debugger;
    const {Email, Password} = request.body;
    console.log("headers: ", typeof request.headers['token'], request.headers['token']);
    if(request.headers['token'] !== "undefined" && request.headers['token'] !== "null") {
        console.log("headers: ", typeof request.headers['token'], request.headers['token']);
        const outputAlreadySignedIn = {
            success: false,
            message: "You are already signed in"
        };
        response.send(outputAlreadySignedIn);
    } else {
        db.connect(() => {
            const getAccountQuery = "SELECT a.ID from `accounts` AS a WHERE a.email = '" + Email + "' AND a.password = '" + Password + "'";
            db.query(getAccountQuery, (err, data) => {
                if (!err) {
                    if (data.length === 1) {
                        var userToken = jwt.encode(Email + Password + Date.now(), hash);
                        if (!err) {
                            const query = "INSERT INTO `loggedin` SET loggedin.account_id = " + data[0].ID + ", loggedin.token = '" + userToken + "'";
                            db.query(query, (err) => {
                                if (!err) {
                                    let output = {
                                        success: true,
                                        data: userToken,
                                    };
                                    response.send(output);
                                } else {
                                    const outputErr = {
                                        success: false,
                                        message: `error inserting account to records: ${err}`
                                    }
                                    response.send(outputErr);
                                }
                            })
                        }
                    } else {
                        const outputNoAccount = {
                            success: false,
                            message: "no record of an account with specified credentials"
                        };
                        response.send(outputNoAccount)
                    }
                } else {
                    const outputErr = {
                        success: false,
                        message: `error with loggin: ${err}`
                    };
                    response.send(outputErr)
                }
            })
        })
    }
});

webserver.get('/api/SignOut', (request, response) => {
    const userIDToken = request.headers['token'];
    if(userIDToken === "undefined" || userIDToken === "null") {
        const outputNotSignedIn = {
            success: false,
            message: "You are already signed out"
        };
        response.send(outputNotSignedIn)
    } else {
        db.connect(() => {
            const getIdFromTokenQuery = "DELETE FROM `loggedin` WHERE token = '" + userIDToken + "'";
            console.log(getIdFromTokenQuery);
            db.query(getIdFromTokenQuery, (err) => {
                if(!err) {
                    const outputSuccess = {
                        success: false,
                        message: "You are now signed out",
                    };
                    response.send(outputSuccess);
                } else {
                    const output = {
                        success: false,
                        message: `error signing you out: ${err}`,
                    };
                    response.send(output);
                }
            })
        })
    }
});

// sign-up query.
// validate the user doesn't have the same email or password
// make a new table with the user info
// make a new column that has the verification token and the status of the user.
// send email to the user to verify the account.
// once verified, use the sign-in query to add them to the logged in table and give them an access token.
// redirect them to the landing page from the email.
webserver.post("/api/SignUp",(request,response)=>{
    const {Email, Password, Name} = request.body;
    db.connect(()=>{
        const {Name, EmailSignUp, PasswordSignUp} = request.body;
        const query = "SELECT a.ID from `accounts` AS a WHERE a.email = '" + EmailSignUp + "' AND a.password = '" + PasswordSignUp + "'";
        db.query(query, (err, data) => {
            if(!data.length) { //if there is no account with that email and password then continue else send back info already taken.
                const queryAddUser = 'INSERT INTO `accounts` SET name = "'+Name+'", password = "'+PasswordSignUp+'", email = "'+EmailSignUp+'", college_id = "3"'; //this query will add a user to the accounts table with the email and password, token and the
                db.query(queryAddUser, (err, data) => {
                    if(!err) {
                        let userToken = jwt.encode(Email + Password + Date.now(), hash);
                        const queryLoggedIn = "INSERT INTO `loggedin` SET loggedin.account_id = " + data.insertId + ", loggedin.token = '" + userToken + "'";
                        db.query(queryLoggedIn, (err, data) => {
                            if(!err) {
                                const outputSuccess = {
                                    success: true,
                                    data: userToken
                                }
                                response.send(outputSuccess);
                            } else {
                                const outputLoggedInFailed = {
                                    success: false,
                                    message: "couldn't login user"
                                }
                                response.send(outputLoggedInFailed)
                            }
                        })
                    } else {
                        const outputAddError = {
                            success: false,
                            message: "Couldn't add account"
                        };
                        response.send(outputAddError)
                    }
                })
            } else {
                response.send("Username or password has been denied");
            }
        })
    })
});

webserver.get('*', (request, response) => {
    response.sendFile(__dirname + '/client/dist/index.html');
});

webserver.listen(7000, () => {
    console.log("listening on port 7000");
});


