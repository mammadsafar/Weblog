$(document).ready(function () {



    $("#username").on("click", () => {
        $("#username").attr('class', 'form-control')
    })
    $("#email").on("click", () => {
        $("#email").attr('class', 'form-control')
    })
    $("#password").on("click", () => {
        $("#password").attr('class', 'form-control')
    })
    $("#confirm_password").on("click", () => {
        $("#confirm_password").attr('class', 'form-control')
    })

    $("#email").keyup(() => {
        if (email_validate($("#email").val())) {

            $("#email").attr('class', 'form-control is-valid')
        } else {
            $("#email").attr('class', 'form-control is-invalid')
        }
    })

    $("#register_btn").on('click', () => {
        console.log($('#terms').is(':checked'));
        // $('#remember').is(':checked') === true

        /*
        username
        email
        password
        confirm_password
        */
        let username = $("#username");
        let email = $("#email");
        let password = $("#password");
        let confirm_password = $("#confirm_password");

        let array = [username, email, password, confirm_password];
        let array2 = ["username", "email", "password", "confirm_password"];
        for (const key in array) {
            // console.log(key);
            // console.log(array[key].val());

            if (!array[key].val()) {
                $(`#${array2[key]}`).attr('class', 'form-control is-invalid')
                // $(`#${array2[key]}`).css({
                //     "border-bottom": "2px solid #ff1818",
                // })

            } else if (array[key].val()) {

                $(`#${array2[key]}`).attr('class', 'form-control')

            }
        }


        if (check_input(array) === true) {

            if ($('#terms').is(':checked') === false) {

                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'You should agree to the terms and conditions',
                    showConfirmButton: false,
                })

            } else {


                let user = {

                    username: $("#username").val(),
                    email: $("#email").val(),
                    password: $("#password").val()

                }


                // console.log("ok");

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
                            title: 'This user or email not valid',
                            showConfirmButton: false,
                            timer: 1500
                        })

                    },
                });
            }
        }

    })




})

function email_validate(value) {
    let reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!reg.test(value)) {
        return false;
    }
    return true
}


function check_input(array) {

    if ($(username).val() && $(email).val() && $(password).val() && $(confirm_password).val()) {
        if ($(password).val() !== $(confirm_password).val()) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Your Password is not match!',
                footer: '<a href>Why do I have this issue?</a>'
            })
            return false;
        }
        if ($(password).val().length < 8) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password must be longer than 8 characters!',
                footer: '<a href>Why do I have this issue?</a>'
            })
            return false;
        }
        return true;
    } else {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Please fill in all fields',
            showConfirmButton: false,
            timer: 1500
        })
        return false;
    }

}