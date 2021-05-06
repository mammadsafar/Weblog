$(document).ready(function () {

  function getOneArticle() {

    let id = window.location.href.split("readArticle")[1];
    $.ajax({
      type: "GET",
      url: `/article/getOneArticle${id}`,
      success: function (response) {
        console.log(response);

        getText(response.article[0]);

      },

      error: function (err) {
        console.log('Data not found')
      },
    });

  }
  getOneArticle();

  function getText(Data) {
    $.ajax({
      type: "GET",
      url: Data.text,
      success: function (response) {

        showArticle({
          data: Data,
          text: response
        });

      },

      error: function (err) {
        console.log('Data not found')
      },
    });
  }



  function showArticle(data) {


    let article = `
  
        <header>
          <div class="row">
            <div class="col-12">
              <h1 class="h1 m-0 mb-2" id="title">${data.data.title}</h1>
              <div class="d-flex justify-content-between align-items-center"> <a href="/usrers/profile"
                  data-toggle="tooltip" data-placement="bottom" title="" target="_blank" rel="author"
                  class="text-dark d-flex align-items-center mt-3 mb-2"> <img
                    class="avatar-md avatar-lg-lg rounded-circle m-0" src="${data.data.owner.avatar}"
                    id="avatar">
                  <div class="font-small ml-3">
                    <address class="mb-0"><span class="font-weight-medium" id="name">${data.data.owner.firstname} ${data.data.owner.lastname}</span></address>
                    <time class="font-xsmall" pubdate="" datetime="Apr 20 2020" id="lastUpdate">${moment(data.data.lastUpdate).format('DD MM YYYY')}</time>
                  </div>
                </a>

              </div>
            </div>
          </div>
        </header>
        <div class="my-4">
          <div id="text">
            ${data.text}
            </div>

        </div>

  `
    $("#container").html(article)


  }



  $.ajax({
    type: "GET",
    url: `/userData/getComment${window.location.href.split("readArticle")[1]}`,
    success: function (response) {
      showComment(response)

    },

    error: function (err) {
      console.log('Data not found')
    },
  });






  $("body").on('click', '#comment_btn', function () {
    $.ajax({
      type: "POST",
      url: `/article/addComment${window.location.href.split("readArticle")[1]}`,
      data: {
        massage: $("#message").val()
      },
      success: function (response) {
        window.location.reload();

      },

      error: function (err) {
        console.log('Data not found')
      },
    });
  })

})



function showComment(comments) {


  for (const key in comments) {


    let comment =
      `
      <h3>${comments.length} Comments</h3>
      <div class="media">
        <a class="pull-left" href="#"><img class="media-object"
            src="${comments[key].owner.avatar}" style="border-radius:50%; width:100px"
            alt=""></a>
        <div class="media-body">
          <h4 class="media-heading">${comments[key].owner.username}</h4>
          <p>${comments[key].body}</p>
          <ul class="list-unstyled list-inline media-detail pull-left">
            <li><i class="fa fa-calendar"></i>${moment(comments[key].createdAt).format('DD MM YYYY')}</li>
          </ul>
        </div>
      </div>

    `
    $("#comments").append(comment)


  }
}