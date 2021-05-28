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
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        // redirect: 'follow',
        body: JSON.stringify(meggedObj)
    });

    // return response.json();

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

