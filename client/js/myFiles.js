function deleteFile() {
    const deleteForm = document.getElementsByClassName('wrapper delete-file');
    deleteForm[0].style.display = 'block';
}

function cancelDel() {
    const modal = document.getElementsByClassName('wrapper delete-file');
    modal[0].style.display = 'none';
}

const tbody = document.getElementById('tbody');

for (let i = 1; i <= 10; i++) {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const td4 = document.createElement('td');
    const td5 = document.createElement('td');
    const td6 = document.createElement('td');
    tr.classList.add("data-row");
    td1.innerHTML = '<img src="../images/file-solid.png" class="img-folder"/> Test1244444.txt';
    td2.innerHTML = '22/03/2021';
    td3.innerHTML = '420MB';
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
    // console.log(modal[0]);

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
    let myForm = document.getElementById('create-folder');
    let newFolder =  document.getElementById('new-folder').value;
    
    const formData = new FormData(myForm);
    formData.append('new-folder',newFolder);

    var meggedObj = {};

    for (var pair of formData.entries()) {
        console.log(pair[1]);
        meggedObj[pair[0]] = pair[1];
    }

    const {
        data: response
    } = await fetch('http://localhost:3000/create-folder', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        body: JSON.stringify(meggedObj)
    });

    // return response.json();
    location.href = 'myFiles.html';
};
