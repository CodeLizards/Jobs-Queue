var website = require('../models/website.js');

exports.getWebsite = function (id, callback) {
  website.findOne({  id: id }, function(err, website) {
    callback(err, website);
  });
}

exports.storeWebsite = function (id, url, content) {
  var websiteEntry = new website({ id: id, url: url, content: content });
  
  exports.getWebsite(id, function(website){
    if (!website) {
      websiteEntry.save(function (err) {
        if (err) {
          console.log("error trying to store website: "+url);
        }
      });
    }
  });
}
