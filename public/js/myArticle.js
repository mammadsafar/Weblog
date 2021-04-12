$(document).ready(function () {


  let user;

  $.ajax({
    type: "GET",
    url: "/userData/getUser",
    success: function (response) {
      user = response[0];
      $("#avatar_show").attr('src', `${user.avatar}`)
      $(".name_show").html(`${user.firstname} ${user.lastname}`)

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




function getArticle(){


  $.ajax({
    type: "GET",
    url: "/article/getMyArticle",
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


function showArticle(articles){

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