var express = require('express');
var router = express.Router();
var timer = require('../tool/pomodoro-timer');
var botMessage = require('../tool/bot-message');

/* GET home page. */
router.get('/', function (req, res) {
	var setting = {
		Duration: 20,
		ShortBreak: 5,
		LongBreak: 20,
		LongBreakSpan: 4
	};
	var sendMessage = function (text) {
		console.log(text);
	};
	timer(setting, sendMessage);
	res.render('index', { title: 'Express' });
});

router.post('/', function (req, res) {
	console.log(process.env.API_KEY);
	var apiKey = req.param('apikey');
	console.log(apiKey);
	if (process.env.API_KEY !== apiKey) {
		res.send('Authentication Failed');
		return;
	}
	var key = req.param('key');
	var setting = {
		Duration: 20,
		ShortBreak: 5,
		LongBreak: 20,
		LongBreakSpan: 4
	};
	var sendMessage = function (text) {
		console.log(text);
		botMessage({
			from: { channelid: 'slack', address: 'U14PD4FPF' },
			to: { channelid: 'slack', address: 'U0B3WGWTV' },
			text: text,
			language: 'ja'
		});
	};
	timer(setting, sendMessage);
	res.send('POST request to the homepage');
});

module.exports = router;