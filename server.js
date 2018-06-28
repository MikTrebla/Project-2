//Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');


const app = express();
const PORT = process.env.PORT || 8080;

const db = require('./models');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Static directory
app.use(express.static('public'));


//Routes
require('./routes/api-routes.js')(app);
require('./routes/html-routes.js')(app);




db.sequelize.sync({
    force: true
}).then(function () {
    app.listen(PORT, function () {
        console.log('App listening on PORT ' + PORT)
    });
});