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
    console.log(modal[0]);

    modal[0].style.display = 'block';
}