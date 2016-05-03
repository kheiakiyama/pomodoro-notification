var express = require('express');
var router = express.Router();
var timer = require('../tool/pomodoro-timer');
var botMessage = require('../tool/bot-message');

/* GET home page. */
router.get('/', function (req, res) {
	res.render('index', { title: 'Express' });
});

router.post('/', function (req, res) {
	var apiKey = req.param('apikey');
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
			from: { channelId: 'slack', address: 'U14PD4FPF' },
			to: { channelId: 'slack', address: 'U0B3WGWTV' },
			text: text,
			language: 'ja'
		}, function (error) { console.log(error); });
	};
	timer(setting, sendMessage);
	res.send('POST request to the homepage');
});

module.exports = router;