import Header from './Header'
import Footer from './Footer'
import Dropzone from 'react-dropzone'
import axios from 'axios'

const accept = ''

const Layout = ({ children, ...props }) => <div id="root">
    <Dropzone
        disableClick
        style={{position: "relative"}}
        accept={accept}
        onDrop={Layout.onDrop}
        onDragEnter={event => Layout.onDragEnter({ event, ...props })}
        onDragLeave={event => Layout.onDragLeave({ event, ...props })}
    >
        <Header {...props} />
        <main>{children}</main>
        <Footer {...props} />
    </Dropzone>

    <style jsx>{`
            main {
                height: 600px;
                width: 600px;
                border: 5px solid black;
                border-radius: 5px;
            }
        `}
    </style>
</div>

Layout.onDrop = acceptedFiles => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    let fd = new FormData();

    fd.append('image', acceptedFiles.pop())

    axios.post(`upload`, fd, config)
        .then(console.log)
        .catch(console.error)
}

Layout.onDragEnter = ({ event, ...props }) => {
    console.log(event)
    console.log(props)
}

Layout.onDragLeave = ({ event, ...props }) => {

}

export default Layout
