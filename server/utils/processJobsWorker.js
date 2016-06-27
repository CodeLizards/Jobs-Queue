var redisClient = require('../db/redis.js');
var request = require('request');
var websiteMethods = require('../controllers/mongodbController.js');


var getContent = function(id, url){
  request('http://'+url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      websiteMethods.storeWebsite(id, url, body);
    } else {
      console.log('Could not get html from website');
    }
  });
};

module.exports = function(){
  redisClient.lpop('jobsQueue', function(err, reply) {
    if (reply) {
      var website = JSON.parse(reply);
      var id = website[0];
      var url = website[1];
      getContent(id, url);
    } else {
      console.log('no websites have been entered');
    }
  })
};