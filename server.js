// server.js
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

app.get('/api/:date?', (req, res) => {
  let { date } = req.params

  if (!date) {
    const currentDate = new Date()
    return res.json({
      unix: currentDate.getTime(),
      utc: currentDate.toGMTString()
    })
  }

  // if date is in number format, change type to number
  if (!isNaN(date)) {
    date = Number(date)
  }

  const parsedDate = new Date(date)

  if (parsedDate == 'Invalid Date') {
    return res.json({
      error: 'Invalid Date'
    })
  }

  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toGMTString()
  })
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
