function changeStyle() {
    var x = document.getElementsByClassName("mobile-menu");
    if (x[0].style.display === "block") {
        x[0].style.display = "none";
    } else {
        x[0].style.display = "block";
    };
}

function upload() {
    const modal = document.getElementsByClassName('wrapper modal');
    modal[0].style.display = 'block';
}

function cancelUpdate() {
    const modal = document.getElementsByClassName('wrapper modal');
    modal[0].style.display = 'none';
}
