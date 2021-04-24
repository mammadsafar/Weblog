$(document).ready(function(){

  $.ajax({
    type: "GET",
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
      console.log('Data not found')
    },
  });






















})