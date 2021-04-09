const tbody = document.getElementById('tbody');

for (let i = 1; i <= 10; i++) {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const td4 = document.createElement('td');
    const td5 = document.createElement('td');
    td1.innerHTML = '<img src="../images/file-solid.png" class="img-folder"/> Test1244444.txt';
    td2.innerHTML = '22/03/2021';
    td3.innerHTML = '420MB';
    td4.innerHTML = '<input class="picturre-download" type="Image" src="../images/download-solid.png" class="action-buttons">';
    td5.innerHTML = '<input class="picturer-delete" type="Image" src="../images/Vector.png" class="action-buttons onclick="deteleFile()"">';
    tr.appendChild(td1, td2, td3, td4, td5);
    tbody.appendChild(tr);
}

function deleteFile() {
    const deleteForm = document.getElementsByClassName('wrapper delete-file')[0];
    deleteForm.style.display = 'block';
}

//Not finished