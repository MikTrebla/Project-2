const db = require("../models/index.js");
//const encrypt = require('../encryption.js');

const igdb = require("igdb-api-node").default;
const client = igdb("1ef55fd89628c4844a334b3bee9b4194");

module.exports = function(app) {
  app.get("/", (req, res) => {
    client
      .games(
        {
          fields: "*", // Return all fields
          limit: 10 // Limit to 5 results
          // offset: 15, // Index offset for results
        },
        ["name", "cover"]
      )
      .then(response => {
        // response.body contains the parsed JSON response to this query
        res.json(response);
      })
      .catch(error => {
        throw error;
      });
  });

  app.get("/");

  app.get("/login", (req, res) => {});

  app.get("/logout", (req, res) => {});
};
