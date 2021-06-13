// import './myFiles.js';
// import { getFiles } from './myFiles.js';

// console.log(getFiles);

async function sendReq(event) {
    event.preventDefault();

    let email = document.getElementById('email').value;
    let newPass = document.getElementById('password').value;
    let firstName = document.getElementById('first-name').value;
    let secondName = document.getElementById('second-name').value;
    
    const user = {
        username: email,
        email: email,
        password: newPass,
        firstName: firstName,
        lastName: secondName
    }

    console.log(user);

    const response = await fetch('http://localhost:3000/auth/register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        body: JSON.stringify(user)
    });

    const json = await response.json();

    if(response.status === 200){
        window.location.replace("../html/myFiles.html");
        window.localStorage.setItem("token", json);
        window.localStorage.setItem("username", email);
        // getFiles('my');
    } else {
        errorMsg() 
    }
};

function errorMsg() {
    let error_msg = document.getElementById('error-msg');
    let text = document.createTextNode("Invalid credentials ");
    error_msg.appendChild(text);
}