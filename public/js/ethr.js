$(document).ready(() => {
  console.log("ready!");
  var gameName;

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
    console.log(event);

    $.post("/register", user).then(data => {
      console.log("add user", data);
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
      console.log("logging in user", data);
      if (data === "Sorry, account was not found.") {
        alert(
          "Sorry, account was not found. Please make sure you typed in the correct credentials."
        );
        window.location.replace("/signin");
      } else {
        window.location.href = "/user/" + user.screen_name;
        console.log(data);
      }
    });
  });

  $("#search_btn").click(event => {
    event.preventDefault();
    var query = $("#search_bar").val();

    $.get("/search/" + query).then(data => {
      console.log("received request");
      window.location.href = "/search/" + query;
    });
  });

  $(document).on("click", ".games", function (event) {
    event.preventDefault();
    var gameName = $(this).attr("id");
    console.log(gameName);
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
      $.get("/checklogin");
      $.post(window.location.pathname, review).then(data => {
        if (data === "Please signin") {
          alert("You have to sign in to be able to submit reviews!");
          window.location.href = "/signin";
        } else {
          console.log("review added" + data);
          window.location.reload();
        }
      });
    });
  };

  $(document).on("click", "#take-me-there", function (event) {
    event.preventDefault();
    var title = document.getElementById("game-title");
    game = title.textContent;
    console.log(game);
    $.get("/game/search/" + game + "/reviews").then(data => {
      window.location.href = "/game/search/" + game + "/reviews";
    });
  });

  $(document).on('click', '.delete-post', function (event) {
    event.preventDefault();
    var id = $(this).attr('id');
    var name = $(this).attr('name');
    console.log(id);
    $.ajax({
      type: 'DELETE',
      url: '/review/delete/' + name + '/' + id,
      success: function (response) {
        console.log('deleted');
        window.location.reload();
      }
    })
    // $.delete('/game/search/' + game + '/reviews').then(data => {
    //   window.location.reload();
    // });
  })

});

loggedIn = userId => {
  $.get("/api/getid", data => {
    userId = data.user;
    postReview(userId);
  });
};
loggedIn();

// this is for login validation
// $.get("/checklogin");