var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var cron = require('cron');
var jobsWorker = require('./utils/processJobsWorker.js');

/* 
start cronJob to have background
process read from queue in redis
get the website content
then store in the persistant db
*/
var cronJob = cron.job('*/15 * * * * *', function() {
  jobsWorker();
});
cronJob.start();

// SERVE UP CLIENT FILES
app.use(express.static(__dirname+'/../client/'));

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// INITIALIZE CONNECTION WITH DATABASE
mongoose.connect('mongodb://localhost/mydb');


// ROUTING
require('./routes/websiteRouter.js')(app, express);

// START SERVER
app.listen(port, function(err){
  if(err){
    return console.log('server cannot connect', err);
  }
  console.log('App is listening on port 3000');
});

module.exports = app;
