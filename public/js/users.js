$(document).ready(function () {



  $.ajax({
    type: "GET",
    url: "/userData/getUser",
    // dataType: "application/json",
    success: function (response) {
      user = response[0];



      $("#avatar_show").attr('src', `${user.avatar}`)


      $("#username_show").html(`@${user.username}`)
      $("#name_show").html(`${user.firstname} ${user.lastname}`)


    },

    error: function (err) {
      log('Data not found')
    },
  });

  function get_articles(get_page, get_limit) {
    $.ajax({
      type: "POST",
      url: "/owner/getAllUser",
      data: {
        page: get_page,
        limit: get_limit
      },
      success: function (response) {


        showUser(response);

      },

      error: function (err) {
        console.log('Data not found')

      },
    });

  }

  get_articles(1, 10);


  function showUser(Users) {


    $("#userTable").html("");
    if (Users) {

      for (let i = 0; i < Users.length; i++) {
        let user = `
    <tr>
    <td><a href="#" class="d-flex align-items-center"><img src="${Users[i].avatar}"
          class="user-avatar rounded-circle me-3" alt="Avatar">
        <div class="d-block"><span class="fw-bold">${Users[i].firstname} ${Users[i].lastname}</span>
          <div class="small text-gray">${Users[i].email}</div>
        </div>
      </a></td>
      <td><span class="fw-normal"></span>${Users[i].username}</span></td>
    <td><span class="fw-normal">${moment(Users[i].createAt).format('DD MMM YYYY')}</span></td>
    <td><span class="fw-normal ">${Users[i].phone_number}</span></td>
    <td><span class="fw-normal ">${Users[i].sex}</span></td>
    <td>
      <div class="btn-group"><button
          class="btn btn-link text-dark dropdown-toggle dropdown-toggle-split m-0 p-0" data-bs-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false"><span class="icon icon-sm pt-1"><span
              class="fas fa-ellipsis-h icon-dark"></span> </span><span class="sr-only">Toggle
            Dropdown</span></button>
        <div class="dropdown-menu py-0">
        <a class="dropdown-item" href="/owner/userArticlePage${Users[i]._id}"><span class="fas fa-eye me-2"></span>View articles</a> 
        <button class="dropdown-item text-danger rounded-bottom" onclick="resetPass('${Users[i]._id}')"><span class="fas fa-user-shield me-2"></span> Reset Pass</button>
        </div>
      </div><span class="fas fa-times-circle text-danger ms-2" title="" data-bs-toggle="tooltip"
        data-bs-original-title="Delete" aria-label="Delete" onclick="deleteUser('${Users[i]._id}')"></span>
    </td>
  </tr>
  
  
    `
        $("#userTable").append(user)


      }
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

function deleteUser(id) {


  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        type: "DELETE",
        url: `/owner/${id}`,
        success: function (response) {

          window.location.reload();

        },

        error: function (err) {
          console.log('Data not found')
        },
      });
    }
  })


}

function viewArticle(id) {





}


function resetPass(id) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, reset it!'
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        type: "PUT",
        url: `/owner/pass${id}`,
        success: function (response) {

          window.location.reload();

        },

        error: function (err) {
          console.log('Data not found')
        },
      });
    }
  })
}