$(document).ready(function () {


  let user;

  $.ajax({
    type: "POST",
    url: "/article/getMyArticle",
    data: {
      page: 1,
      limit: 3
    },
    success: function (response) {

      article = response[0];
      console.log(response);
      show_article(response.articles);

    },

    error: function (err) {
      console.log('Data not found')
    },
  });



  $("#save_btn").on('click', () => {
    console.log(10000);
    if ($("#article_name").val()) {
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
          send_article_text();

        },

        error: function (err) {
          console.log('cant save article name')
        },
      });


    }


  })






  function show_article(articles) {
    console.log(articles);
    if(articles !== null){

      for (let i = 0 ; i < articles.length; i++ ) {
        let art = `     
          
          <section class="blog-card mb-4 mb-lg-5">
            <div class="card shadow-sm border-light px-0 py-3 p-md-4">
              <div class="card-body py-2">
                <div class="font-small mb-3"> <span>By</span>
                  <a href="https://twitter.com/zoltanszogyenyi" target="_blank" rel="author" class="text-dark">
                    <address class="mb-0 d-inline mr-1">
                      <span class="font-weight-medium name_show">
                       ${articles[i].owner.firstname} ${articles[i].owner.lastname}
  
                      </span>
                    </address>
                  </a>
                  <time class="d-inline" pubdate="pubdate" datetime="Apr 01 2021">1 week ago</time>
                </div>
                <a href="https://themesberg.com/blog/django/user-profile-tutorial">
                  <h2 class="h2 mt-0 mt-md-2 mb-0">
                  ${articles[i].title}
  
                  </h2>
                </a>
                <a href="https://themesberg.com/blog/django/user-profile-tutorial" class="d-block mb-0 mb-lg-2 mt-1">
                  <img
                    class="blog-img card-img-top lazy loaded"
                    src="${articles[i].profile}">
                </a>
                <p class="mb-0 mb-lg-4">${articles[i].summery}</p>
              </div>
              <div class="card-footer mx-4 px-0 pt-0 mt-3 mt-lg-0">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="post-meta">
                    
                    <a class="text-dark" href="https://themesberg.com/blog/django/user-profile-tutorial#disqus_thread">
                      View
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        `
  
        $("#container").append(art);
  
      };
    }



}


function showArticle(articles) {

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