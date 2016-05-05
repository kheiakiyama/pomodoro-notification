var timer = function (setting, sendMessage, isContinue) {
	var count = 0;	
	var startPomodoro = function () {
        count++;
        if (!isContinue())
            return;
		sendMessage(count + " pomodoro start.");
		setTimeout(function () {
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
		sendMessage(count + " pomodoro is end. rest " + setting.ShortBreak + " minutes of short break.");
		setTimeout(function () {
			sendMessage("short break is end.");
			startPomodoro();
		}, minutesToMillSecond(setting.LongBreak));
	};
	var longBreak = function () {
        if (!isContinue())
            return;
		sendMessage(count + " pomodoro is end. rest " + setting.LongBreak + " minutes of long break.");
		setTimeout(function () {
			sendMessage("long break is end.");
			startPomodoro();
		}, minutesToMillSecond(setting.LongBreak));
	};
	var minutesToMillSecond = function (minutes) { 
		return minutes * 1000;
	};
	startPomodoro();
};

module.exports = timer;