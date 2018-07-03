const db = require("../models/index.js");
const encrypt = require("../encryption.js");
const igdb = require("igdb-api-node").default;
const client = igdb("1ef55fd89628c4844a334b3bee9b4194");

var user = require("../models/user.js");

module.exports = function (app) {
    //
    app.get("/", (req, res) => {
        client
            .games({
                fields: "name", // Return all fields
                limit: 5, // Limit to 5 results
                offset: 15, // Index offset for results
                search: "halo"
            }, ["name", "release_dates.date", "rating", "cover"])
            .then(response => {
                // response.body contains the parsed JSON response to this query
                res.render("index");
                //res.render('index', response);
            })
            .catch(error => {
                throw error;
            });
    });


    app.get("/user/:screen_name", (req, res) => {
        db.User.findOne({
            where: {
                screen_name: req.params.screen_name
            }
        }).then(data => {
            var userInfo = data.dataValues;
            //    console.log(data);
            //    console.log(data.dataValues);
            //    res.json(userInfo);
            res.render("profile", userInfo);
        });
    });

    app.get("/user/:screen_name", (req, res) => {
        db.User.findOne({
            where: {
                screen_name: req.params.screen_name
            },
            //   include: [db.Post
            // { model: db.user2game, include: [{ model: db.game }] }
            //   ]
        }).then(data => {
            var userInfo = data.dataValues;
            //    console.log(data);
            //    console.log(data.dataValues);
            // res.json(userInfo);
            res.render("profile", userInfo);
        });
    });

    app.get('/profile:', (req, res) => {
        // if (req.session) {
        res.render('profile');
        // } else {
        //     res.render('signin');
        // }
    })


    app.get("/signin", (req, res) => {
        res.render("signin");
    });

    app.post('/signin', (req, res) => {
        console.log(req.session)

        db.User.findOne({
            where: {
                screen_name: req.body.screen_name,
            }
        }).then(results => {
            if (results.screen_name === req.body.screen_name && encrypt.decrypt(results.password) === req.body.password) {
                var token = 't' + Math.random();
                results.token = token;
                res.cookie('token', token);
                req.session.user = results;
                results.update({
                    token: token,
                    where: {
                        screen_name: req.body.screen_name
                    },
                }).then(data => {
                    return res.render('profile', data.dataValues)
                });

            } else {
                return res.send('Sorry, account was not found.')
            }
        })
    });

    app.get("/register", (req, res) => {
        res.render("register");
    });

    app.post("/register", (req, res) => {
        db.User.findOne({
            where: {
                screen_name: req.body.screen_name
            }
        }).then(result => {
            if (result) {
                return res.send(
                    "Sorry, this username is already taken! Please choose another."
                );
            } else if (req.body.image === "") {
                db.User.create({
                        screen_name: req.body.screen_name,
                        password: encrypt.encrypt(req.body.password),
                        routeName: req.body.screen_name.replace(/\s+/g, "").toLowerCase()
                    })
                    .then(response => {
                        res.json(response);
                    })
                    .catch(error => {
                        res.json(error);
                    });
            } else {
                db.User.create({
                        screen_name: req.body.screen_name,
                        password: encrypt.encrypt(req.body.password),
                        routeName: req.body.screen_name.replace(/\s+/g, "").toLowerCase(),
                        image: req.body.image
                    })
                    .then(response => {
                        res.json(response);
                    })
                    .catch(error => {
                        res.json(error);
                    });
            }
        });
    });

    app.get('/searchresults', (req, res) => {
        res.render('search')
    })

    // populate search results
    app.get('/search/:query', (req, res) => {
        console.log('hello');
        client.games({
                limit: 10,
                search: req.params.query
            }, [
                "name",
                'cover',
                'release_dates.date'
            ])
            .then(response => {
                // console.log(response);
                // var d = new Date(response.body[0].release_dates[0].date)
                // d.toISOString();

                // var day = d.toISOString();
                // newDay = day.slice(0, 10);
                var body = response.body;
                var games = [];
                for (var i = 0; i < body.length; i++) {
                    var gameObj = {
                        id: body[i].id,
                        name: body[i].name,
                        cover: body[i].cover.url
                    }
                    games.push(gameObj);
                }
                console.log(games);
                res.render('search', games);

            }).catch(error => {
                throw error;
            });
    })


    //to populate reviews per game
    // app.post('/game/:game/reviews', (req, res) => {

    // })

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



    // app.get('/logout', (req, res) => {
    //     res.render('index')
    // });


}