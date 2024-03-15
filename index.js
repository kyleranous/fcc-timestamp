// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/:date", function (req, res) {
  var dateString = req.params.date;
  // Convert Date Object to Unix Time Stamp
  var unixTime = Date.parse(dateString);
  
  
 // check if date is valid
  if (isNaN(unixTime)) {
    // if not populate response with error message
    var response = {
      "error": `${dateString} is not a valid date.`
    }
  } else {
    // Convert Date Object to UTC Time Stamp
    var utcDate =  new Date(unixTime);
    var utcTime = utcDate.toUTCString(utcDate);
    // Populate Response Object
    var response = {
      "unix": unixTime,
      "utc": utcTime
    };
  }
  //  Return the Response
  res.json(response);
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
