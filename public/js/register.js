$(document).ready(function () {

    $("#register_btn").on('click', () => {

        let user = {

            username:$("#username").val(),
            password:$("#password").val()

        }
        $.ajax({
            type: "POST",
            url: "/register",
            data: user,
            // dataType: "application/json",
            success: function (response) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'SignUp successfuly',
                    showConfirmButton: false,
                    timer: 1500
                })
                window.location.href = "login";
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