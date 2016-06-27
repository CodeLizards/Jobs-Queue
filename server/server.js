var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;
var cron = require('cron');
var jobsWorker = require('./utils/processJobsWorker.js');
var cronJob = cron.job('*/30 * * * * *', function() {
  jobsWorker();
});
cronJob.start();
// app.use(express.static(`${__dirname}/../client/`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routing requests to put in a newJob
require('./routes/websiteRouter.js')(app, express);


app.listen(port, function(err){
  if(err){
    return console.log('server cannot connect', err);
  }
  console.log('App is listening on port 3000');
});

module.exports = app;
