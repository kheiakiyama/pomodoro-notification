var express = require('express');
var router = express.Router();
var timer = require('../tool/pomodoro-timer');
var botMessage = require('../tool/bot-message');

/* GET home page. */
router.get('/', function (req, res) {
	res.render('index', { title: 'Express' });
});

router.post('/', function (req, res) {
	if (process.env.API_KEY !== req.params.apikey) {
		res.send('Authentication Failed');
		return;
	}
	var setting = {
		Duration: req.params.duration,
		ShortBreak: req.params.shortbreak,
		LongBreak: req.params.longbreak,
		LongBreakSpan: req.params.longbreakspan
	};
    var sendMessage = function (text) {
        console.log(text);
		botMessage({
			from: { channelId: req.params.channelId, address: req.params.from },
			to: { channelId: req.params.channelId, address: req.params.to },
			text: text,
			language: req.params.language
		}, function (error) { console.log(error); });
	};
	timer(setting, sendMessage);
	res.send('POST request to the homepage');
});

module.exports = router;