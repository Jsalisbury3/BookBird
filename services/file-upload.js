const s3creds = require('../config/amzns3_creds');
const AWS = require('aws-sdk');
const multer = require('multer');
const multers3 = require('multer-s3');

AWS.config.update( s3creds );

const s3 = new AWS.S3();

const upload = multer({
    storage: multers3({
        s3: s3,
        bucket: 'book-bird-image-bucket-1',
        metadata: function ( req, file, cb ) {
            cb (null, {fieldName: file.fieldname});
        },
        key: function ( req, file, cb ) {
            cb (null, Date.now().toString())
        }
    })
})

module.exports = upload;