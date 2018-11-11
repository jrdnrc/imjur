const upload = (req, res) => {
    const { file } = req

    storeInS3(file).then()

    // send file to s3, cloudinary, local image store

    res.send('ok')
}

const viewImage = (req, res) => {
    res.send(JSON.stringify(req.params))
}

module.exports = { upload, viewImage }
