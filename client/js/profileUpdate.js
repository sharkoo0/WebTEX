async function sendReq(event) {
    let myForm = document.getElementById('user-details');
    let profilePhoto =  document.getElementById('file-upload').value;
    let newPass =  document.getElementById('pass').value;
    let confNewPass =  document.getElementById('conf-pass').value;
    let email = document.getElementById('email').value;

    const formData = new FormData(myForm);
    formData.append('photoPath',profilePhoto);
    formData.append('password',newPass);
    formData.append('confPassword',confNewPass);
    formData.append('username',email)
    
    const user = {
        photoPath: profilePhoto,
        password: newPass,
        confPassword: confNewPass,
        username: email,
        altEmail: email
    }

    const response = await fetch('http://localhost:3000/save/put', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        },
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        body: JSON.stringify(user)
    });

    console.log(response)

};


const fileselector = document.getElementById('file-upload');
fileselector.addEventListener('change',(event)=>{
    const output = document.getElementById('output');
    output.src = '';
    const file = event.target.files[0];
    if(file.type && !file.type.startsWith('image/')){
        console.log('File is not an image.', file.type,file);
        return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', (event)=> {
        output.src = event.target.result;
    });
    reader.readAsDataURL(file);
});

