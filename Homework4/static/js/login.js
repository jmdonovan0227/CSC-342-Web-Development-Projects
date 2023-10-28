import api from './APIClient.js';

const username = document.querySelector("#username");
const loginButton = document.querySelector("#loginButton");
const testButton = document.querySelector("#testBtn");
console.log(testButton);

loginButton.addEventListener('click', (e) => {
    api.logIn(username.value).then(userData => {
        document.location = "/main";
    });
});