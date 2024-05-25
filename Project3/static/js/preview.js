// this works
document.addEventListener('DOMContentLoaded', (e) => {
    //
    let fileText = document.querySelector("#fileText");
    fileText.value = "";
    //
    let sFirstName = document.querySelector("#sFirstBox");
    sFirstName.value = "";
    //
    let sLastName = document.querySelector("#sLastBox");
    sLastName.value = "";
    //
    let rFirstName = document.querySelector("#rFirstBox");
    rFirstName.value = "";
    //
    let rLastName = document.querySelector("#rLastBox");
    rLastName.value = "";
    //
    let messageBox = document.querySelector("#messageBox");
    messageBox.value = "";
    //
    let emailRadio = document.querySelector("#emailRadio");
    emailRadio.checked = false;
    //
    let smsRadio = document.querySelector("#smsRadio");
    smsRadio.checked = false;
    //
    let dnotRadio = document.querySelector("#dnotRadio");
    dnotRadio.checked = false;
    //
    let emailBox = document.querySelector("#emailBox");
    emailBox.value = "";
    //
    let pnumbBox = document.querySelector("#pnumbBox");
    pnumbBox.value = "";
    //
    let cardNumber = document.querySelector("#cardNumberBox");
    cardNumber.value = "";
    //
    let date = document.querySelector("#date");
    //
    let ccv = document.querySelector("#ccv");
    ccv.value = "";
    //
    let payment = document.querySelector("#amount");
    payment.value = "";
    //
    let termsBox = document.querySelector("#termsBox");
    termsBox.checked = false;
    //
    let sendBtn = document.querySelector("#sendbtnstyle");

    emailRadio.addEventListener('change', (e) => {
        emailRadio.checked = true;
        smsRadio.checked = false;
        dnotRadio.checked = false;
    });

    smsRadio.addEventListener('change', (e) => {
        smsRadio.checked = true;
        emailRadio.checked = false;
        dnotRadio.checked = false;
    });

    dnotRadio.addEventListener('change', (e) => {
        dnotRadio.checked = true;
        emailRadio.checked = false;
        smsRadio.checked = false;
    });
});

function previewImage(event) {
    let input = event.target;
    let image = document.querySelector("#preview");
    let textBox = document.querySelector("#fileText");
    let error_message = document.querySelector("#err1");

    if(input.files[0].type == "image/jpg" || input.files[0].type == "image/jpeg" || input.files[0].type == "image/png" ) {   
        error_message.innerHTML = "";
        if(input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                image.src = e.target.result;
            }

            textBox.value = input.files[0].name;

            reader.readAsDataURL(input.files[0]);
        }
    }
}