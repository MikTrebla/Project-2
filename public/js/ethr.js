$(document).ready(() => {

  $("#register").click(event => {
    event.preventDefault();
    var user = {
      screen_name: $("#screenName")
        .val()
        .trim(),
      image: $("#image")
        .val()
        .trim(),
      password: $("#password")
        .val()
        .trim()
    };

    $.post("/register", user).then(data => {
      if (
        data === "Sorry, this username is already taken! Please choose another."
      ) {
        alert("Sorry this username is taken");
        window.location.replace("/register");
      } else if (
        data === "Please choose a password longer than 8 characters."
      ) {
        alert("Please choose a password longer than 8 characters.");
        window.location.replace("/register");
      } else {
        alert("Welcome! " + user.screen_name);
        window.location.href = "/signin";
      }
    });
  });

  $("#signin").click(event => {
    event.preventDefault();
    var user = {
      screen_name: $("#screen_name")
        .val()
        .trim(),
      password: $("#password")
        .val()
        .trim()
    };

    $.post("/signin", user).then(data => {
      if (data === "Sorry, account was not found.") {
        alert(
          "Sorry, account was not found. Please make sure you typed in the correct credentials."
        );
        window.location.replace("/signin");
      } else {
        
        window.location.href = "/user/" + user.screen_name;
      }
    });
  });

  $("#search_btn").click(event => {
    event.preventDefault();
    var query = $("#search_bar").val();

    $.get("/search/" + query).then(data => {
      window.location.href = "/search/" + query;
    });
  });

  $(document).on("click", ".games", function (event) {
    event.preventDefault();
    var gameName = $(this).attr("id");
    $.get("/game/search/" + gameName).then(data => {
      window.location.href = "/game/search/" + gameName;
    });
  });

  postReview = userId => {
    $(document).on("click", "#submit-review", event => {
      event.preventDefault();
      var review = {
        title: $("#myTitle")
          .val()
          .trim(),
        rating: $("input[name=star]:checked").val(),
        body: $("#myComment")
          .val()
          .trim()
      };
      $.get("/checklogin").then(results => {
        if (results === 'user already logged') {
          $.post(window.location.pathname, review).then(data => {
            window.location.reload();
          });
        } else {
          alert('You must be logged in to submit a review! Redirecting to the login page...')
          window.location.href = '/signin'
        }
      })

    });
  };

  $(document).on("click", "#take-me-there", function (event) {
    event.preventDefault();
    var title = document.getElementById("game-title");
    game = title.textContent;
    $.get("/game/search/" + game + "/reviews").then(data => {
      window.location.href = "/game/search/" + game + "/reviews";
    });
  });

  $(document).on('click', '.delete-post', function (event) {
    event.preventDefault();
    var id = $(this).attr('id');
    var name = $(this).attr('name');
    $.get("/checklogin").then(results => {

      if (results === 'user already logged') {
        $.ajax({
          type: 'DELETE',
          url: '/review/delete/' + name + '/' + id,
          success: function (response) {
            window.location.reload();
          }
        });
      } else {
        alert('You must be logged in to edit a review! Redirecting to the login page...')
        window.location.href = '/signin'
      }
    })
  });


  $(document).on('click', '.edit-review', function (event) {
    event.preventDefault();
    var newReview = {
      title: $("#myTitle").val().trim(),
      rating: $("input[name=star]:checked").val(),
      body: $("#myComment").val().trim(),
      id: $(this).attr('id'),
      screen_name: $('.userReview').attr('id')
    }
    $.get("/checklogin").then(results => {
      if (results === 'user already logged') {
        $.ajax({
          type: 'PUT',
          data: newReview,
          url: '/submitreview/edit/' + newReview.id,
          success: function (response) {
            window.location.href = '/user/' + newReview.screen_name
          }
        })
      } else {
        alert('You must be logged in to edit a review! Redirecting to the login page...')
        window.location.href = '/signin'
      }
    })
  })

  $(document).on('click', '.edit-post', function (event) {
    event.preventDefault();
    var id = $(this).attr('id')
    $.get("/checklogin").then(results => {

      if (results === 'user already logged') {

        $.get('/review/edit/' + id).then(result => {
          window.location.href = "/review/edit/" + id;
        })
      } else {
        alert('You must be logged in to edit a review! Redirecting to the login page...')
        window.location.href = '/signin'
      }

    })
  })

  $(document).on('click', '#profile', (event)=>{
    event.preventDefault();
    $.get("/checklogin").then(results =>{
      if(results === 'user already logged'){
        $.get('/api/getid', data => {
          userId = data.user;
          window.location.href = ('/user/' + userId.screen_name);
        })  
      }else{
        window.location.href = '/signin'
      }
    })
  });


});

loggedIn = userId => {
  $.get("/api/getid", data => {
    userId = data.user;
    postReview(userId);
  });
};
loggedIn();