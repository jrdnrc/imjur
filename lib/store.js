const AWS = require('aws-sdk')
const { encode, decode } = require('./hash')

const config = {
    Bucket: '',
}

const s3 = new AWS.S3({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY_ID,
    }
})

const makePaginatedRequest = ({ NextContinuationToken, bucket }) =>
    s3.listObjectsV2({ Bucket: bucket, ContinuationToken: NextContinuationToken }).promise()

const countObjectsInBucket = async ({ bucket, token }) => {
    const response = await makePaginatedRequest({ bucket, ContinuationToken: token })
    let objects    = response.Contents.length

    if (response.isTruncated && response.isTruncated === true) {
        objects += await countObjectsInBucket({ bucket, token: response.NextContinuationToken })
    }

    return objects
}

const storeInS3 = async url => {
    const filename = encode(await countObjectsInBucket({ bucket: config.Bucket }))

    s3.upload({

    })
}

const multerS3StorageOptions = {
    s3,
    acl: 'public-read',
    bucket: config.Bucket,
    metadata: (req, file, cb) => {

    },
    key: async (req, file, cb) => {
        cb(`${encode(await countObjectsInBucket({ bucket: config.Bucket }))}.${req.params.ext}`)
    }
}

const getImageFromS3 = async encodedId => await S3.getObject({ Key: `${decode(encodedId)}.jpg`, ...config }).promise()

module.exports = { storeInS3, getImageFromS3, multerS3StorageOptions }
