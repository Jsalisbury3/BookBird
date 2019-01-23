const {accessKeyId, secretAccessKey, region} = require('./config/amzns3_creds');
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
// const escape_quotes = require('escape-quotes');
const passwordHash = require('sha256');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const accountSid = require('./config/twilio.sdi');
const authToken = require('./config/twilio_token');
const twilio = require('twilio')(accountSid, authToken);

AWS.config.update({
    accessKeyId,
    secretAccessKey,
    region
});

const s3 = new AWS.S3({
    signatureVersion: 'v4'
});

const awsUpload = require('./services/file-upload');
webserver.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

webserver.use(express.static(__dirname + '/client/dist'));
webserver.use(express.urlencoded({extended: false}));
webserver.use(express.json());
webserver.use(bodyParser.json())
webserver.use(cors());

webserver.get('/api/prepUpload', function (request, response) {

    const {query: {fileType}} = request;
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

webserver.post('/api/photo', function (req, res) {
    let storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './uploads');
        },
        filename: function (req, file, callback) {
            callback(null, file.fieldname + '-' + Date.now());
        }
    });

    let fsUpload = multer({storage: storage}).array('userPhoto', 2);

    var response = fsUpload(req, res, function (err) {
        console.log('Request: ', req);

        if (err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded",);
    });
});


webserver.post('/api/file-upload', function (req, res) {
    // const awsUpload = require('./services/file-upload');
    console.log('File UPload Req');
    awsUpload(req, res, function (err) {
        return res.json({'imageUrl: ': req.file});
    })

});

