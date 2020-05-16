var sc = require('suncalc');

function main(params) {
    var lat = 41.591158899999996;
    var lon = 1.5208624;

    var date = new Date();
    var dateYest = new Date(new Date().setDate(new Date().getDate() - 1));

    var times = sc.getTimes(date, lat, lon);
    var timesYest = sc.getTimes(dateYest, lat, lon);
    var sunRise = times.sunrise.getHours() + ':' + times.sunrise.getMinutes();
    var sunDown = times.sunset.getHours() + ':' + times.sunrise.getMinutes();

    deltaRise = (times.sunrise.getTime() - (timesYest.sunrise.getTime() + 24 * 3600 * 1000)) / 1000;
    deltaDown = (times.sunset.getTime() - (timesYest.sunset.getTime() + 24 * 3600 * 1000)) / 1000;
    delta = deltaDown - deltaRise;

    resStr = "Sun Rise = " + sunRise + " UTC (+2)";
    resStr = resStr + "\nDelta sunrise since yesterday in s = " + deltaRise;
    resStr = resStr + "\n\nSun Down = " + sunDown + " UTC (+2)";
    resStr = resStr + "\nDelta sunset since yesterday in s = " + deltaDown;
    resStr = resStr + "\n\nDelta total in s = " + delta;

    console.log(resStr);
    //return resStr;
    return { payload: resStr };
}

exports.handler = main;
