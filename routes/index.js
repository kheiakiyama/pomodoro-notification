var express = require('express');
var router = express.Router();
var timer = require('../tool/pomodoro-timer');
var botMessage = require('../tool/bot-message');

var timerStoped = new Array();

/* GET home page. */
router.get('/', function (req, res) {
    res.send('Pong');
});

router.post('/stop', function (req, res) {
    if (process.env.API_KEY !== req.body.apikey) {
        res.send('Authentication Failed');
        return;
    }
    timerStoped[req.body.id] = true;
    res.send('stoped.');
});

router.post('/', function (req, res) {
	if (process.env.API_KEY !== req.body.apikey) {
		res.send('Authentication Failed');
		return;
	}
    var timerParameter = {
        id: req.body.id,
        messageDefault: {
            from: { channelId: req.body.channelId, address: req.body.from },
            to: { channelId: req.body.channelId, address: req.body.to },
            language: req.body.language
        },
        setting: {
            Duration: req.body.duration,
            ShortBreak: req.body.shortbreak,
            LongBreak: req.body.longbreak,
            LongBreakSpan: req.body.longbreakspan
        }
    };
    timerStoped[timerParameter.id] = false;
    var sendMessage = function (text) {
        console.log(text);
        var messageParam = timerParameter.messageDefault;
		botMessage({
			from: messageParam.from,
			to: messageParam.to,
			text: text,
			language: messageParam.language
		}, function (error) { console.log(error); });
	};
    timer(timerParameter.setting, sendMessage, function () {
        return !timerStoped[timerParameter.id];
    });
	res.send('POST request to the homepage');
});

module.exports = router;