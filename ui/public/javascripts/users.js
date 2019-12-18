var userId = -1;

$(document).ready(function () {
    getUsers();
});


function getUsers() {
    $.ajax({
        url: "/get-users",
        type: "GET",
        contentType: "application/json",
        data: "",
        beforeSend: function () {},
        success: function (data) {
            console.log("Users loaded db");
            console.log(data);
            $('#userGrid').html(data);
        },
        error: function (event, jqerr, exception) {
            console.log(" failed to load:" + exception);
        },
        complete: function () {

        }
    });
}

function addEditUser() {

    var postData = {
        name: $('#inputName').val(),
        email: $('#inputEmail').val(),
        role: $('input[name=roleOptions]:checked').val(),
        status: "Active",
        id: userId
    }

    if (userId == -1) {
        $.ajax({
            url: "/insert-user",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(postData),
            beforeSend: function () {},
            success: function (data) {
                console.log("User inserted");
                console.log(data);
                getUsers();
                $('.toast').toast('show');
                //   $('#userGrid').html(data);
            },
            error: function (event, jqerr, exception) {
                console.log(" failed to load:" + exception);
            },
            complete: function () {

            }
        });
    } else {
        $.ajax({
            url: "/update-user",
            type: "PATCH",
            contentType: "application/json",
            data: JSON.stringify(postData),
            beforeSend: function () {},
            success: function (data) {
                console.log("User inserted");
                console.log(data);
                getUsers();
                $('.toast').toast('show');
                //   $('#userGrid').html(data);
            },
            error: function (event, jqerr, exception) {
                console.log(" failed to load:" + exception);
            },
            complete: function () {

            }
        });
    }

}

function editUser(id) {
    userId = id;
    $("#exampleModal").modal()

    $.ajax({
        url: "/get-user-by-id?id=" + id,
        type: "GET",
        contentType: "application/json",
        data: "",
        beforeSend: function () {},
        success: function (data) {
            console.log("editUser");
            console.log(JSON.parse(data));
            data = JSON.parse(data);
            $('#inputName').val(data.results[0].name)
            $('#inputEmail').val(data.results[0].email)
            if (data.results[0].role == "Admin") {
                $("#radioAdmin").prop("checked", true);
            } else {
                $("#radioCustExec").prop("checked", true);
            }
        },
        error: function (event, jqerr, exception) {
            console.log(" failed to load:" + exception);
        },
        complete: function () {

        }
    });

}


function addUser() {
    userId = -1;
    $("#exampleModal").modal()
    clearUserData();
}

function clearUserData() {
    $('#inputName').val('');
    $('#inputEmail').val('');
    $('#inputMob').val('');
}

function resize()
{
    var heights = window.innerHeight;
    document.getElementById("innercn").style.height = heights + "px";
}
resize();
window.onresize = function() {
    resize();
};