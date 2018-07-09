var path = require('path');

module.exports = function (app) {



    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, "../views"));
    });

    app.get('/user/:id', (req, res) => {
        res.sendFile(path.join(__dirname, "../views/profile"));
    });

    

}