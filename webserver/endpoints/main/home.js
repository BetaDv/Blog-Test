// SITE DATA
const serverData = require("../../../config/serverData.json");
let siteData = {
  name: serverData.name + " | Home",
  description: serverData.description,
};

module.exports = (app) => {
  return {
    route: "/",
    requestType: "get",
    execute: async (req, res) => {
      // LOAD PAGE
      res.status(200).render("home", { serverData, siteData });
    },
  };
};
