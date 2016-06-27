var redisClient = require('../db/redis.js');
var mongodbController = require('./mongodbController.js')
var jobIndex = 0;

exports.newWebsite = function(req, res) {
  // add to the jobs queue
  var job = [jobIndex, req.body.url];
  job = JSON.stringify(job);
  redisClient.rpush('jobsQueue', job, function(err, reply){
    if (err) {
      return console.log('Error pushing job to jobQueue in Redis');
    }
    return reply;
  });
  res.json(jobIndex);
  jobIndex++;
}

exports.checkWebsite = function(req, res) {
  // check if job id is in db
  mongodbController.getWebsite(req.params.id, function(err, website){
    if (website) {
      res.json(website);
    } else {
      res.json("The website has not yet been archived! Hang tight.");
    }
  });

}