webserver.post('/api/save-image', function (request, response) {
    console.log('request: ', request.query)
    const {key, listingId, fileType} = request.query;
    console.log('hello save image')

    db.connect(() => {
        console.log('Save Item');

        const query = "INSERT INTO `images` SET url='" + key + "',listing_id=" + listingId + ",imageType='" + fileType + "'";
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

webserver.post('/api/save-profile-image', function (request, response) {
    console.log('request: ', request.body);
    const {key, fileType} = request.body;
    console.log('headers', request.headers)

    const userToken = request.headers['token'];


    // const {account_id}=request.headers.data;
    console.log('hello save image');

    db.connect(() => {
        console.log('Save Item');
        const query = "SELECT lg.account_id FROM `loggedin` AS lg WHERE lg.token = '" + userToken + "'";

        db.query(query, (err, data) => {
            console.log('DATA: ', data)
            const query = "UPDATE `accounts` SET profile_photo_url='" + key + "', image_type='" + fileType + "' WHERE accounts.id='" + data[0].account_id + "'";
            console.log('query', query);
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
});


webserver.post('/api/contactSeller', (request, response) => {
    db.connect(() => {
        const userToken = request.headers['token'];
        if (userToken === "undefined" || userToken === "null") {
            const outputAlreadySignedIn = {
                success: false,
                message: "You must be signed in to contact seller"
            };
            response.send(outputAlreadySignedIn);
        } else {
            const query = "SELECT a.phoneNumber FROM `accounts` AS a JOIN `loggedin` AS lg ON a.ID = lg.account_id WHERE lg.token = '" + userToken + "'";
            console.log(query);
            db.query(query, (err, data) => {
                if (data) {
                    const SellerNumber = request.body.sellersNumber;
                    const sourceNumber = 5108226645; //this will change
                    const buyerNumber = data[0].phoneNumber;
                    console.log("buyerNumber: ", buyerNumber);
                    twilio.messages.create({
                        body: 'Someone is interested in buying your book BOOKNAME. respond to this message to contact possible buyer',
                        to: '+19499226065',
                        from: '+15108226645'
                    });
                    let infoToHash = buyerNumber + SellerNumber;
                    let convoHash = jwt.encode(infoToHash, hash);
                    const insertSourceTableQuery = "INSERT INTO `source_num` SET twilio_number = '" + sourceNumber + "'";
                    console.log(insertSourceTableQuery);
                    db.query(insertSourceTableQuery, (err, data) => {
                        if (!err) {
                            console.log("DATA FROM INSERT QUERY WANT THISSSS: ", data);
                            const storeConvoDataQuery = "INSERT INTO `convos` SET hash = '" + convoHash + "', buyer_number = '" + buyerNumber + "', seller_number = '" + SellerNumber + "', source_num_id = '" + data.insertId + "'";
                            console.log("FINAL QUERY MEMEMEMEME: ", storeConvoDataQuery);
                            db.query(storeConvoDataQuery, (err, data) => {
                                if (!err) {
                                    const successOutput = {
                                        success: true,
                                        message: "Seller contacted"
                                    };
                                    response.send(successOutput);
                                } else {
                                    const failedStoringDetails = {
                                        success: false,
                                        message: "failed to make store contact information"
                                    };
                                    response.send(failedStoringDetails);
                                }
                            })
                        } else {
                            const failedStoringDetails = {
                                success: false,
                                message: "failed to make store contact information"
                            };
                            response.send(failedStoringDetails);
                        }
                    })
                } else {
                    const failedToContactSeller = {
                        success: false,
                        message: "Unable to contact seller"
                    };
                    response.send(failedToContactSeller);
                }
            })
        }
    })
});

webserver.post('/api/MessageResponse', (request, response) => {
    db.connect(() => {
        console.log("MessageResponse RAN :D");
    })
});


webserver.get('/api/listings', (request, response) => {
    console.log("IM RUUUUUNNNIIINNNNGGGG");
    db.connect(() => {
        const query = "SELECT l.ID, l.book_condition, l.price, l.comments, l.book_id, b.title, b.ISBN, b.author, b.bookImage FROM `listing` AS l JOIN `books` AS b ON l.book_id = b.id";
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
    const {title, condition, ISBN, author, price, comments, bookImage} = request.body;
    console.log("ADD LISTING IS RUNNING");
    const userIDToken = request.headers['token'];
    console.log("TOKEN: ", userIDToken);
    db.connect(() => {
        const query = "SELECT lg.account_id FROM `loggedin` AS lg WHERE lg.token = '" + userIDToken + "'";
        db.query(query, (err, data) => {
            if (!err) {
                console.log("user id data wanttttt:", data[0].account_id)
                const userId = data[0].account_id;
                const query = "SELECT b.ID FROM `books` AS b WHERE b.ISBN = '" + ISBN + "'";
                console.log(query);
                db.query(query, (err, data) => {
                    if (!data.length) {
                        const query = "INSERT INTO `books` SET title = '" + title + "', ISBN = '" + ISBN + "', author = '" + author + "', bookImage = '" + bookImage + "'";
                        console.log(query)
                        db.query(query, (err, data) => {
                            if (!err) {
                                console.log('INSERT INTO LISTINGS');
                                console.log('Listings Data: ', data);
                                const query = "INSERT INTO `listing` SET listing.book_id = " + data.insertId + ", price = '" + price + "', book_condition = '" + condition + "', comments = '" + comments + "', accounts_id = '" + userId + "', public_id='21'";
                                // escape_quotes(query);
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
                        console.log('INSERT INTO LISTINGS');
                        console.log('Listings Data: ', data);
                        const query = "INSERT INTO `listing` SET listing.book_id = " + data[0].ID + ", price = '" + price + "', book_condition = '" + condition + "', comments = '" + comments + "', accounts_id = '" + userId + "', public_id='21'";
                        db.query(query, async (err, data) => {
                            if (!err) {
                                console.log("all queries are good");
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
            } else {
                const lookResponse = {
                    success: false,
                    message: "couldnt find account with given token"
                }
                response.send(lookResponse);
            }
        })
    });
});

webserver.post('/api/filter', (request, response) => {
    const {ISBN} = request.body;
    db.connect(() => {
        let query = "SELECT b.bookImage, b.title, b.ISBN, b.author, l.price, l.book_condition FROM `books` AS b JOIN `listing` AS l ON l.book_id = b.ID WHERE b.title LIKE '%" + ISBN + "%' OR b.ISBN LIKE '%" + ISBN + "%' OR b.author LIKE '%" + ISBN + "%' ";
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
});


webserver.get('/api/BookInfoIndex/:ID', (request, response) => {
    console.log("listing running");
    console.log("HEYYYYYOOO", request.body);
    console.log(request.params);
    db.connect(() => {
        // const query = "SELECT l.ID, l.accounts_id, l.book_condition, l.price, l.comments, l.book_id, b.ID, b.title, b.author, b.ISBN, a.email, a.ID FROM `listing` AS l JOIN `books` AS b ON l.book_id = b.ID JOIN `accounts` AS a ON a.ID = l.accounts_id WHERE l.`book_id` = " + request.params.bookId + "";
        let query = "SELECT i.ID, i.url, i.listing_id, i.imageType FROM images AS i WHERE i.listing_id = " + request.params.ID + "";
        db.query(query, (err, data) => {
            if (data) {
                const images = data;
                let query = "SELECT l.ID AS listingID, l.accounts_id, l.book_condition, l.price, l.comments, l.book_id, b.ID AS bookID, b.title, b.author, b.ISBN, b.bookImage, a.email, a.phoneNumber, a.ID FROM `listing` AS l JOIN `books` AS b ON l.book_id = b.ID JOIN `accounts` AS a ON a.ID = l.accounts_id WHERE l.ID = " + request.params.ID + ""
                // query = escape_quotes(query);
                console.log(query);
                db.query(query, (err, data) => {
                    if (!err) {
                        console.log("bookidData: ", data);
                        let output = {
                            success: true,
                            data: data,
                            images,
                        };
                        response.send(output);
                    } else {
                        console.log(err);
                    }
                })
            } else {
                console.log('No images for that listing');
                let query = "SELECT l.ID AS listingID, l.accounts_id, l.book_condition, l.price, l.comments, l.book_id, b.ID AS bookID, b.title, b.author, b.ISBN, b.bookImage, a.email, a.phoneNumber, a.ID FROM `listing` AS l JOIN `books` AS b ON l.book_id = b.ID JOIN `accounts` AS a ON a.ID = l.accounts_id WHERE l.ID = " + request.params.ID + ""
                // query = escape_quotes(query);
                console.log(query);
                db.query(query, (err, data) => {
                    if (!err) {
                        console.log("bookidData: ", data);
                        let output = {
                            success: true,
                            data: data,
                            images: []
                        };
                        response.send(output);
                    } else {
                        console.log(err);
                    }
                })
            }
        })
    })
});

//profile listings
webserver.get('/api/UserProfile', (request, response) => {
    const userIDToken = request.headers['token'];
    db.connect(() => {
        let query = 'SELECT lg.account_id FROM `loggedin` AS lg WHERE lg.token = "' + userIDToken + '"';
        db.query(query, (err, data) => {
            console.log("lg accounts: ", data);
            if (!err) {
                if (data.length !== 1) {
                    const outputNoMatch = {
                        success: false,
                        message: "no match found for token given"
                    };
                    response.send(outputNoMatch);
                } else {
                    console.log("data[0].account_id: ", data[0].account_id);
                    let query = "SELECT a.profile_photo_url, a.image_type, b.bookImage, a.ID, l.book_condition, l.ID, l.price, l.comments, l.book_id, b.title, b.ISBN, b.author FROM `listing` AS l JOIN `books` AS b ON l.book_id = b.ID JOIN `accounts` AS a ON a.ID = l.accounts_id  WHERE a.ID = '" + data[0].account_id + "'";
                    db.query(query, (err, data) => {
                        if (!err && data.length > 0) {
                            const output = {
                                success: true,
                                data: data,
                            };
                            response.send(output);
                        } else {
                            const output = {
                                message: "no listings found, create a post!",
                                data: data,
                            };
                            response.send(output);
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
        let query = "SELECT lg.account_id FROM `loggedin` AS lg WHERE lg.token = '" + userIDToken + "'";
        // query = escape_quotes(query);
        db.query(query, (err, data) => {
            console.log("query valid deletePost");
            if (!err) {
                let query = "DELETE FROM `listing` WHERE accounts_id = '" + data[0].account_id + "' AND ID = '" + listingID + "'";
                // query = escape_quotes(query);
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
    let {Email, Password} = request.body;
    Password = passwordHash(Password);
    console.log("headers: ", typeof request.headers['token'], request.headers['token']);
    if (request.headers['token'] !== "undefined" && request.headers['token'] !== "null") {
        const outputAlreadySignedIn = {
            success: false,
            message: "You are already signed in"
        };
        response.send(outputAlreadySignedIn);
    } else {
        db.connect(() => {
            let getAccountQuery = "SELECT a.ID from `accounts` AS a WHERE a.email = '" + Email + "' AND a.password = '" + Password + "'";
            // getAccountQuery = escape_quotes(getAccountQuery);
            console.log("query we want: ", getAccountQuery)
            db.query(getAccountQuery, (err, data) => {
                if (!err) {
                    if (data.length === 1) {
                        var userToken = jwt.encode(Email + Password + Date.now(), hash);
                        if (!err) {
                            let query = "INSERT INTO `loggedin` SET loggedin.account_id = " + data[0].ID + ", loggedin.token = '" + userToken + "'";
                            // query = escape_quotes(query);
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
    if (userIDToken === "undefined" || userIDToken === "null") {
        const outputNotSignedIn = {
            success: false,
            message: "You are already signed out"
        };
        response.send(outputNotSignedIn)
    } else {
        db.connect(() => {
            let getIdFromTokenQuery = "DELETE FROM `loggedin` WHERE token = '" + userIDToken + "'";
            // getIdFromTokenQuery = escape_quotes(getIdFromTokenQuery);
            console.log(getIdFromTokenQuery);
            db.query(getIdFromTokenQuery, (err) => {
                if (!err) {
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
webserver.post("/api/SignUp", (request, response) => {
    let {Email, Password, Name} = request.body;
    db.connect(() => {
        console.log("REQUEST BODY HEREEEEEE: ", request.body);
        let {Name, EmailSignUp, PasswordSignUp, Number} = request.body;
        PasswordSignUp = passwordHash(PasswordSignUp);
        let query = "SELECT a.ID from `accounts` AS a WHERE a.email = '" + EmailSignUp + "' AND a.password = '" + PasswordSignUp + "'";
        // query = escape_quotes(query);
        db.query(query, (err, data) => {
            console.log("DATA FOR BAD CONDITIONAL: ", data);
            if (!data || data.length === 0) { //if there is no account with that email and password then continue else send back info already taken.
                const queryAddUser = 'INSERT INTO `accounts` SET phoneNumber = "' + Number + '", name = "' + Name + '", password = "' + PasswordSignUp + '", email = "' + EmailSignUp + '", college_id = "3"'; //this query will add a user to the accounts table with the email and password, token and the
                console.log(queryAddUser);
                db.query(queryAddUser, (err, data) => {
                    console.log(err)
                    if (!err) {
                        console.log('further');
                        let userToken = jwt.encode(EmailSignUp + PasswordSignUp + Date.now(), hash);
                        let queryLoggedIn = "INSERT INTO `loggedin` SET loggedin.account_id = " + data.insertId + ", loggedin.token = '" + userToken + "'";
                        // queryLoggedIn = escape_quotes(queryLoggedIn)
                        db.query(queryLoggedIn, (err, data) => {
                            console.log(err)
                            if (!err) {
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

webserver.get('/api/UserProfileUrl', (request, response) => {
    const userIDToken = request.headers['token'];
    console.log("TOKEN: ", userIDToken)
    db.connect(() => {
        let query = "SELECT lg.account_id FROM `loggedin` AS lg WHERE lg.token = '" + userIDToken + "'";
        db.query(query, (err, data) => {
            console.log("DTAAAAAAA: ", data);
            if (!err) {
                const urlQuery = "SELECT a.profile_photo_url, a.image_type FROM `accounts` AS a WHERE a.ID = '" + data[0].account_id + "'";
                console.log("QUERY: ", urlQuery);
                db.query(urlQuery, (err, data) => {
                    if (!err) {
                        const output = {
                            success: true,
                            data: data
                        };
                        response.send(output);
                    }else {
                        const output = {
                            success: false,
                            message: "error getting account profile pic url"
                        };
                        response.send(output);
                    }
                })
            } else {
                const output = {
                    success: false,
                    message: "error getting account id from token"
                };
                response.send(output);
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


