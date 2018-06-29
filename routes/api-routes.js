const db = require('../models/index.js');
const encrypt = require('../encryption.js');

const igdb = require('igdb-api-node').default;
const client = igdb('1ef55fd89628c4844a334b3bee9b4194');


module.exports = function (app) {
//
    app.get('/', (req, res) => {
        client.games({
                fields: 'name', // Return all fields
                limit: 5, // Limit to 5 results
                offset: 15, // Index offset for results
                search: "halo"

            }, [
                "name",
                "release_dates.date",
                "rating",
                "cover"
            ])
            .then(response => {
                // response.body contains the parsed JSON response to this query
                res.json(response);
                //res.render('index', response);
            }).catch(error => {
                throw error;
            });
    });

    // app.get('/api/user/:id', (req, res) => {

    // });

    // app.get('/api/game/:id', (req, res) => {

    // });

    // app.get('/api/review/:id', (req, res) => {

    // });

    // app.post('/api/reviews', (req, res) => {

    // });

    app.post('/login', (req, res) => {
        var userPW = db.User.password;
        var decryptPW = encrypt.decrypt(userPW);

        db.User.findOne({
            where: {
                screen_name: req.body.screen_name,
                password: req.body.password
            }
        }).then((results) => {
            if (results.screen_name === req.body.screen_name && encrypt.decrypt(results.password) === req.body.password) {
                var token = 't' + Math.random();
                db.User[i].token = token;
                res.cookie('token', token);
                req.session.user = results.User;
                return res.render('profile', results)

            } else {
                return res.send('Sorry, account was not found.')
            }
        })
    });

    //////////check if user is logged into current session when attempting to submit reviews//////////

    // app.get('/checklogin', (req, res) => { 
    //     if (req.session.user) {
    //         res.send(`Oh hi, it's ${req.session.user.name} again!`)
    //     } else {
    //         res.redirect('/login');
    //     }
    // });

    //////////////////////////////////////////////////////////////////////////////////////////////////


    // app.get('/logout', (req, res) => {

    // });

    app.post('/register', (req, res) => {
        db.User.findOne({
            where: {
                username: req.body.username
            }
        }).then((result) => {
            if (result.username) {
                return res.send('Sorry, this username is already taken! Please choose another.')
            } else {
                db.User.create({
                    screen_name: req.body.screen_name,
                    password: encrypt.encrypt(req.body.password),
                    routeName: req.body.screen_name.replace(/\s+/g, "").toLowerCase(),
                    image: req.body.image
                }).then((response) => {
                    res.json(response);
                }).catch((error) => {
                    res.json(error);
                })
            };
        });
    });







}
