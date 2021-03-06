const http = require('http');
const hostname = '0.0.0.0';
const port = 8080;

var sc = require('suncalc');
var lat = 41.591158899999996;
var lon = 1.5208624;

const server = http.createServer((req, res) => {
  var date = new Date();
  var dateYest = new Date(new Date().setDate(new Date().getDate()-1));

  var times = sc.getTimes(date, lat, lon);
  var timesYest = sc.getTimes(dateYest, lat, lon);
  var sunRise = times.sunrise.getHours() + ':' + times.sunrise.getMinutes();
  var sunDown = times.sunset.getHours() + ':' + times.sunrise.getMinutes();
  
  var moon = sc.getMoonIllumination(date);
  var moonFrac = moon.fraction;
  moonFrac = Math.round(moonFrac * 100)/100;
  var moonPhase = moon.phase;
  moonPhase = Math.round(moonPhase * 100)/100;

  resStr = "Sun Rise = " + sunRise +" UTC (+2)" + "\nSun Down = " + sunDown +" UTC (+2)";
  delta = (times.sunrise.getTime() - (timesYest.sunrise.getTime() + 24*3600*1000))/1000;
  resStr = resStr + "\nDelta sunrise since yesterday in s = " + delta;
  delta = (times.sunset.getTime() - (timesYest.sunset.getTime() + 24*3600*1000))/1000;
  resStr = resStr + "\nDelta sunset since yesterday in s = " + delta;
  
  resStr = resStr + "\n\nMoon Ilumination [0-1] = " + moonFrac + "\nMoon Phase [0:new, 0.5:full, 0.99:new] = " + moonPhase;

  var moonPos = sc.getMoonPosition(date, lat, lon);
  resStr = resStr + "\nMoon Altitude in rad [0:horizon, PI/2:zenith] = " + Math.round((moonPos.altitude/Math.PI)*100)/100 + " PI";
  resStr = resStr + "\nMoon Azimuth in rad [0:south, PI/2:west] = " + Math.round((moonPos.azimuth/Math.PI)*100)/100 + " PI";
  
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(resStr);
});

server.listen(port, hostname, () => {
  console.log('Server running at localhost, port 8080');
});
