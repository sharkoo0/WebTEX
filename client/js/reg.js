// function sendReq(event) {
//     alert('here!');
//     console.log(event.target.elements);
//     const response = await fetch('http://localhost:3000/user', {
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         method: 'POST',
//         mode: 'cors',
//         cache: 'no-cache',
//         credentials: 'same-origin',
//         redirect: 'follow',
//         body: JSON.stringify(event.target.elements)
//     });
//     console.log(response.json());
//     return response.json();
// }