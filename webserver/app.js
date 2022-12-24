module.exports = (db) => {
// REQUIREMENTS
const log = require("../tools/console");
const config = require("../config/webserver.json")
const express = require('express');

// START
const app = express();

// MIDDLEWARE
app.set('view engine', 'ejs');
app.use(
    express.urlencoded({
      extended: false,
      limit: "3mb",
    })
  );
  app.use(express.json());
  app.set("json spaces", 2);

// ALLOW DATABASE
app.db = db;

// LOAD ENDPOINTS
require("./endpoints")(app);


//  INITIATE
app.listen(config.port, () => {
  log.success('Server listening on port 3000');
});
}