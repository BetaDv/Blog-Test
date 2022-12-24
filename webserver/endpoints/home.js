// SITE DATA
const sd = require("../../config/siteData.json");
let siteData = { name: sd.name + " | Home", description: sd.description };

module.exports = (app) => {
	return {
        route: "/",
		requestType: "get",
		execute: async (req, res) => {
            // LOAD PAGE
			res.status(200).render("home", { siteData })
		}
	}
}
