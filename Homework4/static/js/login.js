import api from './APIClient.js';

const username = document.querySelector("#username");
const password = document.querySelector("#password");
const loginButton = document.querySelector("#loginButton");
//console.log("Here!");

loginButton.addEventListener('click', (e) => {
    //console.log("In Event Listener!");
    api.logIn(username.value, password.value).then(userData => {
        console.log(userData.user);
        document.location = "/";
    });
});