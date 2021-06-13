function openModal() {
    const modal = document.getElementsByClassName('wrapper modal');
    modal[0].style.display = 'block';
}

function closeModal() {
    const modal = document.getElementsByClassName('wrapper modal');
    modal[0].style.display = 'none';
}


async function sendFiles(event) {
    event.preventDefault();

    const form = document.getElementById('uploadModal');
    const formData = new FormData(form);

    const username = window.localStorage.getItem('username');
    const token = window.localStorage.getItem('token');

    let folder = window.localStorage.getItem('path') + '/' + window.localStorage.getItem('folder');
    folder = folder.replace('/ ', '');

    let url;
    if (folder.includes('undefined') || folder.includes('null')) {
        url = `http://localhost:3000/files/upload?username=${username}&token=${token}`;
    } else {
        url = `http://localhost:3000/files/upload?username=${username}&token=${token}&folder=${folder}`;
    }

    fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        body: formData
    }).then(async (response) => {
        console.info(await response.json())
    })

    closeModal(event);
    location.reload();
}


