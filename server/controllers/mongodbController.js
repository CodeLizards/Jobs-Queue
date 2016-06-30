var website = require('../models/website.js');

// check if job is in the database and invoke callback with results
exports.getWebsite = function (id, callback) {
  website.findOne({  id: id }, function (err, website) {
    callback(err, website);
  });
}

// complete job by storing website in database 
exports.storeWebsite = function (id, url, content) {
  var websiteEntry = new website({ id: id, url: url, content: content });
  websiteEntry.save(function (err) {
    if (err) {
      console.log("error trying to store website: " + url);
    }
  });
}
