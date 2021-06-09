const openModal = () => {
    const modal = document.getElementById('uploadModal');
    modal[0].style.display = 'block';
}

const closeModal = () => {
    const modal = document.getElementById('uploadModal');
    modal[0].style.display = 'none';
}

async function sendFiles(event) {
    event.preventDefault();

    openModal();

    const token = window.localStorage.getItem("token");
    const username = window.localStorage.getItem("username");

    console.log(username)

    const files = document.getElementById('filetoupload').files;
    console.log(typeof files)
    // console.log("files")
    // console.log(files);

    let filesToUpload = [];
    for(let i = 0; i < files.length; ++i) {
        filesToUpload[i] = {
            name: files[i].name,
            type: files[i].type,
            size: files[i].size
        }
    }

    const file = {
        files: filesToUpload,
        username: username,
        folder: window.localStorage.getItem("path")
    }
    console.log(' fhasdkf')
    console.log(file)

    const response = await fetch('http://localhost:3000/files/upload', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        body: JSON.stringify(file)
    });

    console.log(await response.json());
    closeModal();
}


//FIX onload -> folder and files in folder and folder in as path parameters 