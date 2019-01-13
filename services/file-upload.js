const amazon_creds = require('../config/amzns3_creds');
const AWS = require('aws-sdk');
const multer = require('multer');
const multers3 = require('multer-s3');

AWS.config.update( amazon_creds );

const s3 = new AWS.S3();

const awsUpload = multer({
    storage: multers3({
        s3: s3,
        bucket: 'book-bird-test-bucket',
        metadata: function ( req, file, cb ) {
            cb (null, {fieldName: file.fieldname});
        },
        key: function ( req, file, cb ) {
            cb (null, Date.now().toString())
        }
    })
})

module.exports = awsUpload;