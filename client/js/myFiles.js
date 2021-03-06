function getUsername() {
    const username = window.localStorage.getItem("username");
    return username;
}

function viewFileTable(tbody, files, username) {

    let allNames = [];

    for (let i = 0; i < files.length; ++i) {
        let flag = true;
        let path = files[i].path.substr(files[i].path.lastIndexOf('/' + username) + 1)
        path = path.substr(path.indexOf('/') + 1);
        let nameHolder;
        if (path.includes('/')) {
            flag = true;
            nameHolder = path.substr(0, path.indexOf('/'));
        } else {
            flag = false;
            nameHolder = path;
        }

        if (allNames.includes(nameHolder)) {
            continue;
        }

        allNames.push(nameHolder);

        let tr;
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        const td4 = document.createElement('td');
        const td5 = document.createElement('td');
        const td6 = document.createElement('td');

        if (!flag) {
            td1.innerHTML = `<img src="../images/file-solid.png" class="img-folder"/> ${nameHolder}`;
            tr = document.createElement('tr');
            td3.innerHTML = files[i].size + ' KB';
        } else {
            td1.innerHTML = `<img src="../images/folder-solid.png" class="img-folder"/> 
                            <a class="folder-click" onclick="openFolder(event)">${nameHolder}</a>`;
            tr = tbody.insertRow(0);
            td3.innerHTML = '0 KB';
        }
        tr.classList.add("data-row");
        td2.innerHTML = '22/03/2021';
        td4.innerHTML = '<input  type="Image" src="../images/download-solid.png" class="action-buttons" onclick="downloadFile(event)">';
        td5.innerHTML = '<input  type="Image" src="../images/Vector.png" class="action-buttons" onclick="deleteFile(event)">';
        td6.innerHTML = '<input  type="Image" src="../images/share.png" class="action-buttons" onclick="share(event)">';
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        if (!flag) {
            tbody.appendChild(tr);
        }

    }

}

function cancelDel() {
    const modal = document.getElementsByClassName('wrapper delete-file');
    modal[0].style.display = 'none';
}

async function getFiles(type) {
    const username = getUsername();

    const token = window.localStorage.getItem("token");

    if (document.getElementsByClassName('location')[0] != null) {
        const loc = document.getElementsByClassName('location')[0].innerHTML;
        let url;
        let flag;
        if (loc === 'All Files') {
            flag = true;
            url = `http://localhost:3000/files/all?username=${username}`;
        } else if (loc === 'Shared Files') {
            flag = false;
            url = `http://localhost:3000/files/allShared?username=${username}`
        } else {
            console.error("Invalid file type");
            return;
        }

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

        let files = json.files;
        let arr = [];
        for (let index = 0; index < files.length; index++) {
            let path;
            if (flag) {
                if(!window.localStorage.getItem('path')) {
                    path = '../../info/' + username;
                } else {
                    path = '../../info/' + username + '/' + window.localStorage.getItem('path');
                }
                if (files[index].path.startsWith(path)) {
                    arr.push(files[index]);
                }
            } else {
                if(!window.localStorage.getItem('path')) {
                    path = '../../shared/' + username;
                } else {
                    path = '../../shared/' + username + '/' + window.localStorage.getItem('path');
                }
                if (files[index].path.startsWith(path)) {
                    arr.push(files[index]);
                }
            }


        }

        const tbody = document.getElementById('tbody');

        viewFileTable(tbody, arr, username);

        // window.localStorage.setItem('path', '');
    }
};

function foldersPath(currentFolder) {
    let currentFolderLocation = document.getElementById('location-folder');
    let text2 = document.createElement('span');
    text2.setAttribute('onclick', 'getFiles("my")');
    text2.setAttribute('class', 'loc-folder');
    let text1 = document.createTextNode('/ ' + currentFolder);

    text2.appendChild(text1);
    currentFolderLocation.appendChild(text2);
}

function test() {
    const currentPath = window.localStorage.getItem('path');

    let pathHolder = currentPath.replace(currentFolder, '');
    let folderHolder = currentPath.replace('/' + currentFolder, '');
    localStorage.setItem('folder', folderHolder);
    localStorage.setItem('path', pathHolder);
}

