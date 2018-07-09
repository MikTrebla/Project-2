//Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const exphbs = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 8080;

const db = require("./models");

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(
  session({
    secret: "whateverWeWant", 
    resave: false, 
    saveUninitialized: true, //
    cookie: {
      secure: "auto",
      maxAge: 9999999
    }
  })
);

app.use(express.static("public"));

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

db.sequelize
  .sync({
    force: false
  })
  .then(function () {
    app.listen(PORT, function () {
      console.log("App listening on PORT " + PORT);
    });
  });