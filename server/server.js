var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var cron = require('cron');
var jobsWorker = require('./utils/processJobsWorker.js');

// start cronJob to have background process write jobs to the db
var cronJob = cron.job('*/5 * * * * *', function() {
  jobsWorker();
});
cronJob.start();


// app.use(express.static(`${__dirname}/../client/`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//connect the db
mongoose.connect('mongodb://localhost/mydb');


// Routing requests to put in a newJob
require('./routes/websiteRouter.js')(app, express);


app.listen(port, function(err){
  if(err){
    return console.log('server cannot connect', err);
  }
  console.log('App is listening on port 3000');
});

module.exports = app;