async function openFolder(event) {
    event.preventDefault();

    window.localStorage.setItem('folder', event.srcElement.innerHTML)
    const username = getUsername();
    const token = window.localStorage.getItem("token");
    const loc = document.getElementsByClassName('location')[0].innerHTML;

    let url;
    if (loc === 'All Files') {
        url = `http://localhost:3000/files/all?username=${username}`;
    } else if (loc === 'Shared Files') {
        url = `http://localhost:3000/files/allShared?username=${username}`
    } else {
        console.error("Invalid file type");
        return;
    }

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
    let path;
    if (loc === 'All Files') {
        path = `../../info/${username}/${currentPath}${currentFolder}`;
    } else if (loc === 'Shared Files') {
        path = `../../shared/${username}/${currentPath}${currentFolder}`;
    } else {
        console.error("Invalid file type");
        return;
    }

    const tbody = document.createElement('tbody');
    tbody.setAttribute('id', 'tbody');
    const tbody2 = document.getElementById('tbody');

    let allNames = [];

    for (let i = 0; i < files.length; ++i) {
        let flag;
        let pathHolder = files[i].path;
        if (pathHolder.startsWith(path)) {
            pathHolder = pathHolder.replace(path + '/', '');
        } else {
            continue;
        }
        let nameHolder;
        if (pathHolder.includes('/')) {
            flag = true;
            nameHolder = pathHolder.substr(0, pathHolder.indexOf('/'));
        } else {
            flag = false;
            nameHolder = pathHolder;
        }

        if (allNames.includes(nameHolder)) {
            continue;
        }

        allNames.push(nameHolder);

        let tr;
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        const td4 = document.createElement('td');
        const td5 = document.createElement('td');
        const td6 = document.createElement('td');

        if (!flag) {
            td1.innerHTML = `<img src="../images/file-solid.png" class="img-folder"/> ${nameHolder}`;
            tr = document.createElement('tr');
            td3.innerHTML = files[i].size + ' KB';
        } else {
            td1.innerHTML = `<img src="../images/folder-solid.png" class="img-folder"/><a class="folder-click" onclick="openFolder(event)">${nameHolder}</a>`;
            tr = tbody.insertRow(0);
            td3.innerHTML = '0 KB';
        }
        tr.classList.add("data-row");
        td2.innerHTML = '22/03/2021';
        td4.innerHTML = '<input  type="Image" src="../images/download-solid.png" class="action-buttons" onclick="downloadFile(event)">';
        td5.innerHTML = '<input  type="Image" src="../images/Vector.png" class="action-buttons" onclick="deleteFile(event)">';
        td6.innerHTML = '<input  type="Image" src="../images/share.png" class="action-buttons" onclick="share(event)">';
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        if (!flag) {
            tbody.appendChild(tr);
        }

    }

    tbody2.parentNode.replaceChild(tbody, tbody2);
    if (currentPath === '') {
        window.localStorage.setItem('path', window.localStorage.getItem('folder') + '/');
    } else {
        window.localStorage.setItem('path', currentPath + window.localStorage.getItem('folder'));
    }

    foldersPath(currentFolder);
}

window.onload = getFiles('my');

let fileToDelete;
let type;

function deleteFile(event) {
    event.preventDefault();

    const deleteForm = document.getElementsByClassName('wrapper delete-file')[0];
    deleteForm.style.display = 'block';

    fileToDelete = event.srcElement.parentNode.parentNode.childNodes[0].innerText;
    type = event.srcElement.parentNode.parentNode.childNodes[0].childNodes[0].getAttribute('src');
}

async function delFile(event) {
    event.preventDefault();

    const token = window.localStorage.getItem("token");
    const username = window.localStorage.getItem('username');
    let path = window.localStorage.getItem('path');
    path = path + '/' + fileToDelete;
    path = path.replace('/ ', '')

    const file = {
        path: path,
        username: username
    }

    let url;
    if (type.includes('file')) {
        url = 'http://localhost:3000/files/delete/file';
    } else {
        url = 'http://localhost:3000/files/delete/folder';
    }

    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        body: JSON.stringify(file)
    });

    location.reload();
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

async function sendReq(event) {
    event.preventDefault();

    let newFolder = document.getElementById('new-folder').value;
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

    const dataRows = document.getElementsByClassName('data-row');

    let flag = false

    for (let i = 0; i < dataRows.length; ++i) {
        if (dataRows[i].childNodes[0].innerText.replace(' ', '') === newFolder) {
            alert("Folder with this name already exists");
            flag = true;
            break;
        }
    }

    if (response.status === 200 && !flag) {
        const tr = tbody.insertRow(0);
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        const td4 = document.createElement('td');
        const td5 = document.createElement('td');
        const td6 = document.createElement('td');
        tr.classList.add("data-row");
        td1.innerHTML = `<img src="../images/folder-solid.png" class="img-folder"/><a onclick="openFolder(event)">${newFolder}</a>`;
        td2.innerHTML = '22/03/2021';
        td3.innerHTML = '0 KB';
        td4.innerHTML = '<input  type="Image" src="../images/download-solid.png" class="action-buttons" onclick="downloadFile(event)">';
        td5.innerHTML = '<input  type="Image" src="../images/Vector.png" class="action-buttons" onclick="deleteFile(event)">';
        td6.innerHTML = '<input  type="Image" src="../images/share.png" class="action-buttons" onclick="share(event)">';
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

let filename;

function share(event) {
    event.preventDefault();

    const modal = document.getElementsByClassName('wrapper share');
    modal[0].style.display = 'block'

    filename = event.srcElement.parentNode.parentNode.childNodes[0].innerText;
}

async function sendShare(event) {
    event.preventDefault();

    const sender = window.localStorage.getItem('username');
    const recipient = document.getElementById('share-file').value;
    let path = window.localStorage.getItem('path');
    let filePath = path + '/' + filename;
    filePath = filePath.replace('/ ', '')

    const sharedFile = {
        sender: sender,
        recipient: recipient,
        filepath: filePath
    }

    const response = await fetch('http://localhost:3000/share/file', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        },
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        body: JSON.stringify(sharedFile)
    })

}

async function loadSharedFiles(event) {
    event.preventDefault();

    window.location.href = '../html/sharedFiles.html'
    getFiles('shared')
}

function loadMyFiles(event) {
    event.preventDefault();

    window.location.href = '../html/myFiles.html'
    getFiles('my')
}