$(document).ready(function () {

    $("#login_btn").on('click', () => {
        console.log($("#username").val());
        let user = {
            username: $("#email").val(),
            password: $("#password").val()
        }
        $.ajax({
            type: "POST",
            url: "/login/loggedInUser",
            data: user,
            // dataType: "application/json",
            success: function (response) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your are login now',
                    showConfirmButton: false,
                    timer: 1500
                })
                window.location.href = "dashboard";
            },

            error: function (err) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'This user or password is invalid',
                    showConfirmButton: false,
                    timer: 1500
                })

            },
        });

    })




})