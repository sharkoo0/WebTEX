async function sendReq(event) {
    let myForm = document.getElementById('user-details');
    let profilePhoto =  document.getElementById('file-upload').value;
    let newPass =  document.getElementById('pass').value;
    let confNewPass =  document.getElementById('conf-pass').value;
    
    const formData = new FormData(myForm);
    formData.append('photo',profilePhoto);
    formData.append('newPassword',newPass);
    formData.append('confNewPassword',confNewPass);

    
    var meggedObj = {};

    for (var pair of formData.entries()) {
        console.log(pair[1]);
        meggedObj[pair[0]] = pair[1];
    }

    const {
        data: response
    } = await fetch('http://localhost:3000/save', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        // redirect: 'follow',
        body: JSON.stringify(meggedObj)
    });

    // return response.json();

};