﻿var express = require('express');
var router = express.Router();
var timer = require('../tool/pomodoro-timer');
var botMessage = require('../tool/bot-message');

var runningTimers = new Array();

var broardCastNews = function (text) {
    for (var key in runningTimers) {
        if (!runningTimers[key].isRunning) { continue; }
        var messageParam = runningTimers[key].messageDefault;
        botMessage({
            from: messageParam.from,
            to: messageParam.to,
            text: text,
            language: messageParam.language
        }, function (error) { console.log(error); });
    }
};

process.on('SIGTERM', function () {
    broardCastNews('This service shutdown by heroku.\n\nPlease restart.');
});

router.get('/', function (req, res) {
    res.send('Pong');
});

router.post('/stop', function (req, res) {
    if (process.env.API_KEY !== req.body.apikey) {
        res.send('Authentication Failed');
        return;
    }
    runningTimers[req.body.id].isRunning = false;
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
            Name: req.body.name,
            Duration: req.body.duration,
            ShortBreak: req.body.shortbreak,
            LongBreak: req.body.longbreak,
            LongBreakSpan: req.body.longbreakspan
        },
        isRunning: true
    };
    runningTimers[timerParameter.id] = timerParameter;
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
        var res = runningTimers[timerParameter.id] ? runningTimers[timerParameter.id].isRunning: false;
        if (!res) {
            delete runningTimers[timerParameter.id];
        }
        return res;
    });
	res.send('POST request to the homepage');
});

module.exports = router;