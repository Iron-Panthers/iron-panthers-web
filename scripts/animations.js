/* Makes active links stay highlighted in nav. */
$(document).ready(function () {
    $('#sidebar li').click(function () {
        $('.highlight').removeClass('highlight');
        $(this).addClass('highlight');
    });
});

window.onscroll = scrollNav;

function scrollNav() {
    var header = document.getElementById("sidebar");
    if (window.pageYOffset > 200) {
        header.style.position = "absolute";
        header.style.top = (pageYOffset - 200) + "px";
    } else {
        header.style.position = "";
        header.style.top = "";
    }
}