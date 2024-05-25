//
const express = require('express');
//
const multer = require('multer');
//
const upload = multer({dest: 'static/uploads/'});
//
// const hbs = require('hbs');
//
const app = express();
const PORT = 80;
const path = require('path');
const html_dir = path.join(__dirname + '/templates/');

// //
// app.set('views', html_dir);
// app.set('view engine', 'hbs');
app.use(express.static('static'));
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    console.log("We got form file!");
    res.sendFile(`${html_dir}form.html`);
});

app.post('/formdata', upload.single('myfile'), (req, res) => {
    // first names and last names should be check to make sure there are no numbers
    if( /\d/.test(req.body.sender_first)  || /\d/.test(req.body.sender_last) || /\d/.test(req.body.recipient_first) || /\d/.test(req.body.recipient_last)) {
        console.log("1");
        res.sendFile(`${html_dir}error.html`);
    }

    else if( req.body.sender_first.length < 1 || req.body.sender_last.length < 1 || req.body.recipient_first.length < 1 || req.body.recipient_last.length < 1 ) {
        console.log("2");
        res.sendFile(`${html_dir}error.html`);
    }

    else if( req.body.message.length < 10 ) {
        console.log("3");
        res.sendFile(`${html_dir}error.html`);
    }

    // names are valid
    else {
        // check that we have a valid picture
        if(req.body.file == "" || (!req.body.file.endsWith(".png") && !req.body.file.endsWith(".jpeg") && !req.body.file.endsWith(".jpg"))) {
            console.log("4");
            res.sendFile(`${html_dir}error.html`);
        }

        // picture is valid
        else {
            // next check if any radio buttons are checked
            if(req.body.email_radio_button != null && req.body.email_radio_button == "on" && (req.body.email == "" || (!req.body.email.match("[a-zA-Z0-9.]+@[a-z]+.com") && !req.body.email.match("[a-zA-Z0-9.]+@[a-z]+.edu")))) {
                console.log("5");
                res.sendFile(`${html_dir}error.html`);
            }

            // check if sms is checked
            else {
                if(req.body.sms_radio_button != null && req.body.sms_radio_button == "on" && ( req.body.pnumber == "" || ( !req.body.pnumber.match("[0-9]{3}-[0-9]{3}-[0-9]{4}") && !req.body.pnumber.match("[0-9]{10}") ) ) ) {
                    console.log("5");
                    res.sendFile(`${html_dir}error.html`);
                }

                else if(req.body.sms_radio_button != null && req.body.sms_radio_button == "on" && req.body.pnumber.match("[0-9]{3}-[0-9]{3}-[0-9]{4}") && req.body.pnumber.length > 12 ) {
                    console.log("6");
                    res.sendFile(`${html_dir}error.html`);
                }

                else if(req.body.sms_radio_button != null && req.body.sms_radio_button == "on" && req.body.pnumber.match("[0-9]{10}") && req.body.pnumber.length > 10 ) {
                    console.log("7");
                    res.sendFile(`${html_dir}error.html`);
                }

                // now check payment details
                else {
                    // first check the card number
                    if( req.body.cnumber == "" || (!req.body.cnumber.match("[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}") && !req.body.cnumber.match("[0-9]{16}"))) {
                        console.log("8");
                        res.sendFile(`${html_dir}error.html`);
                    }

                    else if( req.body.cnumber.match("[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}") && ( req.body.cnumber.length < 19 || req.body.cnumber.length > 19 )) {
                        console.log("9");
                        res.sendFile(`${html_dir}error.html`);
                    }

                    else if(req.body.cnumber.match("[0-9]{16}") && ( req.body.cnumber.length < 16 || req.body.cnumber.length > 16 )) {
                        console.log("10");
                        res.sendFile(`${html_dir}error.html`);
                    }

                    else {
                        // next check the date is valid
                        // create a current date for testing
                        let test_date = new Date();
                        let card_date;
                        if(req.body.date != ""){
                            card_date = new Date(req.body.date);
                            card_date.setHours(card_date.getHours() + card_date.getTimezoneOffset() / 60, card_date.getMinutes(), card_date.getSeconds());
                        }

                        if(req.body.date == "" || card_date < test_date) {
                            if( req.body.date == "") {
                                console.log("11");
                                res.sendFile(`${html_dir}error.html`);
                            }

                            else {
                                console.log("12");
                                res.sendFile(`${html_dir}error.html`);
                            }
                        }

                        else {
                            if( req.body.ccv == "" || !req.body.ccv.match("[0-9]") || ( req.body.ccv.match("[0-9]") && ( req.body.ccv.length < 3 || req.body.ccv.length > 4 ) ) ) {
                                if(req.body.ccv == "") {
                                    console.log("13");
                                    res.sendFile(`${html_dir}error.html`);
                                }

                                else {
                                    console.log("14");
                                    res.sendFile(`${html_dir}error.html`);
                                }
                            }

                            else {
                                if(isNaN(req.body.amount) || req.body.amount == "") {
                                    if(req.body.amount == "") {
                                        console.log("15");
                                        res.sendFile(`${html_dir}error.html`);
                                    }

                                    else {
                                        console.log("16");
                                        res.sendFile(`${html_dir}error.html`);
                                    }
                                }

                                // finally check if the terms button is checked
                                else {
                                    if(req.body.terms_box != null && req.body.terms_box != "on") {
                                        console.log("17");
                                        res.sendFile(`${html_dir}error.html`);
                                    }

                                    // otherwise our page should be valid
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
            console.log("18");
            res.sendFile(`${html_dir}error.html`);
        }

        // else this user is okay
        else {
            console.log("Pass 1");
            // construct object to send to success page
            res.sendFile(`${html_dir}success.html`);
        }
    }

    // if not payment is valid
    else {
        console.log("Pass 2");
        // construct object to send to success page
        res.sendFile(`${html_dir}success.html`);
    }
});


app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));