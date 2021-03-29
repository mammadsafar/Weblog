$(document).ready(function () {


    $("#navbar").append(`<button id="logout_btn"
    style='position:absolute; text-decoration: none; border: none; right: 5%; background-color:#f8f9fa!important;'>
    <div class='social-btn flex-center' id="github">
        <i class="fas fa-sign-out-alt"></i><span>Sign Out</span>
    </div>
    </button>
    <button id="edit_btn"data-toggle="modal"
    data-target="#exampleModal"
    style='position:absolute; text-decoration: none; border: none; right: 0%; background-color:#f8f9fa!important;'>
    <div class='social-btn flex-center' id="github">
        <i class="fas fa-edit"></i><span>Update</span>
    </div>
    </button>`);


    let user;

    $.ajax({
        type: "GET",
        url: "/userData/getUser",
        // dataType: "application/json",
        success: function (response) {
            user = response[0];

            // console.log(user);

            $("#avatar_show").attr('src', `${user.profile_pic}`)
            $("#username_show").html(`@${user.username}`)
            $("#name_show").html(`${user.firstname} ${user.lastname}`)
            $("#email_show").html(`${user.email}`)
            $("#gender_show").html(`${user.sex}`)
            // $("#birthday").html(`${user.createAt}`)
            $("#phonenumber_show").html(`${user.phone_number}`)


            $("#first_name").attr('value', `${user.firstname}`)
            $("#last_name").attr('value', `${user.lastname}`)
            $("#email").attr('value', `${user.email}`)
            $("#phone").attr('value', `${user.phone_number}`)

            $("#gender").attr('value', `${user.profile_pic}`)







        },

        error: function (err) {
            log('Data not found')
        },
    });


    $("#logout_btn").on('click', () => {

        logout()

    })


    function show_employee() {

        $("#myModal_user").html("")

        let person =
            `
                <div class="column" id="main">
                            <div class="form-group">
                            <label for="exampleInputName">User Name :</label>
                            <input type="name" class="form-control" id="username_input"
                            value="${user.username}" readOnly>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputName">First Name :</label>
                                <input type="name" class="form-control" id="first_name_input"
                                    value="${user.firstname}">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputName">Last Name :</label>
                                <input type="name" class="form-control" id="last_name_input"
                                    value="${user.lastname}">
                            </div>
                            <div class="form-group">
                            <label for="exampleInputName">Email :</label>
                            <input type="email" class="form-control" id="email_input"
                                value="${user.email}" >
                            </div>

                            <div class="form-group">
                            <label for="exampleInputName">Gender :</label>
                            <input type="name" class="form-control" id="input_gender"
                                value="${user.sex}">
                            </div>

                            <div class="form-group">
                            <label for="exampleInputName">Phone Number :</label>
                            <input type="name" class="form-control" id="phone_input"
                                value="${user.phone_number}" >
                            </div>

                            <div class="form-group">
                            <label for="exampleInputName">Birthday :</label>
                            <input type="name" class="form-control" id="birthday"
                                value="${user.createAt}">
                            </div>
                            
                            <button id="update_btn" type="submit" class="btn btn-primary" name="${user.username}">Update</button>
                            <button id="change_pass_btn" type="submit" class="btn btn-primary" data-toggle="modal_changePass" data-target="#exampleModal_changePass" name="${user.username}">Change Password</button>
                            <button id="delete_btn" type="submit" class="btn btn-primary" name="${user.username}">Delete</button>
                        </div>
                    <div>
                        <?xml version="1.0" encoding="UTF-8"?>
                        <svg width="67px" height="578px" viewBox="0 0 67 578" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <!-- Generator: Sketch 53.2 (72643) - https://sketchapp.com -->
                            <title>Path</title>
                            <desc>Created with Sketch.</desc>
                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <path
                                    d="M11.3847656,-5.68434189e-14 C-7.44726562,36.7213542 5.14322917,126.757812 49.15625,270.109375 C70.9827986,341.199016 54.8877465,443.829224 0.87109375,578 L67,578 L67,-5.68434189e-14 L11.3847656,-5.68434189e-14 Z"
                                    id="Path" fill="#F9BC35"></path>
                            </g>
                        </svg>
                    </div>
                    <div class="column" id="secondary">
                        <div class="sec-content">
                            <h1>${user.username}</h1>
                            <h1>${user.firstname}</h1>
                            <h1>${user.lastname}</h1>
                            <h1>${user.email}</h1>
                            <h1>${user.phone_number}</h1>
                            <h1>${user.sex}</h1>
                            <h1>${user.createAt}</h1>
                            <h1>${user.lastUpdate}</h1>

                        </div>
                    </div>

                `
        $("#myModal_user").append(person);


    }
    $("body").on('click', '#edit_btn', function () {
        show_employee()
    })

    function Change_pass() {

        $("#myModal_user").html("")

        let person =
            `
                <div class="column" id="main">
                            <div class="form-group">
                            <label for="exampleInputName">Old Password :</label>
                            <input type="name" class="form-control" id="oldPass_input"
                            placeholder="Old Password" >
                            </div>
                            <div class="form-group">
                                <label for="exampleInputName">New Password :</label>
                                <input type="name" class="form-control" id="newPass_input"
                                    placeholder="New Password">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputName">New Password Verify :</label>
                                <input type="name" class="form-control" id="newPass_verify_input"
                                    placeholder="New Password">
                            </div>

                            
                            <button id="confirm_pass" type="submit" class="btn btn-primary" name="${user.username}">Confirm</button>

                        </div>
                    <div>
                        <?xml version="1.0" encoding="UTF-8"?>
                        <svg width="67px" height="578px" viewBox="0 0 67 578" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <!-- Generator: Sketch 53.2 (72643) - https://sketchapp.com -->
                            <title>Path</title>
                            <desc>Created with Sketch.</desc>
                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <path
                                    d="M11.3847656,-5.68434189e-14 C-7.44726562,36.7213542 5.14322917,126.757812 49.15625,270.109375 C70.9827986,341.199016 54.8877465,443.829224 0.87109375,578 L67,578 L67,-5.68434189e-14 L11.3847656,-5.68434189e-14 Z"
                                    id="Path" fill="#F9BC35"></path>
                            </g>
                        </svg>
                    </div>
                    <div class="column" id="secondary">
                        <div class="sec-content">
                            <h1>${user.username}</h1>
                            <h1>${user.firstname}</h1>
                            <h1>${user.lastname}</h1>
                            <h1>${user.email}</h1>
                            <h1>${user.phone_number}</h1>
                            <h1>${user.sex}</h1>
                            <h1>${user.createAt}</h1>
                            <h1>${user.lastUpdate}</h1>

                        </div>
                    </div>

                `
        $("#myModal_user").html(person);


    }

    $("body").on('click', '#change_pass_btn', function () {
        Change_pass();
    })

    $("body").on('click', '#update_btn', function () {




        let gender;
        if ($("#gender").val() === "gender") {
            gender = user.sex;
        } else {
            gender = $("#gender").val()
        }

        let user_info = {
            firstname: $("#first_name").val(),
            lastname: $("#last_name").val(),
            username: user.username,
            sex: gender,
            email: $("#email").val(),
            phone_number: $("#phone").val(),
        }
        console.log(user_info);
        $.ajax({
            type: "PUT",
            url: `dashboard/${user.username}`,
            data: user_info,
            // dataType: "application/json",
            success: function (response) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Update Successfuly',
                    showConfirmButton: false,
                    timer: 1500
                })
                window.location.reload();
            },

            error: function (err) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: `${err.message}`,
                    showConfirmButton: false,
                    timer: 1500
                })

            },
        });
    })


    $("body").on('click', '#delete_account_btn', function () {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed === true) {
                $.ajax({
                    type: "DELETE",
                    url: `dashboard/${user.username}`,
                    // dataType: "application/json",
                    success: function (response) {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        logout();
                    },

                    error: function (err) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'you can delete',

                        })
                    },
                });
            }
        })
    })

    $("body").on('click', '#delete_btn', function () {




    })
    $("body").on('click', '#change_pass_btn', function () {
        console.log(123);




        let new_pass = $("#new_pass");
        let old_pass = $("#old_pass");
        let confirm_pass = $("#confirm_pass");

        let array = [new_pass, old_pass, confirm_pass];
        let array2 = ["new_pass", "old_pass", "confirm_pass"];
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
            let pass = {
                username: user.username,
                oldPassword: $("#oldPass_input").val(),
                newPassword: $("#newPass_input").val()
            }
            console.log(pass);
            $.ajax({
                type: "PUT",
                url: `dashboard/pass${user.username}`,
                data: pass,
                // dataType: "application/json",
                success: function (response) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Cange pass was successfuly',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    logout();
                },

                error: function (err) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: `you can not cange password`,
                        showConfirmButton: false,
                        timer: 1500
                    })

                },
            });
        }
    })




    function logout() {
        $.ajax({
            type: "GET",
            url: "logout",
            // dataType: "application/json",
            success: function (response) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Sign Out',
                    showConfirmButton: false,
                    timer: 1500
                })
                window.location.reload();
            },

            error: function (err) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: `${err.message}`,
                    showConfirmButton: false,
                    timer: 1500
                })

            },
        });
    }



})


function check_input(array) {

    if ($(new_pass).val() && $(old_pass).val() && $(confirm_pass).val()) {
        if ($(new_pass).val() !== $(confirm_pass).val()) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Your Password is not match!',
                footer: '<a href>Why do I have this issue?</a>'
            })
            return false;
        }
        if ($(new_pass).val().length < 8) {
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