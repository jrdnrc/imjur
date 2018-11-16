const s3 = require('./s3')
const hash = require('./hash')

const config = {
    Bucket: process.env.AWS_S3_BUCKET,
}

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

const multerS3StorageOptions = {
    s3,
    acl: 'public-read',
    bucket: config.Bucket,
    key: async (req, file, cb) => {
        const ext = file.originalname.split('.').pop()

        cb(null, `${hash.encode(await countObjectsInBucket({ bucket: config.Bucket }))}.${ext}`)
    }
}

const getImageFromS3 = encodedId => s3.getObject({ Key: `${encodedId}.png`, ...config })

module.exports = { getImageFromS3, multerS3StorageOptions }
