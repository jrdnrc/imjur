import { S3 } from 'aws-sdk'
import { encode } from './hash'

const config = {
    Bucket: '',
}

const makePaginatedRequest = ({ NextContinuationToken, bucket }) =>
    S3.listObjectsV2({ Bucket: bucket, ContinuationToken: NextContinuationToken }).promise()

const countObjectsInBucket = async ({ bucket, token }) => {
    const response = await makePaginatedRequest({ bucket, ContinuationToken: token })
    let objects    = response.Contents.length

    if (response.isTruncated && response.isTruncated === true) {
        objects += await countObjectsInBucket({ bucket, token: response.NextContinuationToken })
    }

    return objects
}

export const storeInS3 = async url => {
    const filename = encode(await countObjectsInBucket({ bucket: config.Bucket }))

    S3.upload({

    })
}
