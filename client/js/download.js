async function downloadFile(event) {
  event.preventDefault();

  const username = window.localStorage.getItem('username');
  const token = window.localStorage.getItem('token');

  let filename = event.srcElement.parentNode.parentNode.childNodes[0].innerText;
  filename = filename.replace(' ', '');

  const url = `http://localhost:3000/files/download?username=${username}&filename=${filename}`

  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
  }).then(() => {
    window.open(url, "_download", "download")
  }).catch(err => {
    console.error(err)
  })
}