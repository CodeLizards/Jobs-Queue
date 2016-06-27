var redisClient = require('../db/redis.js');
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

  // if it is in db, 
    // return to user
  // else return not completed message
}
