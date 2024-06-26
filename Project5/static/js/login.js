import api from './APIClient.js';

const username = document.querySelector("#username");
const password = document.querySelector("#password");
const loginButton = document.querySelector("#loginButton");

loginButton.addEventListener('click', (e) => {
    console.log(username.value);
    console.log(password.value);
    api.logIn(username.value, password.value).then(userData => {
        console.log("valid");
        document.location = "main";
    }).catch(err => {
        console.log("invalid");
    });
});