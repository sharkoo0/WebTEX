async function sendReq(event) {
   // let myForm = document.getElementById('myForm');
    const formData = new FormData(document.querySelector('form'));
    var meggedObj = {};
    for (var pair of formData.entries()) {
        meggedObj[pair[0]]= pair[1];
      }
   
    const {data: response }= await fetch('http://localhost:3000/login', {
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
    console.log(JSON.stringify(meggedObj));
    // return response.json();
    location.href = 'myFiles.html';
};