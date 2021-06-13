export const search = async (fileName) => {
    const {data: response } = await fetch('http://localhost:3000/files/get', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        body: JSON.stringify(fileName)
    });
    console.log(JSON.stringify(fileName));
    location.href = 'myFiles.html';
};
