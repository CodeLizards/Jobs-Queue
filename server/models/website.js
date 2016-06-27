var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var websiteSchema = new Schema({ 
  content: String,
  id: String,
  url: String,
});

var website = mongoose.model('website', websiteSchema);

module.exports = website;