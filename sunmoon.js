const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

var sc = require('suncalc');
var lat = 41.591158899999996;
var lon = 1.5208624;

const server = http.createServer((req, res) => {
  var times = sc.getTimes(new Date(), lat, lon);
  var sunRise = times.sunrise.getHours() + ':' + times.sunrise.getMinutes();
  var sunDown = times.sunset.getHours() + ':' + times.sunrise.getMinutes();

  var moon = sc.getMoonIllumination(new Date());
  var moonFrac = moon.fraction;
  moonFrac = Math.round(moonFrac * 100)/100;
  var moonPhase = moon.phase;
  moonPhase = Math.round(moonPhase * 100)/100;

  resStr = "Sun Rise = " + sunRise + "\nSun Down = " + sunDown;
  resStr = resStr + "\n\nMoon Ilumination [0-1] = " + moonFrac + "\nMoon Phase [0:new, 0.5:full, 0.99:new] = " + moonPhase;

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(resStr);
});

server.listen(port, hostname, () => {
  console.log('Server running at localhost, port 3000');
});