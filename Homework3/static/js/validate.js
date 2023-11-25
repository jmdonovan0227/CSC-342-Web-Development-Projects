document.addEventListener('DOMContentLoaded', (e) => {
    const s_first = document.querySelector("#sFirstBox");
    const s_last = document.querySelector("#sLastBox");
    const file = document.querySelector("#fileText");
    const r_first = document.querySelector("#rFirstBox");
    const r_last = document.querySelector("#rLastBox");
    const message = document.querySelector("#messageBox");
    const e_radio = document.querySelector("#emailRadio");
    const s_radio = document.querySelector("#smsRadio");
    const d_radio = document.querySelector("#dnotRadio");
    const email = document.querySelector("#emailBox");
    const p_number = document.querySelector("#pnumbBox");
    const c_number = document.querySelector("#cardNumberBox");
    const date = document.querySelector("#date");
    const ccv = document.querySelector("#ccv");
    const amount = document.querySelector("#amount");
    const terms_box = document.querySelector("#termsBox");
    const send_btn = document.querySelector("#sendbtnstyle");

    // check when we try to submit the form
    send_btn.addEventListener('click', (e) => {
        // first names and last names should be check to make sure there are no numbers
        if( /\d/.test(s_first.value)  || /\d/.test(s_last.value) || /\d/.test(r_first.value) || /\d/.test(r_last.value)) {
            e.preventDefault();
            alert("Please only use letters for names");
        }

        else if( s_first.value.length < 1 || s_last.value.length < 1 || r_first.value.length < 1 || r_last.value.length < 1 ) {
            e.preventDefault();
            alert("Please enter first and last names for sender and recipient");
        }

        else if( message.value.length < 10 ) {
            e.preventDefault();
            alert("Please enter a message with length of at least 10");
        }

        // names are valid
        else {
            // check that we have a valid picture
            if(file.value == "" || (!file.value.endsWith(".png") && !file.value.endsWith(".jpeg") && !file.value.endsWith(".jpg"))) {
                // other code will return an empty string if the file type is not valid
                e.preventDefault();
                //
                alert("Please user a valid picture which can be a PNG, JPEG, or JPG");
            }

            // picture is valid
            else {
                // next check if any radio buttons are checked
                if(e_radio.checked && (email.value == "" || (!email.value.match("[a-zA-Z0-9.]+@[a-z]+.com") && !email.value.match("[a-zA-Z0-9.]+@[a-z]+.edu")))) {
                    e.preventDefault();
                    alert("Please provide a valid email address");
                }

                // check if sms is checked
                else {
                    if(s_radio.checked && ( p_number.value == "" || ( !p_number.value.match("[0-9]{3}-[0-9]{3}-[0-9]{4}") && !p_number.value.match("[0-9]{10}") ) ) ) {
                        e.preventDefault();
                        alert("Please enter a valid phone number");
                    }

                    else if(s_radio.checked && p_number.value.match("[0-9]{3}-[0-9]{3}-[0-9]{4}") && p_number.value.length > 12 ) {
                        e.preventDefault();
                        alert("Please enter a phone number with 10 digits");
                    }

                    else if(s_radio.checked && p_number.value.match("[0-9]{10}") && p_number.value.length > 10 ) {
                        e.preventDefault();
                        alert("Please enter a phone number with 10 digits");
                    }

                    // now check payment details
                    else {
                        // first check the card number
                        if( c_number.value == "" || (!c_number.value.match("[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}") && !c_number.value.match("[0-9]{16}"))) {
                            e.preventDefault();
                            alert("Please enter a valid card number");
                        }

                        else if( c_number.value.match("[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}") && ( c_number.value.length < 19 || c_number.value.length > 19 )) {
                            e.preventDefault();
                            alert("Please enter a card number with 16 numbers");
                        }

                        else if(c_number.value.match("[0-9]{16}") && ( c_number.value.length < 16 || c_number.value.length > 16 )) {
                            e.preventDefault();
                            alert("Please enter a card number with 16 numbers");
                        }

                        else {
                            // next check the date is valid
                            // create a current date for testing
                            let test_date = new Date();
                            if(date.value != ""){
                                card_date = new Date(date.value);
                                card_date.setHours(card_date.getHours() + card_date.getTimezoneOffset() / 60, card_date.getMinutes(), card_date.getSeconds());
                            }

                            if(date.value == "" || card_date < test_date) {
                                if( date.value == "") {
                                    e.preventDefault();
                                    alert("Please enter a date!");
                                }

                                else {
                                    e.preventDefault();
                                    alert("Please use a credit card that is not expired!");
                                }
                            }

                            else {
                                if( ccv.value == "" || !ccv.value.match("[0-9]") || ( ccv.value.match("[0-9]") && ( ccv.value.length < 3 || ccv.value.length > 4 ) ) ) {
                                    if(ccv.value == "") {
                                        e.preventDefault();
                                        alert("Please enter ccv code");
                                    }

                                    else {
                                        e.preventDefault();
                                        alert("Please enter a ccv code with 3 or 4 numbers");
                                    }
                                }

                                else {
                                    if(isNaN(amount.value) || amount.value == "") {
                                        if(amount.value == "") {
                                            e.preventDefault();
                                            alert("Please enter payment...");
                                        }

                                        else {
                                            e.preventDefault();
                                            alert("Please enter valid payment");
                                        }
                                    }

                                    // finally check if the terms button is checked
                                    else {
                                        if(!terms_box.checked) {
                                            e.preventDefault();
                                            alert("Please agree to terms...");
                                        }

                                        // otherwise our page should be valid
                                    }
                                }
                            }

                            // if valid check ccv has 3 or 4 numbers

                            // if valid check the payment is a number and check if it contains a period and matches the format for a valid float
                            // if true then we have valid payment and we should allow the backend to do final checks before submitting
                        }
                    }
                }
            }
        }
    });
});