function cancelChange() {
    const modal = document.getElementsByClassName('wrapper modal');
    modal[1].style.display = 'none';
}

function nextStep() {
    const modal = document.getElementsByClassName('wrapper modal');
    modal[1].style.display = 'none';
}

function changePassword() {
    const modal = document.getElementsByClassName('wrapper modal');
    modal[1].style.display = 'block';
}

function changePhoto() {
    const modal = document.getElementsByClassName('wrapper upload');
    modal[1].style.display = 'block';
}