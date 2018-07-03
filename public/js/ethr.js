$(document).ready(() => {
  console.log("ready!");
  var gameName;

  
  
  $("#register").click((event) => {

    // event.preventDefault();
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

    $.post("/register", user).then((data) => {
      console.log("add user", data);
      if (data === 'Sorry, this username is already taken! Please choose another.') {
        alert('Sorry this username is taken');
        window.location.replace('/register');
      } else {
        window.location.href = "/login";
      }
    });
  });

  $("#signin").click((event) => {
    event.preventDefault();
    var user = {
      screen_name: $("#screen_name")
        .val()
        .trim(),
      password: $("#password")
        .val()
        .trim()
    };

    $.post("/signin", user).then((data) => {
      console.log("logging in user", data);
      if (data === 'Sorry, account was not found.') {
        alert('Sorry, account was not found. Please make sure you typed in the correct credentials.')
        window.location.replace('/signin');
      } else {
        window.location.href = "/";
        console.log(data);
      }
    });
  });

  $('#search_btn').click(event => {
    event.preventDefault();
    var query = $('#search_bar').val()

    $.get('/search/' + query).then(data => {
      console.log('received request')
      window.location.href = '/search/' + query;

    });
  });


  $(document).on('click', '.games', function (event) {
    event.preventDefault();
    var gameName = $(this).attr('id');
    console.log(gameName);
    $.get('/game/search/' + gameName).then(data => {
      window.location.href = '/game/search/' + gameName;
    })
  });

  $("#submit-review").click(event => {
    event.preventDefault();
    var review = {
      title: $("#myTitle").val().trim(),
      rating: $("input[name=star]:checked").val(),
      body: $("#myComment").val.trim()
    }

    $.post("/game/" + gameName + "/review", review).then(data => {
      console.log("review added" + data);
      window.location.replace()
    })

  });

});


// this is for login validation
//   $.get("/checklogin");