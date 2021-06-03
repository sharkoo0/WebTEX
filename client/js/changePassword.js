function cancelChange() {
    // const firstField = document.getElementsByClassName('pass');
    // const secondField = document.getElementsByClassName('conf-pass');
    // const button = document.getElementById('next');
    // const finish = document.getElementById('finish');
    // const correctColor = "#66cc66";
    // const incorrectColor = "#ff6666";

    // firstField[0].placeholder = 'Enter new password*';
    // secondField[0].placeholder = 'Re-enter new password*';
    // button.style.visibility = 'hidden';
    // finish.style.visibility = 'visible';
    const modal = document.getElementsByClassName('wrapper modal');
    modal[1].style.display = 'none';
}

function nextStep() {
    const modal = document.getElementsByClassName('wrapper modal');
    modal[1].style.display = 'none';
}

// function finish() {
//     const url = 'userDetails.html';
//     window.location = url;

//     alert("Your password is updated.");
// }

// function back() {
//     const url = 'userDetails.html';
//     window.location = url;
// }

function changePassword() {
    const modal = document.getElementsByClassName('wrapper modal');
    modal[1].style.display = 'block';
}

function changePhoto() {
    const modal = document.getElementsByClassName('wrapper upload');
    modal[1].style.display = 'block';
}