async function sendReq(event) {
    event.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    const user = {
        email: username,
        password: password
    }
    const response = await fetch('http://localhost:3000/auth/login', {
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
    // console.log(json.files[0]);

  

    if(response.status === 200) {
        window.location.replace('../html/myFiles.html');
        window.localStorage.setItem("token", json.token);
        window.localStorage.setItem("username", username);
    } else {
        // console.log(response.statusText);
        errorMsg();
    }
    
};

function errorMsg() {
    var error_msg = document.getElementById('error-msg');
    var text = document.createTextNode("Invalid email or password ");
    error_msg.appendChild(text);
}