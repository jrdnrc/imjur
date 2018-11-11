import Document, { Head, NextScript, Main } from 'next/document'

export default class ImjurDocument extends Document {
    render () {
        return (
            <html>
            <Head>
                <meta name="viewport" content="width=device-width" />
            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
            </html>
        )
    }
}
