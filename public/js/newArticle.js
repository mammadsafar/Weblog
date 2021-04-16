console.log(12);
$(document).ready(function () {


  let user;

  $.ajax({
    type: "GET",
    url: "/userData/getUser",
    // dataType: "application/json",
    success: function (response) {
      user = response[0];

      // console.log(user);

      // $(".avatar_cover").attr('data-background', `${user.background_cover}`)

      $("#avatar_show").attr('src', `${user.avatar}`)

      // $("#username_show").html(`@${user.username}`)
      $("#name_show").html(`${user.firstname} ${user.lastname}`)
      // $("#email_show").html(`${user.email}`)
      // $("#gender_show").html(`${user.sex}`)
      // // $("#birthday").html(`${user.createAt}`)
      // $("#phonenumber_show").html(`${user.phone_number}`)


      // $("#first_name").attr('value', `${user.firstname}`)
      // $("#last_name").attr('value', `${user.lastname}`)
      // $("#email").attr('value', `${user.email}`)
      // $("#phone").attr('value', `${user.phone_number}`)

      // $("#gender").attr('value', `${user.avatar}`)
    },

    error: function (err) {
      log('Data not found')
    },
  });




  $("body").on('click', '#save_article_profile_btn', () => {

    console.log($('#article_avatar')[0]);

    var image_file = $('#article_avatar')[0].files[0];

    var data = new FormData();
    data.append("avatar", $('#article_avatar')[0].files[0]);

    $.ajax({
      url: '/article/articleprofile',
      type: 'POST',
      data: data,
      contentType: false,
      processData: false,
      success: function (status) {
        console.log("success ==> ", status);
      },
      error: function (err) {
        console.log("error ==> ", err);
      }
    });


  })


  $("#article_name").on("click", () => {
    $("#article_name").attr('class', 'form-control')
  })


  $("#save_btn").on('click', () => {


    if (!$("#article_name").val()) {
      return $("#article_name").attr('class', 'form-control is-invalid')
    }
    if (!CKEDITOR.instances.editor1.getData()) {

      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      return swalWithBootstrapButtons.fire({
        title: 'You have not written any text for your article',
        text: "Do you delete the article or continue?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        // reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: 'Are you shore',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Yes`,
            denyButtonText: `No!`,
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "myarticles";
            }
          })
        }
      })



      // return  Swal.fire({
      //   icon: 'error',
      //   title: 'Oops...',
      //   text: 'Something went wrong!',
      // })
    }

    $.ajax({
      type: "POST",
      url: "/article/addNewArticle",
      data: {
        title: $("#article_name").val(),
        text: CKEDITOR.instances.editor1.getData(),
        summery: CKEDITOR.instances.editor1.document.getBody().getText(),
      },
      // dataType: "application/json",
      success: function (response) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Saved Article has successfully',
          showConfirmButton: false,
          timer: 1500
        })
        console.log($('#article_avatar')[0].files[0]);
        if ($('#article_avatar')[0].files[0]) {
          console.log("ok");
          return send_article_avatar();
        } else {

          window.location.href = "myArticle";
        }



      },

      error: function (err) {

      },
    });



  })




  function send_article_avatar() {


    if ($('#article_avatar')[0].files[0]) {

      var image_file = $('#article_avatar')[0].files[0];

      var data = new FormData();
      data.append("avatar", $('#article_avatar')[0].files[0]);

      $.ajax({
        url: '/article/articleprofile',
        type: 'POST',
        data: data,
        contentType: false,
        processData: false,
        success: function (status) {
          window.location.href = "article/myArticle";
        },
        error: function (err) {
          window.location.href = "article/myArticle";
        }
      });
    }

  }






  $("#logout_btn").on('click', () => {

    logout()

  })

  function logout() {
    $.ajax({
      type: "GET",
      url: "/logout",
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