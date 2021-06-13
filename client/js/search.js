import {viewFileTable} from './myFiles.js'

const searchBox = document.getElementById('searchID');

searchBox.addEventListener("keyup", function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Cancel the default action of the enter key, if needed
    search(searchBox.value);
  }
});

async function search(filename) {
    const token = window.localStorage.getItem("token");
    const username = window.localStorage.getItem("username");

    const data = {
        user: username,
        filename: filename
    }

    const {data: response } = await fetch('http://localhost:3000/files/search', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        body: JSON.stringify(data)
    });

    if(response.status === 200) {
        const filesRes = await response.json();
        viewFileTable(searchBox, filesRes, username);
    }
    else {
        const errNotFound = document.createElement('p');
        errNotFound.innerHTML = 'Do not have search file';
        searchBox.appendChild(errNotFound);
    }
};