import express from 'express';
import fs from 'fs';
import os from 'os';
import path from 'path';

/**
 * CONSTANTS
 */
const PORT = 80;
const LOG_FILE_LOCATION = "./log.txt"
/**
 * END CONSTANTS
 */


const app = express();

// Create the logfile if it doesn't exist
const logFile = path.resolve(process.cwd(), LOG_FILE_LOCATION);
if (!fs.existsSync(logFile)) {
	fs.writeFileSync(logFile, "", "utf-8");
}

// log arbitrary data to a file
const logMessageWithDatetime = (url: string, data: any) => {
	const toLog = {
		url,
		data,
	}

	// Convert the body to a nice-looking JSON string
	const prettyLogString = JSON.stringify(toLog, null, 4);

	// Append it to the log file
	fs.appendFileSync(logFile, (new Date()).toString());
	fs.appendFileSync(logFile, os.EOL);
	fs.appendFileSync(logFile, prettyLogString);
	fs.appendFileSync(logFile, os.EOL);
}

// Register this server to listen for post requests at /some/url/goes/here
app.post("/some/url/goes/here", (request, response) => {
	logMessageWithDatetime(request.url, request.body);

	response.status(200).send({
		message: "return some data here"
	})
});

// Start the server
const server = app.listen(PORT);

logMessageWithDatetime("---------SERVER STARTING---------", {});

// Grab all the layers from express's stack and remove the ones that don't have routes, then get the routes
const registeredRoutes = app._router.stack
	.map(layer => layer.route)
	.filter(a => !!a);
	
console.log(`Currently listening on port ${PORT} at the following routes:`, registeredRoutes);

// Stop the server if this script ends
process.on("SIGINT", () => {
	server.close();
	console.log("\r\nStopping server.");
	logMessageWithDatetime("---------SERVER STOPPING---------", {});
});
