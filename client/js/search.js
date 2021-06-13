const searchBox = document.getElementById('searchID');

searchBox.addEventListener("keyup", function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    console.log("event");



    search(searchBox.value);
  }
});

async function search(filename) {
    const token = window.localStorage.getItem("token");
    const username = window.localStorage.getItem("username");

    const data = {
        user: username,
        filename: filename
    }

    const response = await fetch(`http://localhost:3000/files/search/${filename}?username=${username}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow'
    });

    if(response.status === 200) {
        const filesRes = await response.json();
        console.log(filesRes);
        viewFile(filesRes.files, username);
    }
    else {
        const fileNotFound = document.getElementById('file-not-found');
        const text = document.createTextNode("File not found");
        fileNotFound.appendChild(text);
    }
};

function viewFile(files, username) {
  const tbody2 = document.getElementById('tbody');
  const tbody = document.createElement('tbody');
  tbody.setAttribute('id', 'tbody');

  
  for(let i = 0; i < files.length; ++i) {
      let path = files[i].path.substr(files[i].path.lastIndexOf('/' + username) + 1)

      let tr;
      const td1 = document.createElement('td');
      const td2 = document.createElement('td');
      const td3 = document.createElement('td');
      const td4 = document.createElement('td');
      const td5 = document.createElement('td');
      const td6 = document.createElement('td');
    
      td1.innerHTML = `<img src="../images/file-solid.png" class="img-folder"/>${path}`;
      tr = document.createElement('tr');
      td3.innerHTML = files[i].size + ' KB';
  
      tr.classList.add("data-row");
      td2.innerHTML = '22/03/2021';
      td4.innerHTML = '<input  type="Image" src="../images/download-solid.png" class="action-buttons">';
      td5.innerHTML = '<input  type="Image" src="../images/Vector.png" class="action-buttons" onclick="deleteFile(event)">';
      td6.innerHTML = '<input  type="Image" src="../images/share.png" class="action-buttons" onclick="share(event)">';
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);
      tr.appendChild(td6);
      
      tbody.appendChild(tr);
      
  }

  tbody2.parentNode.replaceChild(tbody, tbody2);
 
}
