//
const express = require('express');
//
const multer = require('multer');
//
const upload = multer({dest: './static/uploads'});
//
// const hbs = require('hbs');
//
const app = express();
const PORT = 80;
const path = require('path');
const html_dir = path.join(__dirname, './templates/');

// //
// app.set('views', html_dir);
// app.set('view engine', 'hbs');
app.use(express.static('static'));
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    console.log("We got form file!");
    res.sendFile(`${html_dir}form.html`);
});

app.get('/success', (req, res) => {
    console.log("We got success file!");
    res.sendFile(`${html_dir}success.html`);
    // res.render('success');
});

app.get('/error', (req, res) => {
    console.log("We got error file!");
    res.sendFile(`${html_dir}error.html`);
});

app.post('/formdata', upload.single('myfile'), (req, res) => {
    /** BASIC VALIDATION FOR ALL FIELDS */
    if( /\d/.test(req.body.sender_first)  || /\d/.test(req.body.sender_last) || /\d/.test(req.body.recipient_first) || /\d/.test(req.body.recipient_last)) {
        res.sendFile(html_dir + 'error.html');
    }

    else if( req.body.sender_first.length < 1 || req.body.sender_last.length < 1 || req.body.recipient_first.length < 1 || req.body.recipient_last.length < 1 ) {
        res.sendFile(html_dir + 'error.html');
    }

    else if( req.body.message.length < 10 ) {
        res.sendFile(html_dir + 'error.html');
    }

    // names are valid
    else {
        console.log(req.body.file);
        // check that we have a valid picture
        if(!req.body.file.match("[a-zA-Z0-9.-_].png") && !req.body.file.match("[a-zA-Z0-9.-_].jpeg") && !req.body.file.match("[a-zA-Z0-9.-_].jpg")) {
            //
            res.sendFile(html_dir + 'error.html');
        }

        // picture is valid
        else {
            // next check if any radio buttons are checked
            if(( req.body.email != "" && !req.body.email.match("[a-zA-Z0-9.]+@[a-z]+.com"))) {
                res.sendFile(html_dir + 'error.html');
            }

            // check if sms is checked
            else {
                if(( req.body.pnumber != "" && ( !req.body.pnumber.match("[0-9]{3}-[0-9]{3}-[0-9]{4}") && !req.body.pnumber.match("[0-9]{10}") ) ) ) {
                    res.sendFile(html_dir + 'error.html');
                }

                else if(req.body.pnumber.match("[0-9]{3}-[0-9]{3}-[0-9]{4}") && req.body.pnumber.length > 12 ) {
                    res.sendFile(html_dir + 'error.html');
                }

                else if(req.body.pnumber.match("[0-9]{10}") && req.body.pnumber.length > 10 ) {
                    res.sendFile(html_dir + 'error.html');
                }

                // now check payment details
                else {
                    // first check the card number
                    if( !req.body.cnumber.match("[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}") && !req.body.cnumber.match("[0-9]{16}")) {
                        res.sendFile(html_dir + 'error.html');
                    }

                    else if( req.body.cnumber.match("[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}") && ( req.body.cnumber.length < 19 || req.body.cnumber.length > 19 )) {
                        res.sendFile(html_dir + 'error.html');
                    }

                    else if(req.body.cnumber.match("[0-9]{16}") && ( req.body.cnumber.length < 16 || req.body.cnumber.length > 16 )) {
                        res.sendFile(html_dir + 'error.html');
                    }

                    else {
                        // next check the date is valid
                        // create a current date for testing
                        let test_date = new Date();

                        if(req.body.date == "" || new Date(req.body.date).toISOString() < test_date.toISOString()) {
                            if( req.body.date == "") {
                                res.sendFile(html_dir + 'error.html');
                            }

                            else {
                                res.sendFile(html_dir + 'error.html');
                            }
                        }

                        else {
                            if( !req.body.ccv.match("[0-9]") || ( req.body.ccv.match("[0-9]") && ( req.body.ccv.length < 3 || req.body.ccv.length > 4 ) ) ) {
                                if(req.body.ccv == "") {
                                    res.sendFile(html_dir + 'error.html');
                                }

                                else {
                                    res.sendFile(html_dir + 'error.html');
                                }
                            }

                            else {
                                if(isNaN(req.body.amount)) {
                                    if(req.body.amount == "") {
                                        res.sendFile(html_dir + 'error.html');
                                    }

                                    else {
                                        res.sendFile(html_dir + 'error.html');
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    /** CHECK FOR FRADULENT USER AND CREATE ELEMENTS AND SEND TO ERROR OR CONFIRMATION PAGE */

    // first check if their first name is the same as the fradulent user
    if(req.body.recipient_first == "Stu" || req.body.recipient_first == "stu" || req.body.recipient_first == "Stuart" || req.body.recipient_first == "stuart" ) {
        // now check last name
        if(req.body.recipient_last == "Dent" || req.body.recipient_last == "dent" ) {
            // we detected the fradulent user, construct object we want to send with handlebar and send to error page
            res.sendFile(html_dir + 'error.html');
        }

        // else this user is okay
        else {
            // construct object to send to success page
            res.sendFile(html_dir + 'success.html');
        }
    }

    // if not payment is valid
    else {
        // construct object to send to success page
        res.sendFile(html_dir + 'success.html');
    }
});


app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));