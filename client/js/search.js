const searchBox = document.getElementById('searchID');

searchBox.addEventListener("keyup", function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Cancel the default action of the enter key, if needed
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

    const {data: response } = await fetch('http://localhost:3000/files/search', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        body: JSON.stringify(data)
    });

    //how to update and how to back
    if(response.status === 200) {
        //massage - file not found
    } else {
        //refresh table
    }
};

// export const search = async (fileName) => {
//     const {data: response } = await fetch('http://localhost:3000/files/search', {
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         method: 'GET',
//         mode: 'cors',
//         cache: 'no-cache',
//         credentials: 'same-origin',
//         redirect: 'follow',
//         body: JSON.stringify(fileName)
//     });
//     console.log(JSON.stringify(fileName));
//     location.href = 'myFiles.html';
// };
