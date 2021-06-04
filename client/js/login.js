async function sendReq(event) {
   let myForm = document.getElementById('myForm');
   let username = document.getElementById('username').value;
   let password =  document.getElementById('password').value;

    const formData = new FormData(myForm);
    formData.append('username',username);
    formData.append('password',password);

    var meggedObj = {};
    for (var pair of formData.entries()) {
        meggedObj[pair[0]]= pair[1];
      }
   
    const {data: response }= await fetch('http://localhost:3000/auth/login', {
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
    // console.log(JSON.stringify(meggedObj));
    // return response.json();
    location.href = 'myFiles.html';
};