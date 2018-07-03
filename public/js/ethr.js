$(document).ready(() => {
  console.log("ready!");

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
        window.location.href="/login";
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
<<<<<<< HEAD
        window.location.href="/";
        console.log(data);
=======
        window.location.href = "/profile/" + user.screen_name.toLowerCase();
>>>>>>> ea88eeaba0251126a1ccc718443286d74311ea60
      }
    });
  });


<<<<<<< HEAD
=======
  $('#search_btn').click(event => {
    event.preventDefault();
    var query = $('#search_bar').val().trim()
    console.log(query);

    $.get('/search/' + query).then(data => {
      console.log('received')
      window.location.replace('/search/' + query)
      
    })

  });








>>>>>>> ea88eeaba0251126a1ccc718443286d74311ea60
});


// this is for login validation
//   $.get("/checklogin");