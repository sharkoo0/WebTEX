function openModal () {
    const modal = document.getElementsByClassName('wrapper modal');
    modal[0].style.display = 'block';
}

function closeModal() {
    const modal = document.getElementsByClassName('wrapper modal');
    modal[0].style.display = 'none';
}


async function sendFiles(event) {
    event.preventDefault();

    const form = document.getElementById('uploadModal');
    const formData = new FormData(form);

    // const input = document.getElementById('filetoupload');

    const username = window.localStorage.getItem('username');
    const token = window.localStorage.getItem('token');

    // console.log(input.files);

    // let form = new FormData();

    // for (let i = 0; i < input.files.length; i++) {
    //     const element = input.files[i];
    //     console.log(element);
    //     form.append('files', element)
    // }
    // console.log(form.entries)

    // const files = {
    //     files: input.files
    // }
    // console.log('before fetch')

    let folder = window.localStorage.getItem('path') + '/' + window.localStorage.getItem('folder');
    folder = folder.replace('/ ', '');
    console.log(folder);

    let url;
    if(folder.includes('undefined') || folder.includes('null')) {
        url = `http://localhost:3000/files/upload?username=${username}&token=${token}`;
    } else {
        url = `http://localhost:3000/files/upload?username=${username}&token=${token}&folder=${folder}`;
    }

    fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        body: formData
    }).then(async (response) => {
        console.log(await response.json())
    })
    console.log('after fetch')

    closeModal(event);
    location.reload();
    // console.log(await response.json())

    // console.log(await response.json());
    
}


