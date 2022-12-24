const fs = require("fs");
const { join } = require("path");
const log = require("../../tools/console");
const endpoints = join(__dirname, "..", "endpoints");

const rootPath = endpoints.split("/").length;

const getRoute = (path) => {
	const pathStaged = path.split("/").splice(rootPath).join("/").replace(".js", "");
	return "/" + pathStaged
};

let added = 0;
const walkInFolders = (path, app, database) => {
	const stat = fs.statSync(path);
	if (stat.isDirectory() === true) {
		const dir = fs.readdirSync(path);
		for (const e of dir) {
			walkInFolders(join(path, e), app, database);
		}
	}
	if (stat.isFile() && path.endsWith(".js")) {
		const routePath = require(path)(app).route; // can also use: getRoute(path)
		app["Routes"].push(routePath);
		const data = require(path)(app, database);

		app[data.requestType](routePath, async (req, res) => {

			return data.execute(req, res);
		});

		log.verbose(`Added Route '${routePath}'`);
		added++;
	}

	return added;
};



module.exports = {
	getRoute,
	walkInFolders,
};
