const aws = require('aws-sdk')

aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: 'eu-west-1'
});

module.exports = new aws.S3()
