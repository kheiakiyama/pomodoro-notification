var timer = function (setting, sendMessage, isContinue) {
    var count = 0;
    var msg = "";
    var stockMessage = function (text) {
        if (msg !== "") {
            msg += "\n\n";
        }
        msg += setting.Name + ": " + text;
    };
    var postMessage = function () {
        if (!isContinue())
            return;
        sendMessage(msg);
        msg = "";
    };
	var startPomodoro = function () {
        count++;
        if (!isContinue())
            return;
        stockMessage(count + " pomodoro start.");
        postMessage();
		setTimeout(function () {
            stockMessage(count + " pomodoro is end.");
            var time, message;
			if (count % setting.LongBreakSpan == 0) {
				longBreak();
			} else {
				shortBreak();
			}
		}, minutesToMillSecond(setting.Duration));
	};
	var shortBreak = function () {
        if (!isContinue())
            return;
        stockMessage(setting.ShortBreak + " minutes short break start.");
        postMessage();
        setTimeout(function () {
            stockMessage("short break is end.");
			startPomodoro();
		}, minutesToMillSecond(setting.ShortBreak));
	};
	var longBreak = function () {
        if (!isContinue())
            return;
        stockMessage(setting.LongBreak + " minutes long break start.");
        postMessage();
        setTimeout(function () {
            stockMessage("long break is end.");
			startPomodoro();
		}, minutesToMillSecond(setting.LongBreak));
	};
	var minutesToMillSecond = function (minutes) { 
		return minutes * 60 * 1000;
	};
	startPomodoro();
};

module.exports = timer;