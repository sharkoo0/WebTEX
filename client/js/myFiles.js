// import { URLSearchParams } from 'url';

function deleteFile() {

    const deleteForm = document.getElementsByClassName('wrapper delete-file');
    deleteForm[0].style.display = 'block';
}

function cancelDel() {
    const modal = document.getElementsByClassName('wrapper delete-file');
    modal[0].style.display = 'none';
}

async function getFiles() {
    const username = window.localStorage.getItem("username");
    const token = window.localStorage.getItem("token");
    const url = `http://localhost:3000/files/all?username=${username}`;

    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin'
    });

    const json = await response.json()
    const files = json.files;

    const tbody = document.getElementById('tbody');
    
    for(let i = 0; i < files.length; ++i) {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        const td4 = document.createElement('td');
        const td5 = document.createElement('td');
        const td6 = document.createElement('td');
        tr.classList.add("data-row");
        td1.innerHTML = `<img src="../images/file-solid.png" class="img-folder"/> ${files[i].name}`;
        td2.innerHTML = '22/03/2021';
        td3.innerHTML = files[i].size + ' KB';
        td4.innerHTML = '<input  type="Image" src="../images/download-solid.png" class="action-buttons">';
        td5.innerHTML = '<input  type="Image" src="../images/Vector.png" class="action-buttons" onclick="deleteFile()">';
        td6.innerHTML = '<input  type="Image" src="../images/share.png" class="action-buttons" onclick="share()">';
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tbody.appendChild(tr);
    }
};

window.onload = getFiles();

function deleteFile() {
    const deleteForm = document.getElementsByClassName('wrapper delete-file')[0];
    deleteForm.style.display = 'block';
    // const response = await fetch('http://localhost:3000/files/delete', {
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     method: 'DELETE',
    //     mode: 'cors',
    //     cache: 'no-cache',
    //     credentials: 'same-origin',
    //     redirect: 'follow',
    //     body: {
    //         path: ""
    //     }
    // });
}

function cancelShare() {
    const modal = document.getElementsByClassName('wrapper share');
    modal[0].style.display = 'none';
}

function createFolderModal() {
    const modal = document.getElementsByClassName('wrapper modal');
    modal[1].style.display = 'block';
}

function cancelCreateFolder() {
    const modal = document.getElementsByClassName('wrapper modal');
    modal[1].style.display = 'none';
}

function share() {
    const modal = document.getElementsByClassName('wrapper share');
    modal[0].style.display = 'block';
}

async function sendReq(event) {
    event.preventDefault();

    let newFolder =  document.getElementById('new-folder').value;
    const token = window.localStorage.getItem("token");
    console.log(token)

    const req = {
        name: newFolder,
        username: window.localStorage.getItem("username")
        //how to get path???
    }

    const response = await fetch('http://localhost:3000/create-folder', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        body: JSON.stringify(req)
    });

    if(response.status === 200) {
        const tr = tbody.insertRow(0);
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        const td4 = document.createElement('td');
        const td5 = document.createElement('td');
        const td6 = document.createElement('td');
        tr.classList.add("data-row");
        td1.innerHTML = `<img src="../images/folder-solid.png" class="img-folder"/> ${newFolder}`;
        td2.innerHTML = '22/03/2021';
        td3.innerHTML = '0 KB';
        td4.innerHTML = '<input  type="Image" src="../images/download-solid.png" class="action-buttons">';
        td5.innerHTML = '<input  type="Image" src="../images/Vector.png" class="action-buttons" onclick="deleteFile()">';
        td6.innerHTML = '<input  type="Image" src="../images/share.png" class="action-buttons" onclick="share()">';
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        const modal = document.getElementsByClassName('wrapper modal');
        modal[1].style.display = 'none';
        // tbody.appendChild(tr);
    }
};


