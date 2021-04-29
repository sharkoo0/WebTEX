function sendReq(event) {
    const response = await fetch('http://localhost:3000/login', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        // redirect: 'follow',
        body: JSON.stringify(event.target.elements)
    });
    console.log("RESPONSE: " + response);
    return response.json();
};