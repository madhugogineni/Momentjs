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
        moment.valueOf = function () {
            return moment._d.getTime();
        }
        moment.unix = function () {
            return Math.floor(moment._d.getTime() / 1000);
        }
        moment.toArray = function () {
            return [moment._d.getFullYear(), moment._d.getMonth(), moment._d.getDate(), moment._d.getHours(), moment._d.getMinutes(), moment._d.getSeconds(), moment._d.getMilliseconds()];
        }
        moment.toJSON = function () {
            return moment._d.getFullYear() + "-" + formatMonth(moment._d) + "-" + formatDate(moment._d) + "T" + getUTCTime(moment._d)[0] + ":" + getUTCTime(moment._d)[1] + ":" + formatSeconds(moment._d) + ".501Z";
        }
        moment.toObject = function () {
            return { "years": moment._d.getFullYear(), "months": moment._d.getMonth(), "date": moment._d.getDate(), "hours": moment._d.getHours(), "minutes": moment._d.getMinutes(), "seconds": moment._d.getSeconds(), "milliseconds": moment._d.getMilliseconds() };
        }
        moment.toString = function () {
            return moment._d.toString().substring(0, 33);
        }
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

            moment.isBefore = function (param1,param2) {
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
moment.try1 ="madhu";
moment.prototype.try1 = function() {
    return "welcome";
}