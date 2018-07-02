$(document).ready(() => {
  console.log("ready!");

  $("#register").click(event => {

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

    $.post("/register", user).then(data => {
      console.log("add user", data);
      window.location.replace("/login");
    });
  });

  $("#signin").click(event => {
    event.preventDefault();
    var user = {
      screen_name: $("#screen_name").val().trim(),
      password: $("#password").val().trim()
    };

    $.post("/signin", user);
  });

});


// this is for login validation
//   $.get("/checklogin");