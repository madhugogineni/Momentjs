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
        moment.millisecond = function (param1) {
            if (arguments.length == 0) {
                return moment._d.getMilliseconds();
            }
            else if (arguments.length == 1) {
                moment._d.setMilliseconds(param1);
                return moment;
            }
        }
        moment.milliseconds = function (param1) {
            if (arguments.length == 0) {
                return moment._d.getMilliseconds();
            }
            else if (arguments.length == 1) {
                moment._d.setMilliseconds(param1);
                return moment;
            }
        }
        moment.second = function (param1) {
            if (arguments.length == 0) {
                return moment._d.getSeconds();
            }
            else if (arguments.length == 1) {
                moment._d.setSeconds(param1);
                return moment;
            }
        }
        moment.seconds = function (param1) {
            if (arguments.length == 0) {
                return moment._d.getSeconds();
            }
            else if (arguments.length == 1) {
                moment._d.setSeconds(param1);
                return moment;
            }
        }
        moment.minute = function (param1) {
            if (arguments.length == 0) {
                return moment._d.getMinutes();
            }
            else if (arguments.length == 1) {
                moment._d.setMinutes(param1);
                return moment;
            }
        }
        moment.minutes = function (param1) {
            if (arguments.length == 0) {
                return moment._d.getMinutes();
            }
            else if (arguments.length == 1) {
                moment._d.setMinutes(param1);
                return moment;
            }
        }
        moment.hour = function (param1) {
            if (arguments.length == 0) {
                return moment._d.getHours();
            }
            else if (arguments.length == 1) {
                moment._d.setHours(param1);
                return moment;
            }
        }
        moment.hours = function (param1) {
            if (arguments.length == 0) {
                return moment._d.getHours();
            }
            else if (arguments.length == 1) {
                moment._d.setHours(param1);
                return moment;
            }
        }
        moment.date = function (param1) {
            if (arguments.length == 0) {
                return moment._d.getDate();
            }
            else if (arguments.length == 1) {
                moment._d.setDate(param1);
                return moment;
            }
        }
        moment.dates = function (param1) {
            if (arguments.length == 0) {
                return moment._d.getDate();
            }
            else if (arguments.length == 1) {
                moment._d.setDate(param1);
                return moment;
            }
        }
        moment.day = function (param1) {
            if (arguments.length == 0) {
                return moment._d.getDay();
            }
            else if (arguments.length == 1) {
                moment._d.setDate(moment._d.getDate() + param1 - 1);
                return moment;
            }
        }
        moment.days = function (param1) {
            if (arguments.length == 0) {
                return moment._d.getDay();
            }
            else if (arguments.length == 1) {
                moment._d.setDate(moment._d.getDate() + param1 - 1);
                return moment;
            }
        }
        moment.weekday = function (param1) {
            if (arguments.length == 0) {
                return moment._d.getDay();
            }
            else if (arguments.length == 1) {
                moment._d.setDate(moment._d.getDate() + param1 - 1);
                return moment._d.getDay();
            }
        }
        moment.weekdays = function (param1) {
            if (arguments.length == 0) {
                return moment._d.getDay();
            }
            else if (arguments.length == 1) {
                moment._d.setDate(moment._d.getDate() + param1 - 1);
                return moment._d.getDay();
            }
        }
        moment.dayOfTheYear = function (param1) {
            if (arguments.length == 0) {
                var now = new Date();
                var start = new Date(now.getFullYear(), 0, 0);
                var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
                var oneDay = 1000 * 60 * 60 * 24;
                return Math.floor(diff / oneDay);
            }
            else if (arguments.length == 1) {
                var now = new Date();
                var start = new Date(now.getFullYear(), 0, 0);
                var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
                var oneDay = 1000 * 60 * 60 * 24;
                var presentDay = Math.floor(diff / oneDay);
                moment._d.setDate(param1 - presentDay + 3);
                return moment;
            }
        }
        moment.months = function (param1) {
            if (arguments.length == 0) {
                return moment._d.getMonth();
            }
            else if (arguments.length == 1) {

                moment._d.setMonth(param1);
                return moment;
            }
        }
        moment.month = function (param1) {
            if (arguments.length == 0) {
                return moment._d.getMonth();
            }
            else if (arguments.length == 1) {

                moment._d.setMonth(param1);
                return moment;
            }
        }
        moment.years = function (param1) {
            if (arguments.length == 0) {
                return moment._d.getFullYear();
            }
            else if (arguments.length == 1) {
                moment._d.setFullYear(param1);
                return moment;
            }
        }
        moment.year = function (param1) {
            if (arguments.length == 0) {
                return moment._d.getFullYear();
            }
            else if (arguments.length == 1) {
                moment._d.setFullYear(param1);
                return moment;
            }
        }

        //get function
        moment.get = function (param1) {
            switch (param1) {
                case "years": {
                    return moment._d.getFullYear();
                    break;
                }
                case "months": {
                    return moment._d.getMonth();
                    break;
                }
                case "dates": {
                    return moment._d.getDate();
                }
                case "hours": {
                    return moment._d.getHours();
                    break;
                }
                case "minutes": {
                    return moment._d.getMinutes();
                    break;
                }
                case "seconds": {
                    return moment._d.getSeconds();
                    break;
                }
                case "milliseconds": {
                    return moment._d.getMilliseconds();
                    break;
                }
            }
        }
        //set function

        moment.set = function (param1, param2) {
            if (arguments.length == 2) {
                switch (param1) {
                    case "years": {
                        moment._d.setFullYear(param2);
                        return moment;
                        break;
                    }
                    case "months": {
                        moment._d.setMonth(param2);
                        return moment;
                        break;
                    }
                    case "dates": {
                        moment._d.setDate(param2);
                        return moment;
                    }
                    case "hours": {
                        moment._d.setHours(param2);
                        return moment;
                        break;
                    }
                    case "minutes": {
                        moment._d.setMintues(param2);
                        return moment;
                        break;
                    }
                    case "seconds": {
                        moment._d.setSeconds(param2);
                        return moment;
                        break;
                    }
                    case "milliseconds": {
                        moment._d.setMilliseconds(param2);
                        return moment;
                        break;
                    }
                }
                return moment;
            }
            else if (arguments.length == 1) {
                moment._d.setFullYear(param1.years || moment._d.getFullYear());
                moment._d.setMonth(param1.months || moment._d.getMonth());
                moment._d.setDate(param1.date || moment._d.getDate());
                moment._d.setHours(param1.hours || moment._d.getHours());
                moment._d.setMinutes(param1.minutes || moment._d.getMinutes());
                moment._d.setSeconds(param1.seconds || moment._d.getSeconds());
                moment._d.setMilliseconds(param1.milliseconds || moment._d.getMilliseconds());
                return moment;
            }
        }
        //add function
        moment.add = function (arg1, arg2) {
            var date = new Date();
            if (arguments.length == 2) {
                switch (arg2) {
                    case "milliseconds":
                    case "ms": {
                        moment._d.setMilliseconds(date.getMilliseconds() + arg1);
                        return moment;
                    }
                    case "seconds":
                    case "s": {
                        moment._d.setSeconds(date.getSeconds() + arg1);
                        return moment;
                    }
                    case "minutes":
                    case "m": {
                        moment._d.setMinutes(date.getMinutes() + arg1);
                        return moment;
                    }
                    case "hours":
                    case "h": {
                        moment._d.setHours(date.getHours() + arg1);
                        return moment;
                    }
                    case "days":
                    case "d": {
                        moment._d.setDate(date.getDate() + arg1);
                        return moment;
                    }
                    case "weeks":
                    case "w": {
                        moment._d.setDate(date.getDate() + (arg1 * 7));
                        return moment;
                    }
                    case "months":
                    case "M": {
                        moment._d.setMonth(date.getMonth() + arg1);
                        return moment;
                    }
                    case "quarters":
                    case "Q": {
                        moment._d.setMonth(date.getMonth() + (arg1 * 3));
                        return moment;
                    }
                    case "years":
                    case "y": {
                        moment._d.setFullYear(date.getFullYear() + arg1);
                    }
                }

            }
            else if (arguments.length == 1) {
                if (typeof arg1 === 'object' || arg1 instanceof Object) {
                    if (typeof arg1._data === 'object' || arg1._data instanceof Object) {
                        moment._d.setMilliseconds(date.getMilliseconds() + (arg1._data.milliseconds || 0));
                        moment._d.setSeconds(date.getSeconds() + (arg1._data.seconds || 0));
                        moment._d.setMinutes(date.getMinutes() + (arg1._data.minutes || 0));
                        moment._d.setHours(date.getHours() + (arg1._data.hours || 0));
                        moment._d.setDate(date.getDate() + (arg1._data.days || 0));
                        moment._d.setMonth(date.getMonth() + (arg1._data.months || 0));
                        moment._d.setFullYear(date.getFullYear() + (arg1._data.years || 0));
                        return moment;
                    }
                    else {
                        moment._d.setMilliseconds(date.getMilliseconds() + (arg1.milliseconds || 0));
                        moment._d.setSeconds(date.getSeconds() + (arg1.seconds || 0));
                        moment._d.setMinutes(date.getMinutes() + (arg1.minutes || 0));
                        moment._d.setHours(date.getHours() + (arg1.hours || 0));
                        moment._d.setDate(date.getDate() + (arg1.days || 0));
                        moment._d.setMonth(date.getMonth() + (arg1.months || 0));
                        moment._d.setFullYear(date.getFullYear() + (arg1.years || 0));
                        return moment;
                    }
                }
            }
        }
        //subtract function
        moment.subtract = function (arg1, arg2) {
            var date = new Date();
            if (arguments.length == 2) {
                switch (arg2) {
                    case "milliseconds":
                    case "ms": {
                        moment._d.setMilliseconds(date.getMilliseconds() - arg1);
                        return moment;
                    }
                    case "seconds":
                    case "s": {
                        moment._d.setSeconds(date.getSeconds() - arg1);
                        return moment;
                    }
                    case "minutes":
                    case "m": {
                        moment._d.setMinutes(date.getMinutes() - arg1);
                        return moment;
                    }
                    case "hours":
                    case "h": {
                        moment._d.setHours(date.getHours() - arg1);
                        return moment;
                    }
                    case "days":
                    case "d": {
                        moment._d.setDate(date.getDate() - arg1);
                        return moment;
                    }
                    case "weeks":
                    case "w": {
                        moment._d.setDate(date.getDate() - (arg1 * 7));
                        return moment;
                    }
                    case "months":
                    case "M": {
                        moment._d.setMonth(date.getMonth() - arg1);
                        return moment;
                    }
                    case "quarters":
                    case "Q": {
                        moment._d.setMonth(date.getMonth() - (arg1 * 3));
                        return moment;
                    }
                    case "years":
                    case "y": {
                        moment._d.setFullYear(date.getFullYear() - arg1);
                    }
                }

            }
            else if (arguments.length == 1) {
                if (typeof arg1 === 'object' || arg1 instanceof Object) {
                    if (typeof arg1._data === 'object' || arg1._data instanceof Object) {
                        moment._d.setMilliseconds(date.getMilliseconds() - (arg1._data.milliseconds || 0));
                        moment._d.setSeconds(date.getSeconds() - (arg1._data.seconds || 0));
                        moment._d.setMinutes(date.getMinutes() - (arg1._data.minutes || 0));
                        moment._d.setHours(date.getHours() - (arg1._data.hours || 0));
                        moment._d.setDate(date.getDate() - (arg1._data.days || 0));
                        moment._d.setMonth(date.getMonth() - (arg1._data.months || 0));
                        moment._d.setFullYear(date.getFullYear() - (arg1._data.years || 0));
                        return moment;
                    }
                    else {
                        moment._d.setMilliseconds(date.getMilliseconds() - (arg1.milliseconds || 0));
                        moment._d.setSeconds(date.getSeconds() - (arg1.seconds || 0));
                        moment._d.setMinutes(date.getMinutes() - (arg1.minutes || 0));
                        moment._d.setHours(date.getHours() - (arg1.hours || 0));
                        moment._d.setDate(date.getDate() - (arg1.days || 0));
                        moment._d.setMonth(date.getMonth() - (arg1.months || 0));
                        moment._d.setFullYear(date.getFullYear() - (arg1.years || 0));
                        return moment;
                    }
                }
            }
        }
        //start of function
        moment.startOf = function (arg1) {
            switch (arg1) {
                case "year": {
                    moment._d.setMonth(0);
                    moment._d.setDate(1);
                    moment._d.setHours(0);
                    moment._d.setMinutes(0);
                    moment._d.setSeconds(0);
                    moment._d.setMilliseconds(0);
                    return moment;
                }
                case "quarter": {
                    var date = new Date();
                    moment._d.setMonth(date.getMonth() - (date.getMonth() % 3));
                    moment._d.setDate(1);
                    moment._d.setHours(0);
                    moment._d.setMinutes(0);
                    moment._d.setSeconds(0);
                    moment._d.setMilliseconds(0);
                    return moment;
                }
                case "month": {
                    console.log("Welcome");
                    moment._d.setDate(1);
                    moment._d.setHours(0);
                    moment._d.setMinutes(0);
                    moment._d.setSeconds(0);
                    moment._d.setMilliseconds(0);
                    return moment;
                }
                case "week": {
                    var date = new Date();
                    moment._d.setDate(date.getDate() - date.getDay());
                    moment._d.setHours(0);
                    moment._d.setMinutes(0);
                    moment._d.setSeconds(0);
                    moment._d.setMilliseconds(0);
                    return moment;
                }
                case "isoWeek": {
                    var date = new Date();
                    moment._d.setDate(date.getDate() - date.getDay() + 1);
                    moment.startOf("date");
                }
                case "day": {
                    moment.startOf("date");
                }
                case "date": {
                    moment._d.setHours(0);
                    moment.startOf("hour");
                }
                case "hour": {
                    moment._d.setMinutes(0);
                    moment.startOf("minute");
                }
                case "minute": {
                    moment._d.setSeconds(0);
                    moment._d.setMilliseconds(0);
                    return moment;
                }
                case "second": {
                    moment._d.setMilliseconds(0);
                    return moment;
                }
            }
        }
        //endOf function
        moment.endOf = function (arg1) {
            switch (arg1) {
                case "year": {
                    moment._d.setMonth(12);
                    moment._d.setDate(0);
                    moment._d.setHours(23);
                    moment._d.setMinutes(59);
                    moment._d.setSeconds(59);
                    moment._d.setMilliseconds(999);
                    return moment;
                }
                case "quarter": {
                    var date = new Date();
                    moment._d.setMonth(date.getMonth() + 3 - (date.getMonth() % 3));
                    moment._d.setDate(0);
                    moment._d.setHours(23);
                    moment._d.setMinutes(59);
                    moment._d.setSeconds(59);
                    moment._d.setMilliseconds(999);
                    return moment;
                }
                case "month": {
                    var date = new Date();
                    moment._d.setMonth(date.getMonth() + 1);
                    moment._d.setDate(0);
                    moment._d.setHours(23);
                    moment._d.setMinutes(59);
                    moment._d.setSeconds(59);
                    moment._d.setMilliseconds(999);
                    return moment;
                }
                case "week": {
                    var date = new Date();
                    moment._d.setDate(date.getDate() + 7 - date.getDay() - 1);
                    moment._d.setHours(23);
                    moment._d.setMinutes(59);
                    moment._d.setSeconds(59);
                    moment._d.setMilliseconds(999);
                    return moment;
                }
                case "isoWeek": {
                    var date = new Date();
                    moment._d.setDate(date.getDate() + (7 - date.getDay()));
                    moment.startOf("date");
                }
                case "day": {
                    moment.startOf("date");
                }
                case "date": {
                    moment._d.setHours(23);
                    moment.startOf("hour");
                }
                case "hour": {
                    moment._d.setMinutes(59);
                    moment.startOf("minute");
                }
                case "minute": {
                    moment._d.setSeconds(59);
                    moment._d.setMilliseconds(999);
                    return moment;
                }
                case "second": {
                    moment._d.setMilliseconds(999);
                    return moment;
                }
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

        //fromNow
        moment.fromNow = function (arg1) {
            var date = new Date();
            var agoString = "", inString = "";
            if (arg1 == true) {
                agoString = "ago";
                inString = "in";
            }
            var difference = date.getTime() - moment._d.getTime();
            var timeDiff = Math.abs(moment._d.getTime() - date.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            var diffYears = Math.floor(diffDays / 365);
            if (diffYears >= 1) {
                if (difference > 0) {
                    return diffYears + " years " + agoString;
                }
                else {
                    return inString + " " + diffYears + " years";
                }
            }
            else if (diffDays < 365 && diffDays >= 30) {
                var diffMonths = Math.floor(diffDays / 30);
                if (difference > 0) {
                    return diffMonths + " months " + agoString;
                }
                else {
                    return inString + " " + diffMonths + " months";
                }
            }
            else if (diffDays < 29) {

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
                    moment._days = arg1 * 7;
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
    }//duration.humanize function


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
        return Math.floor((moment._data.milliseconds + moment._data.seconds * 1000 + moment._data.minutes * 60000 + moment._data.hours * 3600000 + moment._data.days * 86400000 + moment._data.months * 2592000000 + moment._data.years * 31536000000) / (1000 * 60));
    }
    moment.asMinutes = function () {
        return (moment._data.milliseconds + moment._data.seconds * 1000 + moment._data.minutes * 60000 + moment._data.hours * 3600000 + moment._data.days * 86400000 + moment._data.months * 2592000000 + moment._data.years * 31536000000) / (1000 * 60);
    }
    moment.hours = function () {
        return Math.floor((moment._data.milliseconds + moment._data.seconds * 1000 + moment._data.minutes * 60000 + moment._data.hours * 3600000 + moment._data.days * 86400000 + moment._data.months * 2592000000 + moment._data.years * 31536000000) / (1000 * 60 * 60));
    }
    moment.asHours = function () {
        return (moment._data.milliseconds + moment._data.seconds * 1000 + moment._data.minutes * 60000 + moment._data.hours * 3600000 + moment._data.days * 86400000 + moment._data.months * 2592000000 + moment._data.years * 31536000000) / (1000 * 60 * 60);
    }
    moment.days = function () {
        return (moment._data.milliseconds + moment._data.seconds * 1000 + moment._data.minutes * 60000 + moment._data.hours * 3600000 + moment._data.days * 86400000 + moment._data.months * 2592000000 + moment._data.years * 31536000000) / (1000 * 60 * 60 * 24);
    }
    moment.asDays = function () {
        return (moment._data.milliseconds + moment._data.seconds * 1000 + moment._data.minutes * 60000 + moment._data.hours * 3600000 + moment._data.days * 86400000 + moment._data.months * 2592000000 + moment._data.years * 31536000000) / (1000 * 60 * 60 * 24);
    }
    moment.weeks = function () {
        return Math.floor(((moment._data.milliseconds + moment._data.seconds * 1000 + moment._data.minutes * 60000 + moment._data.hours * 3600000 + moment._data.days * 86400000 + moment._data.months * 2592000000 + moment._data.years * 31536000000) / (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24 * 7));
    }
    moment.asWeeks = function () {
        return (moment._data.milliseconds + moment._data.seconds * 1000 + moment._data.minutes * 60000 + moment._data.hours * 3600000 + moment._data.days * 86400000 + moment._data.months * 2592000000 + moment._data.years * 31536000000) / (1000 * 60 * 60 * 24 * 7);
    }
    moment.months = function () {
        return Math.floor((moment._data.milliseconds + moment._data.seconds * 1000 + moment._data.minutes * 60000 + moment._data.hours * 3600000 + moment._data.days * 86400000 + moment._data.months * 2592000000 + moment._data.years * 31536000000) / (2592000000));
    }
    moment.asMonths = function () {
        return (moment._data.milliseconds + moment._data.seconds * 1000 + moment._data.minutes * 60000 + moment._data.hours * 3600000 + moment._data.days * 86400000 + moment._data.months * 2592000000 + moment._data.years * 31536000000) / (2592000000);
    }
    moment.years = function () {
        var temp = (moment._data.milliseconds + moment._data.seconds * 1000 + moment._data.minutes * 60000 + moment._data.hours * 3600000 + moment._data.days * 86400000 + moment._data.months * 2592000000 + moment._data.years * 31536000000) / (31536000000);
        if (temp < 1) {
            return 0;
        }
        else return temp;
    }
    moment.asYears = function () {
        return (moment._data.milliseconds + moment._data.seconds * 1000 + moment._data.minutes * 60000 + moment._data.hours * 3600000 + moment._data.days * 86400000 + moment._data.months * 2592000000 + moment._data.years * 31536000000) / (31536000000);
    }
    moment.add = function (param1, param2) {
        if (arguments.length == 2) {
            if ((!isNaN(param1)) && ((typeof param2 === 'string') || (param2 instanceof String))) {
                moment = getValuesForTwoParameters(moment, param1, param2, "add");
                return moment;
            }
        }//if statement arguments length = 0
        else if (arguments.length == 1) {
            if (!isNaN(param1)) {
                moment = getValuesForNumber(moment, param1, "add");
                return moment;
            }
            else if (typeof param1 === 'object' || param1 instanceof Object) {
                if (typeof param1.add === 'function') {
                    moment = getValuesForMomentObject(moment, param1, "add");
                    return moment;
                }
                else {
                    moment = getValuesForObject(moment, param1, "add");
                    return moment;
                }
            }
        }
    }
    moment.subtract = function (param1, param2) {
        if (arguments.length == 2) {
            if ((!isNaN(param1)) && ((typeof param2 === 'string') || (param2 instanceof String))) {
                moment = getValuesForTwoParameters(moment, param1, param2, "subtract");
                return moment;
            }
        }//if statement arguments length = 0
        else if (arguments.length == 1) {
            if (!isNaN(param1)) {
                moment = getValuesForNumber(moment, param1, "subtract");
                return moment;
            }
            else if (typeof param1 === 'object' || param1 instanceof Object) {
                if (typeof param1.add === 'function') {
                    moment = getValuesForMomentObject(moment, param1, "subtract");
                    return moment;
                }
                else {
                    moment = getValuesForObject(moment, param1, "subtract");
                    return moment;
                }
            }
        }
    }
    moment.as = function (param1) {
        switch (param1) {
            case "milliseconds":
            case "ms": {
                return moment._data.milliseconds + moment._data.seconds * 1000 + moment._data.minutes * 60000 + moment._data.hours * 3600000 + moment._data.days * 86400000 + moment._data.months * 2592000000 + moment._data.years * 31536000000;
                break;
            }
            case "seconds":
            case "s": {
                return (moment._data.milliseconds + moment._data.seconds * 1000 + moment._data.minutes * 60000 + moment._data.hours * 3600000 + moment._data.days * 86400000 + moment._data.months * 2592000000 + moment._data.years * 31536000000) / 1000;
                break;
            }
            case "minutes":
            case "m": {
                return (moment._data.milliseconds + moment._data.seconds * 1000 + moment._data.minutes * 60000 + moment._data.hours * 3600000 + moment._data.days * 86400000 + moment._data.months * 2592000000 + moment._data.years * 31536000000) / (1000 * 60);
                break;
            }
            case "hours":
            case "h": {
                return (moment._data.milliseconds + moment._data.seconds * 1000 + moment._data.minutes * 60000 + moment._data.hours * 3600000 + moment._data.days * 86400000 + moment._data.months * 2592000000 + moment._data.years * 31536000000) / (1000 * 60 * 60);
                break;
            }
            case "days":
            case "d": {
                return (moment._data.milliseconds + moment._data.seconds * 1000 + moment._data.minutes * 60000 + moment._data.hours * 3600000 + moment._data.days * 86400000 + moment._data.months * 2592000000 + moment._data.years * 31536000000) / (1000 * 60 * 60 * 24);
                break;
            }
            case "weeks":
            case "w": {
                return (moment._data.milliseconds + moment._data.seconds * 1000 + moment._data.minutes * 60000 + moment._data.hours * 3600000 + moment._data.days * 86400000 + moment._data.months * 2592000000 + moment._data.years * 31536000000) / (1000 * 60 * 60 * 24 * 7);
                break;
            }
            case "months":
            case "M": {
                return (moment._data.milliseconds + moment._data.seconds * 1000 + moment._data.minutes * 60000 + moment._data.hours * 3600000 + moment._data.days * 86400000 + moment._data.months * 2592000000 + moment._data.years * 31536000000) / (2592000000);
                break;
            }
            case "years":
            case "y": {
                return (moment._data.milliseconds + moment._data.seconds * 1000 + moment._data.minutes * 60000 + moment._data.hours * 3600000 + moment._data.days * 86400000 + moment._data.months * 2592000000 + moment._data.years * 31536000000) / (31536000000);
                break;
            }
        }
    }
    moment.toJSON = function () {
        return "P" + moment._data.years + "Y";
    }
    return moment;
}
function getValuesForObject(moment, param1, operation) {
    var operator = 1;
    if (operation == "subtract")
        operator = -1;
    moment._data.milliseconds = moment._data.milliseconds + operator * (param1.milliseconds || 0);
    moment._data.seconds = moment._data.seconds + operator * (param1.seconds || 0);
    moment._data.minutes = moment._data.minutes + operator * (param1.minutes || 0);
    moment._data.hours = moment._data.hours + operator * (param1.hours || 0);
    moment._data.days = moment._data.days + operator * (param1.days || 0);
    moment._data.days = moment._data.days + operator * (param1.weeks * 7 || 0);
    moment._data.months = moment._data.months + operator * (param1.months || 0);
    moment._data.years = moment._data.years + operator * (param1.years || 0);
    moment._milliseconds = moment._milliseconds + operator * ((param1.milliseconds || 0) + operator * (param1.seconds * 1000 || 0) + operator * (param1.minutes * 60 * 1000 || 0) + operator * (param1.hours * 3600 * 1000 || 0));
    moment._days = moment._days + operator * ((param1.days || 0) + (param1.weeks * 7 || 0));
    moment._months = moment._months + operator * ((param1.months || 0) + (param1.years * 12 || 0));
    return moment;
}
function getValuesForMomentObject(moment, param1, operation) {
    var operator = 1;
    if (operation == "subtract")
        operator = -1;
    moment._data.milliseconds = moment._data.milliseconds + operator * (param1._data.milliseconds || 0);
    moment._data.seconds = moment._data.seconds + operator * (param1._data.seconds || 0);
    moment._data.minutes = moment._data.minutes + operator * (param1._data.minutes || 0);
    moment._data.hours = moment._data.hours + operator * (param1._data.hours || 0);
    moment._data.days = moment._data.days + operator * (param1._data.days || 0);
    moment._data.days = moment._data.days + operator * (param1._data.weeks * 7 || 0);
    moment._data.months = moment._data.months + operator * (param1._data.months || 0);
    moment._data.years = moment._data.years + operator * (param1._data.years || 0);
    moment._milliseconds = moment._milliseconds + operator * (param1._milliseconds || 0);
    moment._days = moment._days + operator * (param1._days || 0)
    moment._months = moment._months + operator * (param1._months || 0);
    return moment;
}
function getValuesForNumber(moment, param1, operation) {
    var operator = 1;
    if (operation == "subtract")
        operator = -1;
    //moment._data.milliseconds = moment._data.milliseconds + param1;
    var tempTime = Math.floor(param1 / 1000);
    //console.log("temptime = " + tempTime);
    moment._milliseconds = moment._milliseconds + operator * param1;
    //console.log("moment._data.milliseconds = " + moment._data.milliseconds);
    //console.log("ceil function for param1 = " + Math.ceil((param1 % 1000) * 1000));
    if (param1 >= 1000)
        moment._data.milliseconds = moment._data.milliseconds + operator * Math.ceil((param1 % 1000) * 1000);
    else
        moment._data.milliseconds = moment._data.milliseconds + operator * param1;

    if (tempTime >= 31536000) {
        moment._data.years = moment._data.years + operator * Math.floor(tempTime / 31536000);
        tempTime = tempTime % 31536000;
    }
    if (tempTime < 31536000 && tempTime >= 2628000) {
        moment._data.months = moment._data.months + operator * Math.floor(tempTime / 2628000);
        tempTime = tempTime % 2628000;
    }
    if (tempTime < 2628003 && tempTime >= 86400) {
        moment._data.days = moment._data.days + operator * Math.floor(tempTime / 86400);
        tempTime = tempTime % 86400;
    }
    if (tempTime < 86400 && tempTime >= 3600) {
        moment._data.hours = moment._data.hours + operator * Math.floor(tempTime / 3600);
        tempTime = tempTime % 3600;
    }
    if (tempTime < 3600 && tempTime >= 60) {
        moment._data.minutes = moment._data.minutes + operator * Math.floor(tempTime / 60);
        tempTime = tempTime % 60;
    }
    moment._data.seconds = moment._data.seconds + operator * tempTime;
    return moment;
}
function getValuesForTwoParameters(moment, param1, param2, operation) {
    var operator = 1;
    if (operation == "subtract")
        operator = -1;
    switch (param2) {
        case "milliseconds":
        case "ms": {
            moment._data.milliseconds = moment._data.milliseconds + operator * param1;
            moment._milliseconds = moment._milliseconds + operator * param1;
            break;
        }
        case "seconds":
        case "s": {
            moment._data.seconds = moment._data.seconds + operator * param1;
            moment._milliseconds = moment._milliseconds + operator * (param1 * 1000);
            break;
        }
        case "minutes":
        case "m": {
            moment._data.minutes = moment._data.minutes + operator * param1;
            moment._milliseconds = moment._milliseconds + operator * (param1 * 1000 * 60);
            break;
        }
        case "hours":
        case "h": {
            moment._data.hours = moment._data.hours + operator * param1;
            moment._milliseconds = moment._milliseconds + operator * (param1 * 1000 * 60 * 60);
            break;
        }
        case "days":
        case "d": {
            moment._data.days = moment._data.days + operator * param1;
            moment._days = moment._days + operator * param1;
            break;
        }
        case "weeks":
        case "w": {
            moment._data.days = moment._data.days + operator * (param1 * 7);
            moment._days = moment._days + operator * (param1 * 7);
            break;
        }
        case "months":
        case "M": {
            moment._data.months = moment._data.months + operator * param1;
            moment._months = moment._months + operator * param1;
            break;
        }
        case "years":
        case "y": {
            moment._data.years = moment._data.years + operator * param1;
            moment._months = moment._months + operator * (param1 * 12);
            break;
        }
    }
    return moment;
}