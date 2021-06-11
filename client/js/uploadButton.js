const openModal = () => {
    const modal = document.getElementById('uploadModal');
    modal[0].style.display = 'block';
}

const closeModal = () => {
    const modal = document.getElementById('uploadModal');
    modal[0].style.display = 'none';
}

const input = document.getElementById('filetoupload');

async function sendFiles(event) {
    event.preventDefault();

    openModal();

    const authToken = window.localStorage.getItem("token");
    const username = window.localStorage.getItem("username");
    let path = window.localStorage.getItem("path")
    if (path === '') {
        path = window.localStorage.getItem('folder');
    }
    // console.log(username)
    const formData = new FormData();

    const files = input.files;
    console.log(files)
    // console.log(files[0])
    let array = [];
    for(let i = 0; i < files.length; ++i) {
        console.log(files[i])
        array[i] = files[i]    
    }
    console.log(array)
    // formData.append('files', input.files);
    formData.append('filesrray', a)
    console.log(formData)
    // console.log(typeof files)
    // console.log("files")
    // console.log(files);

    // let filesToUpload = [];
    // for (let i = 0; i < files.length; ++i) {
    //     filesToUpload[i] = {
    //         name: files[i].name,
    //         type: files[i].type,
    //         size: files[i].size
    //     }
    // }

    const file = {
        files: files,
        username: username,
        folder: path
    }
    // console.log(path)
    // console.log(file)

    const res = await fetch(`http://localhost:3000/files/token`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken
        },
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin'
    })
    let token = (await res.json()).token;
    // console.log(await res.json())
    if (token) {
        console.log(token)
        const response = await fetch(`http://localhost:3000/files/upload?username=${username}&path=${path}`, {
            headers: {
                // 'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
                'Authorization': authToken
            },
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            // files: formData,
            body: formData
        });
        console.log(await response.json())
    }


    
    closeModal();
}

//FIX onload -> show only unique folders