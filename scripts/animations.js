/* Makes active links stay highlighted in nav. */
$(document).ready(function () {
    $('#sidebar li').click(function () {
        $('.highlight').removeClass('highlight');
        $(this).addClass('highlight');
    });
});
