// import { URLSearchParams } from 'url';

// function deleteFile() {

//     const deleteForm = document.getElementsByClassName('wrapper delete-file');
//     deleteForm[0].style.display = 'block';
// }

// function cancelDel() {
//     const modal = document.getElementsByClassName('wrapper delete-file');
//     modal[0].style.display = 'none';
// }

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
        let flag = true;
        let path = files[i].path.substr(files[i].path.lastIndexOf('/' + username) + 1) //username/fdsk
        path = path.substr(path.indexOf('/') + 1) //fjkasf/fjsdklf/fsdkjfsj
        let nameHolder;
        if(path.includes('/')){
            flag = true;
            nameHolder = path.substr(0, path.indexOf('/'));
        } else {
            flag = false;
            nameHolder = path;
        }

        let tr;
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        const td4 = document.createElement('td');
        const td5 = document.createElement('td');
        const td6 = document.createElement('td');
        
        if(!flag) {
            td1.innerHTML = `<img src="../images/file-solid.png" class="img-folder"/> ${nameHolder}`;
            tr = document.createElement('tr');
            td3.innerHTML = files[i].size + ' KB';
        } else {
            td1.innerHTML = `<img src="../images/folder-solid.png" class="img-folder"/> 
                            <button class="folder-click" onclick="openFolder(event)">${nameHolder}</button>`;
            tr = tbody.insertRow(0);
            td3.innerHTML = '0 KB';
        }
        tr.classList.add("data-row");
        td2.innerHTML = '22/03/2021';
        td4.innerHTML = '<input  type="Image" src="../images/download-solid.png" class="action-buttons">';
        td5.innerHTML = '<input  type="Image" src="../images/Vector.png" class="action-buttons" onclick="deleteFile()">';
        td6.innerHTML = '<input  type="Image" src="../images/share.png" class="action-buttons" onclick="share()">';
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        if(!flag){
            tbody.appendChild(tr);
        }
        
    }

    window.localStorage.setItem('path', '');
};

async function openFolder(event) {
    event.preventDefault();

    window.localStorage.setItem('folder', event.srcElement.innerHTML)
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

    const currentFolder = window.localStorage.getItem("folder");

    const currentPath = window.localStorage.getItem('path');
    const path = `../../info/${username}/${currentPath}${currentFolder}`;
    console.log(path)

    const tbody = document.createElement('tbody');
    tbody.setAttribute('id', 'tbody');
    const tbody2 = document.getElementById('tbody');
    
    for(let i = 0; i < files.length; ++i) {
        let flag;
        let pathHolder = files[i].path;
        if(pathHolder.startsWith(path)) {
            pathHolder = pathHolder.replace(path + '/', '');
            console.log(' tuka sam')
        } else {
            continue;
        }
        let nameHolder;
        if(pathHolder.includes('/')){
            flag = true;
            nameHolder = pathHolder.substr(0, pathHolder.indexOf('/'));
        } else {
            flag = false;
            nameHolder = pathHolder;
        }

        let tr;
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        const td4 = document.createElement('td');
        const td5 = document.createElement('td');
        const td6 = document.createElement('td');
        
        if(!flag) {
            td1.innerHTML = `<img src="../images/file-solid.png" class="img-folder"/> ${nameHolder}`;
            tr = document.createElement('tr');
            td3.innerHTML = files[i].size + ' KB';
        } else {
            td1.innerHTML = `<img src="../images/folder-solid.png" class="img-folder"/> 
                            <button class="folder-click" onclick="openFolder(event)">${nameHolder}</button>`;
            tr = tbody.insertRow(0);
            td3.innerHTML = '0 KB';
        }
        tr.classList.add("data-row");
        td2.innerHTML = '22/03/2021';
        td4.innerHTML = '<input  type="Image" src="../images/download-solid.png" class="action-buttons">';
        td5.innerHTML = '<input  type="Image" src="../images/Vector.png" class="action-buttons" onclick="deleteFile()">';
        td6.innerHTML = '<input  type="Image" src="../images/share.png" class="action-buttons" onclick="share()">';
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        if(!flag){
            tbody.appendChild(tr);
        }
        
    }

    tbody2.parentNode.replaceChild(tbody, tbody2);
    if(currentPath === ''){
        window.localStorage.setItem('path', window.localStorage.getItem('folder') + '/');
    } else {
        window.localStorage.setItem('path', currentPath + window.localStorage.getItem('folder'));
    }
}

window.onload = getFiles();

async function deleteFile() {
    const deleteForm = document.getElementsByClassName('wrapper delete-file')[0];
    deleteForm.style.display = 'block';

    const token = window.localStorage.getItem("token");

    const response = await fetch('http://localhost:3000/files/delete', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        body: {
            path: ""
        }
    });
}

// function cancelShare() {
//     const modal = document.getElementsByClassName('wrapper share');
//     modal[0].style.display = 'none';
// }

function createFolderModal() {
    const modal = document.getElementsByClassName('wrapper modal');
    modal[1].style.display = 'block';
}

function cancelCreateFolder() {
    const modal = document.getElementsByClassName('wrapper modal');
    modal[1].style.display = 'none';
}

// function share() {
//     const modal = document.getElementsByClassName('wrapper share');
//     modal[0].style.display = 'block';
// }

async function sendReq(event) {
    event.preventDefault();

    let newFolder =  document.getElementById('new-folder').value;
    const token = window.localStorage.getItem("token");

    const req = {
        name: newFolder,
        username: window.localStorage.getItem("username"),
        path: window.localStorage.getItem("path")
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
        td1.innerHTML = `<img src="../images/folder-solid.png" class="img-folder"/> <button onclick="openFolder(event)">${newFolder}</button>`;
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
    }
};


