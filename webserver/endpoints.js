module.exports = (app) => {
  // REQUIERMENTS
  const { walkInFolders, getRoute } = require("./util/loadEndpoints");
  const log = require("../tools/console");
  const fs = require("fs");
  const { join } = require("path");
  const endpoints = join(__dirname, "endpoints");

  // UTIL
  let added;
  app["Routes"] = [];

  // LOAD ALL ROUTES
  for (const route of fs.readdirSync(endpoints)) {
    added = walkInFolders(join(endpoints, route), app, app.db);
  }

  // LOG
  log.success(`Successfully Added ${added} Routes to API.`);

  // ERRORS HANDLING
  require("./util/errors")(app);
};
