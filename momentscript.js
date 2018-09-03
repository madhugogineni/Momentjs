var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var indicesArray = [];
var bracketValuesArray = [];
function configureBracketValues(displayOptions) {
    bracketValuesArray = [];
    indicesArray = [];
    var completeStringArray = displayOptions.split(" ");
    for (var i = 0; i < completeStringArray.length; i++) {
        if (completeStringArray[i].charAt(0) == '[' && completeStringArray[i].charAt(completeStringArray[i].length - 1) == ']') {
            bracketValuesArray.push(completeStringArray[i]);
            indicesArray.push(i);
        }
    }
    if (bracketValuesArray.length > 0) {
        for (var i = 0; i < bracketValuesArray.length; i++) {
            var myRegexp = /^\[(.*?)\]$/;
            var match = myRegexp.exec(bracketValuesArray[i]);
            bracketValuesArray[i] = match[1];
        }
    }
}
function replaceBrackets(displayOptions) {
    var completeStringArray = displayOptions.split(" ");
    for (var i = 0; i < bracketValuesArray.length; i++) {
        completeStringArray[indicesArray[i]] = bracketValuesArray[i];
    }
    return completeStringArray;
}

function quaterValue(_d) {
    var month = _d.getMonth();
    if (month <= 3)
        return 1;
    else if (month > 3 && month <= 6)
        return 2;
    else if (month > 6 && month <= 9)
        return 3;
    else
        return 4;
}
function formatMonth(_d) {
    var month = _d.getMonth();
    month = month + 1;
    if (month <= 9)
        return "0" + month;
    else
        return month;
}
function weekOfTheYear(_d) {
    var onejan = new Date(_d.getFullYear(), 0, 1);
    return Math.ceil((((new Date(_d.getFullYear(), _d.getMonth(), _d.getDate()) - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}
function formatDo(_d) {
    var date = _d.getDate();
    var remainder = Math.floor(date % 10);
    var result = "";
    if (remainder == 1)
        result = result + date.toString() + "st";
    else if (remainder == 2)
        result = result + date.toString() + "nd";
    else if (remainder == 3)
        result = result + date.toString() + "rd";
    else
        result = result + date.toString() + "th";
    return result;
}
function formatDate(_d) {
    var date = _d.getDate();
    if (date < 9)
        date = "0" + date;
    return date;
}
function formatAMPM(_d, type) {
    var hour = _d.getHours();
    var ampm = hour >= 12 ? "pm" : "am";
    if (type == "A")
        ampm = ampm.toUpperCase();
    return ampm;
}
function getUTCTime(_d) {
    var hoursToReduce = 5;
    var minutesToReduce = 30;
    var hours = _d.getHours();
    var minutes = _d.getMinutes();
    if (minutes < minutesToReduce) {
        minutesToReduce = minutesToReduce - minutes;
        hours = hours - 6;
        minutes = 60;
        minutes = minutes - minutesToReduce;
    }
    else {
        minutes = mintues - minutesToReduce;
        hours = hours - 5;
    }
    return [hours, minutes];
}
function configureHours(_d) {
    var hours = _d.getHours();
    if (hours > 12)
        return hours - 12;
    else
        return hours;
}
function formatHours(_d) {
    var hours = _d.getHours();
    if (hours < 10)
        hours = "0" + hours;
    return hours;
}
function formatMinutes(_d) {
    var minutes = _d.getMinutes();
    if (minutes < 10)
        minutes = "0" + minutes;
    return minutes;
}
function formatSeconds(_d) {
    var seconds = _d.getSeconds();
    if (seconds < 10)
        seconds = "0" + seconds;
    return seconds;
}
function configureLTS(date) {
    return formatHours(date) + ":" + formatMinutes(date, "mm") + ":" + date.getSeconds() + " " + formatAMPM(date, "A");
}
function configureLT(date) {
    return formatHours(date) + ":" + formatMinutes(date, "mm") + " " + formatAMPM(date, "A");
}
function configureL(date) {
    return formatMonth(date) + "/" + formatDate(date) + "/" + date.getFullYear();
}
function configurel(date) {
    return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
}
function configureLL(date) {
    return monthNames[date.getMonth()] + " " + formatDate(date) + ", " + date.getFullYear();
}
function configurell(date) {
    return monthNames[date.getMonth()].substring(0, 3) + " " + formatDate(date) + ", " + date.getFullYear();
}
function configureLLL(date) {
    return monthNames[date.getMonth()] + " " + formatDate(date) + ", " + date.getFullYear() + " " + formatHours(date) + ":" + date.getMinutes() + " " + formatAMPM(date, "A");
}
function configurelll(date) {
    return monthNames[date.getMonth()].substring(0, 3) + " " + formatDate(date) + ", " + date.getFullYear() + " " + formatHours(date) + ":" + date.getMinutes() + " " + formatAMPM(date, "A");
}
function configureLLLL(date) {
    return dayNames[date.getDay()] + ", " + configureLLL(date);
}
function configurellll(date) {
    return dayNames[date.getDay()].substring(0, 3) + ", " + configurelll(date);
}

var moment = function (arg1, arg2) {
    var moment = {};
    // 0 arguments
    if (arguments.length == 0) {
        moment._d = new Date();
        //milliseconds function
        moment.milliseconds = function (param1) {
            if (arguments.length == 0) {
                return "0 arguments means get function";
            }
            else if (arguments.length == 1) {
                return "1 argument means set function";
            }
        }

        //format function
        moment.format = function (pattern) {
            if (arguments.length == 1) {
                var currentYear = moment._d.getFullYear();
                var actualValues = ["YYYYYY", "YYYYY", "YYYY", "YY", "Y", "Q", "MMMM", "MMM", "MM", "M", "DD", "Do", "D", "X", "x", "gggg", "gg", "ww", "w", "dddd", "ddd", "GGGG", "GG", "WW", "W", "E", "HH", "H", "hh", "h", "kk", "k", "A", "a", "mm", "m", "ss", "s", "SSS", "ZZ", "Z", "LTS", "LT", "llll", "LLLL", "lll", "LLL", "ll", "LL", "l", "L"];
                var tempValues = ["bb/", "bc/", "bf/", "bj/", "bp/", "bq/", "pb/", "cb/", "pc/", "bv/", "cc/", "cf/", "cc/", "cj/", "cp/", "cq/", "cv/", "fb/", "fb/", "fc/", "pf/", "ff/", "fj/", "fp/", "fp/", "fq/", "fv/", "fv/", "jb/", "pj/", "jc/", "jc/", "jf/", "pp/", "jj/", "pq/", "jp/", "pv/", "jq/", "jv/", "jv/", "qc/", "qb/", "qf/", "qj/", "qp/", "qq/", "qv/", "vb/", "vc/", "vf/"];
                var finalValues = ["+00" + currentYear, "0" + currentYear, currentYear, currentYear.toString().substring(-2), currentYear, quaterValue(moment._d), monthNames[moment._d.getMonth()], monthNames[moment._d.getMonth()].substring(0, 3), formatMonth(moment._d), moment._d.getMonth(), moment._d.getDate(), formatDo(moment._d), moment._d.getDate(), moment._d.getTime() / 1000, moment._d.getTime(), currentYear, currentYear.toString().substring(-2), weekOfTheYear(moment._d), weekOfTheYear(moment._d), dayNames[moment._d.getDay()], dayNames[moment._d.getDay()].substring(0, 3), currentYear, currentYear.toString().substring(-2), weekOfTheYear(moment._d), weekOfTheYear(moment._d), moment._d.getDay(), moment._d.getHours(), moment._d.getHours(), configureHours(moment._d), configureHours(moment._d), moment._d.getHours(), moment._d.getHours(), formatAMPM(moment._d, "A"), formatAMPM(moment._d, "a"), formatMinutes(moment._d), moment._d.getMinutes(), formatSeconds(moment._d), moment._d.getSeconds(), moment._d.getMilliseconds(), "", ""];
                var finalValues1 = [configureLTS(moment._d), configureLT(moment._d), configurellll(moment._d), configureLLLL(moment._d), configurelll(moment._d), configureLLL(moment._d), configurell(moment._d), configureLL(moment._d), configurel(moment._d), configureL(moment._d)];
                configureBracketValues(pattern);

                for (var i = 0; i < actualValues.length; i++) {
                    pattern = pattern.replace(new RegExp(actualValues[i], 'g'), tempValues[i]);
                }
                for (var i = 0; i < finalValues.length; i++) {
                    pattern = pattern.replace(new RegExp(tempValues[i], 'g'), finalValues[i]);
                }

                var finalStringArray = replaceBrackets(pattern);
                pattern = finalStringArray.join(" ");

                for (var i = finalValues.length; i < (finalValues.length + finalValues1.length); i++) {
                    pattern = pattern.replace(new RegExp(tempValues[i], 'g'), finalValues1[i - finalValues.length]);
                }
                return pattern;
            } else {
                return moment._d.getFullYear() + "-" + formatMonth(moment._d) + "-" + formatDate(moment._d) + "T" + formatHours(moment._d) + ":" + formatMinutes(moment._d) + ":" + formatSeconds(moment._d) + "+05:30";
            }
        }
        //valueOf function
        moment.valueOf = function () {
            return moment._d.getTime();
        }
        //unix function
        moment.unix = function () {
            return Math.floor(moment._d.getTime() / 1000);
        }
        //toArray function
        moment.toArray = function () {
            return [moment._d.getFullYear(), moment._d.getMonth(), moment._d.getDate(), moment._d.getHours(), moment._d.getMinutes(), moment._d.getSeconds(), moment._d.getMilliseconds()];
        }
        //JSON function
        moment.toJSON = function () {
            return moment._d.getFullYear() + "-" + formatMonth(moment._d) + "-" + formatDate(moment._d) + "T" + getUTCTime(moment._d)[0] + ":" + getUTCTime(moment._d)[1] + ":" + formatSeconds(moment._d) + ".501Z";
        }
        //toObject function
        moment.toObject = function () {
            return { "years": moment._d.getFullYear(), "months": moment._d.getMonth(), "date": moment._d.getDate(), "hours": moment._d.getHours(), "minutes": moment._d.getMinutes(), "seconds": moment._d.getSeconds(), "milliseconds": moment._d.getMilliseconds() };
        }
        //toString function
        moment.toString = function () {
            return moment._d.toString().substring(0, 33);
        }
        //inspect function
        moment.inspect = function () {
            return "moment(\"" + moment._d.getFullYear() + "-" + formatMonth(moment._d) + "-" + formatDate(moment._d) + "T" + moment._d.getHours() + ":" + moment._d.getMinutes() + ":" + formatSeconds(moment._d) + ".390" + "\")";
        }
    }
    //more than 0 arguments
    else if (arguments.length == 1) {
        moment._i = null;
        //[year, month, day, hour, minute, second, millisecond]
        if (Array.isArray(arg1)) {
            moment._i = arg1;
            moment._a = [];
            var date = new Date();
            date.setFullYear(arg1[0]); moment._a[0] = arg1[0];
            date.setMonth(arg1[1] || 0); moment._a[1] = arg1[1] || 0;
            date.setDate(arg1[2] || 1); moment._a[2] = arg1[2] || 1;
            date.setHours(arg1[3] || 0); moment._a[3] = arg1[3] || 0;
            date.setMinutes(arg1[4] || 0); moment._a[4] = arg1[4] || 0;
            date.setSeconds(arg1[5] || 0); moment._a[5] = arg1[5] || 0;
            date.setMilliseconds(arg1[6] || 0); moment._a[6] = arg1[6] || 0;
            moment._d = date;
        }
        else if (typeof arg1.getMonth === 'function') {
            console.log("date parameter");
        }
        else if (!(isNaN(arg1))) {
            moment._i = arg1;
            moment.valueOf = function () {
                return moment._i;
            }
            moment.unix = function () {
                return Math.floor(moment._i / 1000);
            }
        }
        else if (typeof arg1 == 'string' || arg1 instanceof String) {
            moment._i = arg1;
            moment._f = "YYYY-MM-DD";
            moment._a = [];
            var arg1Array = arg1.split("-");
            moment._a[0] = Number(arg1Array[0]);
            moment._a[1] = Number(arg1Array[1]) || 0;
            moment._a[2] = Number(arg1Array[2]) || 1;
            moment._a[3] = Number(arg1Array[3]) || 0;
            moment._a[4] = Number(arg1Array[4]) || 0;
            moment._a[5] = Number(arg1Array[5]) || 0;
            moment._a[6] = Number(arg1Array[6]) || 0;
            //isBefore function
            moment.isBefore = function (param1, param2) {
                var tempArray = [];
                var param1Array = param1.split("-");
                tempArray[0] = Number(param1Array[0]);
                tempArray[1] = Number(param1Array[1]) || 0;
                tempArray[2] = Number(param1Array[2]) || 1;
                tempArray[3] = Number(param1Array[3]) || 0;
                tempArray[4] = Number(param1Array[4]) || 0;
                tempArray[5] = Number(param1Array[5]) || 0;
                tempArray[6] = Number(param1Array[6]) || 0;
                console.log(tempArray);
                if (moment._a[0] < tempArray[0]) {
                    return true;
                }
                else {
                    if (moment._a[1] < tempArray[1]) {
                        return true;
                    }
                    else {
                        if (moment._a[2] < tempArray[2]) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                }
            }
        }
    }
    else if (arguments.length == 2) {
        moment._i = null;
        moment._f = null;
        console.log("2 arguments");
    }
    return moment;
}
// duration function
moment.duration = function (arg1, arg2) {
    var moment = {};
    moment._milliseconds = 0;
    moment._days = 0;
    moment._months = 0;
    moment._data = { milliseconds: 0, seconds: 0, minutes: 0, hours: 0, days: 0, months: 0, years: 0 };
    // one argument
    if (arguments.length == 1) {
        if (typeof arg1 == 'string' || arg1 instanceof String) {
            if (arg1.indexOf(".") > -1) {
                var DaysAndTimeArray = arg1.split(".");
                var TimeArray = DaysAndTimeArray[1].split(":");
                moment._data.days = Number(DaysAndTimeArray[0]);
                moment._data.hours = Number(TimeArray[0]);
                moment._data.minutes = Number(TimeArray[1]);
                moment._data.seconds = Number(TimeArray[2]);
                moment._days = Number(DaysAndTimeArray[0]);
                moment._milliseconds = Number(((moment._data.hours * 60 + moment._data.minutes) * 60 + moment._data.seconds) * 1000);
            }
            else {
                var TimeArray = arg1.split(":");
                moment._data.hours = Number(TimeArray[0]);
                moment._data.minutes = Number(TimeArray[1]);
                moment._data.seconds = Number(TimeArray[2]);
                moment._milliseconds = Number(((moment._data.hours * 60 + moment._data.minutes) * 60 + moment._data.seconds) * 1000);
            }
        }
        else if (!(isNaN(arg1))) {
            moment._data.milliseconds = arg1;
            var tempTime = Math.floor(arg1 / 1000);
            console.log("temptime = " + tempTime);
            moment._milliseconds = arg1;
            console.log("data milliseconds = " + Math.ceil(arg1 % 1000));
            moment._data.milliseconds = Math.ceil((arg1 % 1000) * 1000);
            if (tempTime >= 31536000) {
                moment._data.years = Math.floor(tempTime / 31536000);
                tempTime = tempTime % 31536000;
                console.log("remaining time = " + tempTime);
            }
            if (tempTime < 31536000 && tempTime >= 2628000) {
                console.log("less than an year but more than a month");
                moment._data.months = Math.floor(tempTime / 2628000);
                console.log("months = " + moment._data.months);
                tempTime = tempTime % 2628000;
                console.log("remaining time = " + tempTime);
            }
            if (tempTime < 2628003 && tempTime >= 86400) {
                console.log(Math.floor(tempTime / 86400));
                moment._data.days = Math.floor(tempTime / 86400);
                tempTime = tempTime % 86400;
            }
            if (tempTime < 86400 && tempTime >= 3600) {
                console.log("hours = " + Math.floor(tempTime / 3600));
                moment._data.hours = Math.floor(tempTime / 3600);
                tempTime = tempTime % 3600;
            }
            if (tempTime < 3600 && tempTime >= 60) {
                console.log("minutes = " + Math.floor(tempTime / 60));
                moment._data.minutes = Math.floor(tempTime / 60);
                tempTime = tempTime % 60;
            }
            moment._data.seconds = tempTime;
        }
        //if the parameter sent is of the type object
        else if (typeof arg1 === 'object' || arg1 instanceof Object) {
            moment._data.milliseconds = arg1.milliseconds || 0;
            moment._data.seconds = arg1.seconds || 0;
            moment._data.minutes = arg1.minutes || 0;
            moment._data.hours = arg1.hours || 0;
            moment._data.days = arg1.days || 0;
            moment._data.days = moment._data.days + (arg1.weeks * 7 || 0);
            moment._data.months = arg1.months || 0;
            moment._data.years = arg1.years || 0;
            moment._milliseconds = (arg1.milliseconds || 0) + (arg1.seconds * 1000 || 0) + (arg1.minutes * 60 * 1000 || 0) + (arg1.hours * 3600 * 1000 || 0);
            moment._days = (arg1.days || 0) + (arg1.weeks * 7 || 0);
            moment._months = (arg1.months || 0) + (arg1.years * 12 || 0);
        }
    }
    //2 arguments
    else if (arguments.length == 2) {
        if (!(isNaN(arg1)) && (typeof arg2 === 'string' || arg2 instanceof String)) {

            switch (arg2) {
                case "milliseconds":
                case "ms": {
                    moment._data.milliseconds = arg1;
                    moment._milliseconds = arg1;
                    break;
                }
                case "seconds":
                case "s": {
                    moment._data.seconds = arg1;
                    moment._milliseconds = arg1 * 1000;
                    break;
                }
                case "minutes":
                case "m": {
                    console.log("welcome1");
                    moment._data.minutes = arg1;
                    moment._milliseconds = arg1 * 1000 * 60;
                    break;
                }
                case "hours":
                case "h": {
                    moment._data.hours = arg1;
                    moment._milliseconds = arg1 * 1000 * 60 * 60;
                    break;
                }
                case "days":
                case "d": {
                    moment._data.days = arg1;
                    moment._days = arg1;
                    break;
                }
                case "weeks":
                case "w": {
                    moment._data.days = arg1 * 7;
                    moment.days = arg1 * 7;
                    break;
                }
                case "months":
                case "M": {
                    moment._data.months = arg1;
                    moment._months = arg1;
                    break;
                }
                case "years":
                case "y": {
                    moment._data.years = arg1;
                    moment._months = arg1 * 12;
                    break;
                }
            }//switch statement end

        }//if statement to check the arguments passed
    }
    //duration.clone function
    moment.clone = function () {
        return moment;
    }
    //duration.humanize function
    moment.humanize = function () {
        var humanizeResult;
        if (arguments.length == 1) {
            if (moment._data.years != 0) {

                if (moment._data.years > 0) {
                    if (moment._data.years == 1) {
                        return "in a year";
                    }
                    return "in " + moment._data.years + " years";
                }
                else {
                    if (moment._data.years == -1) {
                        return "a year ago";
                    }
                    return Math.abs(moment._data.years) + " years ago";
                }
            }
            else if (moment._data.months != 0) {

                if (moment._data.months > 0) {
                    if (moment._data.months == 1) {
                        return "in a month";
                    }
                    return "in " + moment._data.months + " months";
                }
                else {
                    if (moment._data.months == -1) {
                        return "a month ago";
                    }
                    return Math.abs(moment._data.months) + " months ago";
                }
            }
            else if (moment._data.days != 0) {

                if (moment._data.days > 0) {
                    if (moment._data.days == 1) {
                        return "in a day";
                    }
                    return "in " + moment._data.days + " days";
                }
                else {
                    if (moment._data.days == -1) {
                        return "a day ago";
                    }
                    return Math.abs(moment._data.days) + " days ago";
                }

            }
            else if (moment._data.hours != 0) {

                if (moment._data.hours > 0) {
                    if (moment._data.hours == 1) {
                        return "in a hour";
                    }
                    return "in " + moment._data.hours + " hours";
                }
                else {
                    if (moment._data.hours == -1) {
                        return "a hour ago";
                    }
                    return Math.abs(moment._data.hours) + " hours ago";
                }
            }
            else if (moment._data.minutes != 0) {

                if (moment._data.minutes > 0) {
                    if (moment._data.minutes == 1) {
                        return "in a minute";
                    }
                    return "in " + moment._data.minutes + " mintues";
                }
                else {
                    if (moment._data.minutes == -1) {
                        return "a minute ago";
                    }
                    return Math.abs(moment._data.minutes) + " mintues ago";
                }

            }
            else if (moment._data.seconds != 0) {

                if (moment._data.seconds > 0) {
                    return " in a few seconds";
                }
                else {
                    return "a few seconds ago";
                }
            }
            else if (moment._data.milliseconds != 0) {
                if (moment._data.milliseconds > 0) {
                    return " in a few seconds";
                }
                else {
                    return "a few seconds ago";
                }
            }
        }//arguments = 1 loop
        else if (arguments.length == 0) {
            if (moment._data.years != 0) {

                if (moment._data.years > 0) {
                    if (moment._data.years == 1) {
                        return "a year";
                    }
                    return moment._data.years + " years";
                }
                else {
                    if (moment._data.years == -1) {
                        return "a year";
                    }
                    return Math.abs(moment._data.years) + " years";
                }
            }
            else if (moment._data.months != 0) {

                if (moment._data.months > 0) {
                    if (moment._data.months == 1) {
                        return "a month";
                    }
                    return moment._data.months + " months";
                }
                else {
                    if (moment._data.months == -1) {
                        return "a month";
                    }
                    return Math.abs(moment._data.months) + " months";
                }
            }
            else if (moment._data.days != 0) {

                if (moment._data.days > 0) {
                    if (moment._data.days == 1) {
                        return "a day";
                    }
                    return moment._data.days + " days";
                }
                else {
                    if (moment._data.days == -1) {
                        return "a day";
                    }
                    return Math.abs(moment._data.days) + " days";
                }

            }
            else if (moment._data.hours != 0) {

                if (moment._data.hours > 0) {
                    if (moment._data.hours == 1) {
                        return "a hour";
                    }
                    return moment._data.hours + " hours";
                }
                else {
                    if (moment._data.hours == -1) {
                        return "a hour";
                    }
                    return Math.abs(moment._data.hours) + " hours";
                }
            }
            else if (moment._data.minutes != 0) {

                if (moment._data.minutes > 0) {
                    if (moment._data.minutes == 1) {
                        return "a minute";
                    }
                    return moment._data.minutes + " mintues";
                }
                else {
                    if (moment._data.minutes == -1) {
                        return "a minute";
                    }
                    return Math.abs(moment._data.minutes) + " mintues";
                }

            }
            else if (moment._data.seconds != 0) {

                if (moment._data.seconds > 0) {
                    return " in a few seconds";
                }
                else {
                    return "a few seconds ago";
                }
            }
            else if (moment._data.milliseconds != 0) {
                if (moment._data.milliseconds > 0) {
                    return " in a few seconds";
                }
                else {
                    return "a few seconds ago";
                }
            }
        }
    }//humanize function
    //duration.milliseconds function
    moment.milliseconds = function () {
        return (moment._data.milliseconds + moment._data.seconds * 1000 + moment._data.minutes * 60000 + moment._data.hours * 3600000 + moment._data.days * 86400000 + moment._data.months * 2592000000 + moment._data.years * 31536000000) % 1000;
    }
    //duration.asMilliseconds function
    moment.asMilliseconds = function () {
        console.log(moment._data);
        return moment._data.milliseconds + moment._data.seconds * 1000 + moment._data.minutes * 60000 + moment._data.hours * 3600000 + moment._data.days * 86400000 + moment._data.months * 2592000000 + moment._data.years * 31536000000;
    }
    moment.seconds = function () {
        return Math.floor((moment._data.milliseconds + moment._data.seconds * 1000 + moment._data.minutes * 60000 + moment._data.hours * 3600000 + moment._data.days * 86400000 + moment._data.months * 2592000000 + moment._data.years * 31536000000) / 1000);
    }
    moment.asSeconds = function () {
        return (moment._data.milliseconds + moment._data.seconds * 1000 + moment._data.minutes * 60000 + moment._data.hours * 3600000 + moment._data.days * 86400000 + moment._data.months * 2592000000 + moment._data.years * 31536000000) / 1000;
    }
    moment.minutes = function () {
        return Math.floor((moment._data.milliseconds + moment._data.seconds * 1000 + moment._data.minutes * 60000 + moment._data.hours * 3600000 + moment._data.days * 86400000 + moment._data.months * 2592000000 + moment._data.years * 31536000000) % (1000 * 60));
    }
    moment.asMinutes = function () {
        return (moment._data.milliseconds + moment._data.seconds * 1000 + moment._data.minutes * 60000 + moment._data.hours * 3600000 + moment._data.days * 86400000 + moment._data.months * 2592000000 + moment._data.years * 31536000000) / (1000 * 60);
    }
    moment.hours = function () {
        return (moment._data.milliseconds + moment._data.seconds * 1000 + moment._data.minutes * 60000 + moment._data.hours * 3600000 + moment._data.days * 86400000 + moment._data.months * 2592000000 + moment._data.years * 31536000000) % (1000 * 60 * 60);
    }
    moment.asHours = function () {
        return (moment._data.milliseconds + moment._data.seconds * 1000 + moment._data.minutes * 60000 + moment._data.hours * 3600000 + moment._data.days * 86400000 + moment._data.months * 2592000000 + moment._data.years * 31536000000) / (1000 * 60 * 60);
    }
    moment.days = function () {
        return (moment._data.milliseconds + moment._data.seconds * 1000 + moment._data.minutes * 60000 + moment._data.hours * 3600000 + moment._data.days * 86400000 + moment._data.months * 2592000000 + moment._data.years * 31536000000) % (1000 * 60 * 60 * 24);
    }
    moment.asDays = function () {
        return (moment._data.milliseconds + moment._data.seconds * 1000 + moment._data.minutes * 60000 + moment._data.hours * 3600000 + moment._data.days * 86400000 + moment._data.months * 2592000000 + moment._data.years * 31536000000) / (1000 * 60 * 60 * 24);
    }
    moment.weeks = function () {
        return Math.floor(((moment._data.milliseconds + moment._data.seconds * 1000 + moment._data.minutes * 60000 + moment._data.hours * 3600000 + moment._data.days * 86400000 + moment._data.months * 2592000000 + moment._data.years * 31536000000) % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24 * 7));
    }
    moment.asWeeks = function () {
        return (moment._data.milliseconds + moment._data.seconds * 1000 + moment._data.minutes * 60000 + moment._data.hours * 3600000 + moment._data.days * 86400000 + moment._data.months * 2592000000 + moment._data.years * 31536000000) / (1000 * 60 * 60 * 24 * 7);
    }
    moment.months = function () {
        return (moment._data.milliseconds + moment._data.seconds * 1000 + moment._data.minutes * 60000 + moment._data.hours * 3600000 + moment._data.days * 86400000 + moment._data.months * 2592000000 + moment._data.years * 31536000000) % (2592000000);
    }
    moment.asMonths = function () {
        return (moment._data.milliseconds + moment._data.seconds * 1000 + moment._data.minutes * 60000 + moment._data.hours * 3600000 + moment._data.days * 86400000 + moment._data.months * 2592000000 + moment._data.years * 31536000000) / (2592000000);
    }
    moment.years = function () {
        var temp = (moment._data.milliseconds + moment._data.seconds * 1000 + moment._data.minutes * 60000 + moment._data.hours * 3600000 + moment._data.days * 86400000 + moment._data.months * 2592000000 + moment._data.years * 31536000000) % (31536000000);
        if (temp < 1) {
            return 0;
        }
        else return temp;
    }
    moment.asYears = function () {
        return (moment._data.milliseconds + moment._data.seconds * 1000 + moment._data.minutes * 60000 + moment._data.hours * 3600000 + moment._data.days * 86400000 + moment._data.months * 2592000000 + moment._data.years * 31536000000) / (31536000000);
    }
    return moment;
}