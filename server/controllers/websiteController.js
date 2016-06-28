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
  var id = req.params.id;
  mongodbController.getWebsite(id, function(err, website){
    if (website) {
      res.json(website);
    } else {
      findPosition(id, function(position) {
        // return position in job queue
        if (position === null) {
          res.json("No such job is in the queue!")
        } else {
          res.json("The website has not yet been archived! It is " + position + " away from being processed. Hang tight.");
        }
      });
    }
  });

}


var findPosition = function(id, callback){
  var position = null;
  redisClient.llen('jobsQueue', function(err, reply){
    if (err) {
      return "There was an error finding the position in the jobsQueue "+err;
    }
    redisClient.lrange('jobsQueue', 0, reply, function(err, replies){
      if (replies) {
        for(var i = 0; i < replies.length; i++) {
          if (JSON.parse(replies[i])[0] == id) {
            position = i;
            console.log('position', position);
          }
        }
      }
      callback(position);
    });
  });
};
