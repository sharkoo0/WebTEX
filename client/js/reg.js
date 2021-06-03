async function sendReq(event) {
    console.log("asdhfjksdhfk")
    let myForm = document.getElementById('form-section1');
    let email = document.getElementById('email').value;
    let newPass = document.getElementById('password').value;
    let confNewPass = document.getElementById('confirm-password').value;
    let firstName = document.getElementById('first-name').value;
    let secondName = document.getElementById('second-name').value;

    const formData = new FormData(myForm);
    formData.append('email', email);
    formData.append('username', email);
    formData.append('firstName', firstName);
    formData.append('lastName', secondName);
    formData.append('password', newPass);
    formData.append('confPassword', confNewPass);

    var meggedObj = {};

    for (var pair of formData.entries()) {
        console.log(pair[0]);
        meggedObj[pair[0]] = pair[1];
    }

    // alert('here!');
    console.log(meggedObj);
    const {
        data: response
    } = await fetch('http://localhost:3000/auth/register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        body: JSON.stringify(meggedObj)
    });
    // console.log(response.json());
    // return response.json();
    location.href = 'myFiles.html';
}