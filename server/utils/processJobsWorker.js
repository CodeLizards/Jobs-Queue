var redisClient = require('../db/redis.js');
var request = require('request');


module.exports = function(){
  redisClient.lrange('jobsQueue', 0, 10, function(err, reply) {
    if(err) {
      console.log(err);
    }else{
      console.log('reply', reply);
    }
  })
};

var getContent = function(url){
  request('http://'+url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log('body', body); 
    } else {
      console.log('url', url);
      res.send(404);
    }
  });
};

var storeWebsite = function(req, res) {

};