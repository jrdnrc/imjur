/* eslint-env node */
import express from 'express'
import next from 'next'
import multer from 'multer'
import path from 'path'
import { storeInS3 } from './store'

const UPLOAD_DIR = 'upload'

const upload = multer({ dest: path.resolve(__dirname, UPLOAD_DIR) })

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
    .prepare()
    .then(() => {
        const server = express();

        // custom handlers go here…
        server.post('/upload', upload.single('image'), (req, res) => {
            const { file } = req

            storeInS3(file).then()

            // send file to s3, cloudinary, local image store

            res.send('ok')
        })

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
