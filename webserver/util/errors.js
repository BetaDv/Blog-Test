// REQUIREMENTS
const serverData = require("../../config/serverData.json"); 

module.exports = (app) => {
    // HANDLE REQUESTS
    app.get("*", (req, res) => {
        let siteData = {};
        let errorData = {};

      if (!res.headersSent) {
        // DATA SENT
        siteData.name = serverData.name + " | Page not Found";
        siteData.errorCode = 404;

        errorData.code = 404;
        errorData.short = "Page not Found"
        errorData.message = "The page you requested could not be found, perhaps you made a typo?"

        // SEND DATA
        res.status(errorData.code)
        res.render("other/errors", { serverData, siteData, errorData })
      }
    });
}