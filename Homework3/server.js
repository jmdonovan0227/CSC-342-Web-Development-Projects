//
const express = require('express');
//
const multer = require('multer');
//
const app = express();
const PORT = 3000;
//
app.use(express.static('static'));
app.use(express.urlencoded({extended: true}));
//
const upload = multer({dest: 'Homework3/static/uploads/'});
//
const html_path = __dirname + '/templates/';

app.get('/', (req, res) => {
    console.log("We got form file!");
    res.sendFile( html_path + 'form.html' );
});

app.post('/formdata', upload.single('myfile'), (req, res) => {
    console.log( "Working!" );
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));