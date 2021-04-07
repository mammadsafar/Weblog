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



  $("#save_btn").on('click', () => {

    if ($("#article_name").val()){
      $.ajax({
        type: "POST",
        url: "/article/addtitle",
        data: {
          title :$("#article_name").val(),
        },
        // dataType: "application/json",
        success: function (response) {
          send_article_text();

        },
    
        error: function (err) {
          console.log('cant save article name')
        },
      });


    }


  })




function send_article_text(){


  $.ajax({
    type: "POST",
    url: "/article/addText",
    data: {
      text :CKEDITOR.instances.editor1.getData(),
      summery: CKEDITOR.instances.editor1.document.getBody().getText(),
    },
    // dataType: "application/json",
    success: function (response) {
      console.log("saved");
    },

    error: function (err) {
      console.log('cant save text')
    },
  });
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