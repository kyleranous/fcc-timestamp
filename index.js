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

// /api/ should return the current time
app.get("/api", function (req, res) {
  currentTime = new Date()

  var response = {
    "unix": currentTime.getTime(),
    "utc": currentTime.toUTCString()
  };

  res.json(response);

});


app.get("/api/:date", function (req, res) {
  var queryDate = req.params.date;
  // Check if queryDate is a number (Unix Time Stamp)
  if (!isNaN(Number(queryDate))){
    queryDate = Number(queryDate);
    console.log(queryDate);
    var unixTime = new Date(queryDate);
  }
  else {
    // Convert Date Object to Unix Time Stamp
    var unixTime = new Date(Date.parse(queryDate));
  }
 // check if date is valid
  if (isNaN(unixTime)) {
    // if not populate response with error message
    var response = {
      "error": "Invalid Date"
    }
  } else {
    // Convert Date Object to UTC Time Stamp
    //var utcDate = unixTime.getTime();
    //var utcTime = unixTime.toUTCString();
    // Populate Response Object
    var response = {
      "unix": unixTime.getTime(),
      "utc": unixTime.toUTCString()
    };
  }
  //  Return the Response
  res.json(response);
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
