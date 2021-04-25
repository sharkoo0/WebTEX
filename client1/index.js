const button = document.getElementById('button');

button.addEventListener('click', async() => {
    const result = await getRequest();
    console.log(result);
});

async function getRequest() {
    const response = await fetch('http://localhost:3000/user', {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.json();
}