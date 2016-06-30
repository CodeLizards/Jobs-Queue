var redisClient = require('../db/redis.js');
var mongodbController = require('./mongodbController.js')
var jobID = 0;

// Function that adds new website to the Job Queue to be processed
exports.newWebsite = function(req, res) {
  // add job stringified array with jobId and website
  // to the jobs queue in redis queue
  var job = [jobID, req.body.url];
  job = JSON.stringify(job);
  redisClient.rpush('jobsQueue', job, function(err, reply){
    if (err) {
      return console.log('Error pushing job to jobQueue in Redis');
    }
    return reply;
  });
  // send back the jobId to user so they can retreive results
  res.status(200);
  res.json(jobID);
  // incrament jobID for the next job's ID. 
  jobID++;
}

// Function to retreive results / status of particular job
exports.checkWebsite = function(req, res) {
  // check if job id is in db
  var id = req.params.id;
  mongodbController.getWebsite(id, function(err, website) {
    // if found, send back the results
    if (website) {
      res.json(website);
    // otherwise it is still processing
    } else {
      // find its position in the queue
      findPosition(id, function(position) {
          res.json({ position: position });
      });
    }
  });

}

// Function to search the queue for the position of the job
var findPosition = function(id, callback){
  var position = null;
  redisClient.llen('jobsQueue', function(err, reply){
    if (err) {
      return "There was an error finding the length of the jobsQueue " + err;
    }
    redisClient.lrange('jobsQueue', 0, reply, function(err, replies){
      if (replies) {
        for(var i = 0; i < replies.length; i++) {
          if (JSON.parse(replies[i])[0] == id) {
            position = i;
          }
        }
      }
      callback(position);
    });
  });
};
