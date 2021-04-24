$(document).ready(function () {


  function get_articles(get_page, get_limit) {
    $.ajax({
      type: "POST",
      url: "/article/getMyArticle",
      data: {
        page: get_page,
        limit: get_limit
      },
      success: function (response) {

        article = response[0];
        console.log(response);
        show_article(response.articles);

      },

      error: function (err) {
        console.log(err)
      },
    });

  }

  get_articles(1, 3);


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
    // $("#container").html("");
    if (articles !== null) {

      for (let i = 0; i < articles.length; i++) {
        let art = `     
          
          <section class="blog-card mb-4 mb-lg-5 col-5 articleShow">
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
                <a href="/article/readArticle${articles[i]._id}">
                  <h2 class="h2 mt-0 mt-md-2 mb-0">
                  ${articles[i].title}
  
                  </h2>
                </a>
                <a href="/article/readArticle${articles[i]._id}" class="d-block mb-0 mb-lg-2 mt-1">
                  <img
                    class="blog-img card-img-top lazy loaded" style=" height:400px; width:400px;"
                    src="${articles[i].profile}">
                </a>
                <p class="mb-0 mb-lg-4">${articles[i].summery}</p>
              </div>
              <div class="card-footer mx-4 px-0 pt-0 mt-3 mt-lg-0">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="post-meta">
                    
                    <a class="text-dark" href="/article/readArticle${articles[i]._id}">
                      View
                    </a>
                  </div>
                  <div class="btn-group me-2 mb-2">
                  <a href="/article/readArticle${articles[i]._id}" class="btn btn-dark">More</a> <button type="button" 
                  class="btn btn-dark dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-haspopup="true"
                  aria-expanded="false"><span class="fas fa-angle-down dropdown-arrow"></span> <span class="sr-only">Toggle
                    Dropdown</span></button>
                <div class="dropdown-menu" style="">
                <a class="dropdown-item rounded-bottom fw-bold" id="delete_account_btn" href="/article/readArticle${articles[i]._id}"><span class="fa fa-address-book-o " aria-hidden="true"></span>Read </a>
                <a class="dropdown-item rounded-bottom fw-bold" id="delete_account_btn" href="/article/edit${articles[i]._id}"><span class="fa fa-pencil-square-o " aria-hidden="true"></span>Edit </a>
                  <div class="dropdown-divider"></div>
                  <button class="dropdown-item rounded-bottom fw-bold" id="delete_account_btn" onclick="delete_article('${articles[i]._id}')"><span class="fas fa-trash-alt text-danger" aria-hidden="true"></span>Delete </button>
                </div>
              </div>              </div>
            </div>
          </section>
        `

        $("#container").append(art);

      };
    }



  }



  function pagination() {
    console.log(this);

  }

  $(".articleShow").on('click', () => {

    console.log(this);

  })

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

function delete_article(id){

  $.ajax({
    type: "DELETE",
    url: `/article/delete${id}`,
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

