var restify = require('restify');
var msRest = require('ms-rest');
var connector = require('botconnector');

// Initialize credentials for connecting to Bot Connector Service
var appId = process.env.appId || 'your appId';
var appSecret = process.env.appSecret || 'your appSecret';
var credentials = new msRest.BasicAuthenticationCredentials(appId, appSecret);
var client = new connector(credentials);
var options = { customHeaders: { 'Ocp-Apim-Subscription-Key': credentials.password } };

// Helper function to send a Bot originated message to the user. 
module.exports = function (msg, cb) {
	client.messages.sendMessage(msg, options, function (err, result, request, response) {
		if (!err && response && response.statusCode >= 400) {
			err = new Error('Message rejected with "' + response.statusMessage + '"');
		}
		if (cb && err !== null) {
			cb(err);
		}
	});
};