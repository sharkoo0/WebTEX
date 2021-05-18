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
    td5.innerHTML = '<input  type="Image" src="../images/Vector.png" class="action-buttons onclick="deteleFile()"">';
    td6.innerHTML = '<input  type="Image" src="../images/share.png" class="action-buttons">';
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
