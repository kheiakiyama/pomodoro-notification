var express = require('express');
var router = express.Router();
var timer = require('../tool/pomodoro-timer');
var botMessage = require('../tool/bot-message');

/* GET home page. */
router.get('/', function (req, res) {
	res.render('index', { title: 'Express' });
});

router.post('/', function (req, res) {
	if (process.env.API_KEY !== req.body.apikey) {
		res.send('Authentication Failed');
		return;
	}
	var setting = {
		Duration: req.body.duration,
		ShortBreak: req.body.shortbreak,
		LongBreak: req.body.longbreak,
		LongBreakSpan: req.body.longbreakspan
	};
    var sendMessage = function (text) {
        console.log(text);
		botMessage({
			from: { channelId: req.body.channelId, address: req.body.from },
			to: { channelId: req.body.channelId, address: req.body.to },
			text: text,
			language: req.body.language
		}, function (error) { console.log(error); });
	};
	timer(setting, sendMessage);
	res.send('POST request to the homepage');
});

module.exports = router;