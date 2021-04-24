$(document).ready(function () {

  function getOneArticle() {

    console.log(window.location.href)
    let id = window.location.href.split("readArticle")[1];
    console.log(id);
    $.ajax({
      type: "GET",
      url: `/article/getOneArticle${id}`,
      success: function (response) {

        article = response[0];
        console.log(response);
        showArticle(response.article[0]);

      },

      error: function (err) {
        console.log('Data not found')
      },
    });

  }
  getOneArticle();


  function showArticle(data) {
    console.log(100);
    console.log(data.title);
    console.log(100);
    let a = [{
      day: 'numeric'
    }, {
      month: 'short'
    }, {
      year: 'numeric'
    }];
    let s = join(data.lastUpdate, a, ' ');
    let article = `
  
        <article>
        <header>
          <div class="row">
            <div class="col-12">
              <h1 class="h1 m-0 mb-2" id="title">${data.title}</h1>
              <div class="d-flex justify-content-between align-items-center"> <a href="/usrers/profile"
                  data-toggle="tooltip" data-placement="bottom" title="" target="_blank" rel="author"
                  class="text-dark d-flex align-items-center mt-3 mb-2"> <img
                    class="avatar-md avatar-lg-lg rounded-circle m-0" src="${data.owner.avatar}"
                    id="avatar">
                  <div class="font-small ml-3">
                    <address class="mb-0"><span class="font-weight-medium" id="name">${data.owner.firstname} ${data.owner.lastname}</span></address>
                    <time class="font-xsmall" pubdate="" datetime="Apr 20 2020" id="lastUpdate">${s}</time>
                  </div>
                </a>

              </div>
            </div>
          </div>
        </header>
        <div class="my-4">
          <div id="text"></div>
${data.text}
          <footer class="mt-2 mt-lg-4">

            <aside class="row">
              <div class="col-12">

                <div id="comment"></div>
                comment
              </div>
            </aside>
          </footer>
        </div>
      </article>

  `


  }


})