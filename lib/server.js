/* eslint-env node */
const express = require('express')
const next = require('next')
const multer = require('multer')
const multerS3 = require('multer-s3')
const { multerS3StorageOptions } = require('./store')
const path = require('path')
const controllers = require('./serve/controllers')

const UPLOAD_DIR = 'upload'

const upload = multer({
    storage: multerS3(multerS3StorageOptions)
})

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
    .prepare()
    .then(() => {
        const server = express();

        // custom handlers go here…
        server.post('/upload', upload.single('image'), controllers.upload)
        server.get('/i/:id\.:ext?', controllers.viewImage)

        // now boilerplate continues…
        // pass all other requests directly to next's handler
        server.get('*', (req, res) => handle(req, res));

        server.listen(port, err => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${port}`);
        });
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });
