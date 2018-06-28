const db = require('../models/index.js');
const encrypt = require('../encryption.js');




module.expoorts = function (app) {

    app.get('/', function (req, res) {
        client.games({
            fields: '*', // Return all fields
            limit: 10 // Limit to 5 results
            // offset: 15, // Index offset for results
        }, [
            "name",
            "cover"
        ]).then(response => {
            // response.body contains the parsed JSON response to this query
            res.json(response);
        }).catch(error => {
            throw error;
        });
    });

    app.get('/login', function (req, res) {

    });

    app.get('/logout', function (req, res) {

    });








}