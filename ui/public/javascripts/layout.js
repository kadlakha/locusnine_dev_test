$(document).ready(function () {
    $('#bodyContent').html('test')
    loadDashboard();

    $('.main-menu').on('click', 'li', function () {
        $(this).addClass('active').siblings().removeClass('active');
    });

    $(".nav li").click(function() {
        $(".nav li.active").removeClass("active");
        $(this).addClass("active");
    });
});


function loadUsers(){
    $.ajax({
        url: "/getUsers",
        type: "GET",
        contentType: "application/json",
        data: "",
        beforeSend: function () {
        },
        success: function (data) {
            console.log("Users loaded");
            //   console.log(data);
            $('#bodyContent').html(data)
        },
        error: function (event, jqerr, exception) {
            console.log(" failed to load:" + exception);
        },
        complete: function () {

        }
    });
}

function loadDashboard() {

    // $('#a_dashboard').addClass('navSelected');
    // $('#06-Accops-User-Listing').css('stroke', 'yellow');

    $.ajax({
        url: "/getDashboard",
        type: "GET",
        contentType: "application/json",
        data: "",
        beforeSend: function () {
        },
        success: function (data) {
            console.log("dashboard loaded");
            //   console.log(data);
            $('#bodyContent').html(data)
        },
        error: function (event, jqerr, exception) {
            console.log(" failed to load:" + exception);
        },
        complete: function () {

        }
    });
}

