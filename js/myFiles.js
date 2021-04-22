const tbody = document.getElementById('tbody');

for (let i = 1; i <= 10; i++) {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const td4 = document.createElement('td');
    const td5 = document.createElement('td');
   
    const img = document.createElement('img');
    img.setAttribute('src','../images/file-solid.png');
    img.setAttribute('class','img-folder');
    
    const fileName = document.createTextNode('Test1244444.txt');
    
    const date = document.createTextNode('22/03/2021');
  

    const size = document.createTextNode('420MB');
 

    const input1 = document.createElement('input');

    input1.setAttribute('class','action-buttons');
    input1.setAttribute('type','Image');
    input1.setAttribute('src','../images/download-solid.png');

    const input2 = document.createElement('input');
    input2.setAttribute('class','action-buttons');
    input2.setAttribute('type','Image');
    input2.setAttribute('src','../images/Vector.png');

    tr.appendChild(td1);
    td1.appendChild(img);
    td1.appendChild(fileName);

    tr.appendChild(td2);
    td2.appendChild(date);

    tr.appendChild(td3);
    td3.appendChild(size);

    tr.appendChild(td4);
    td4.appendChild(input1);

    tr.appendChild(td5);
    td5.appendChild(input2);

    tbody.appendChild(tr);
}

function deleteFile() {
    const deleteForm = document.getElementsByClassName('wrapper delete-file')[0];
    deleteForm.style.display = 'block';
}
