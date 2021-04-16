function next() {
    const firstField = document.getElementsByClassName('pass');
    const secondField = document.getElementsByClassName('conf-pass');
    const button = document.getElementById('next');
    const finish = document.getElementById('finish');
    const correctColor = "#66cc66";
    const incorrectColor = "#ff6666";

    firstField[0].placeholder = 'Enter new password*';
    secondField[0].placeholder = 'Re-enter new password*';
    button.style.visibility = 'hidden';
    finish.style.visibility = 'visible';
}

function finish() {
    const url = 'userDetails.html';
    window.location = url;

    alert("Your password is updated.");
}

function back() {
    const url = 'userDetails.html';
    window.location = url;
}

function changePassword() {
    console.log("ashdfjka");

    const modal = document.getElementsByClassName('wrapper modal');
    console.log(modal[1]);

    modal[1].style.display = 'block';
}

function changePhoto() {
    console.log("ashdfjka");

    const modal = document.getElementsByClassName('wrapper upload');
    console.log(modal[1]);

    modal[1].style.display = 'block';
}