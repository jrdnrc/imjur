const { getImageFromS3 } = require('./../store')

const upload = (req, res) => {
    // send file to s3, cloudinary, local image store
    res.send('ok')
}

const viewImage = (req, res) => getImageFromS3(req.params.id).createReadStream().pipe(res)

module.exports = { upload, viewImage }
