function next() {
    let firstField = document.getElementsByClassName('pass');
    let secondField = document.getElementsByClassName('conf-pass');
    let button = document.getElementById('next');
    let finish = document.getElementById('finish');

    //TODO fix the if statements
    // if(firstField[0].innerText.length === 0 || secondField[0].innerText.length === 0) {
    //     alert("The fields above are required!");
    // }
    // if(firstField[0].innerText != secondField[0].innerText) {
    //     alert("The passwords don't match!"); 
    // }
    

    firstField[0].placeholder = 'Enter new password*';
    secondField[0].placeholder = 'Re-enter new password*';

    //TODO add checkbox before the button

    // let checkbox = document.createElement('input');
    // checkbox.setAttribute('type', 'checkbox');

    //button.innerText = 'Finish';
    button.style.visibility = 'hidden';
    finish.style.visibility = 'visible';
}

function finish() {
    const url = 'myuser.html';
    window.location = url;

    alert("Your password is updated.");
}

