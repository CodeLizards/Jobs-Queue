
module.exports = function(app, express){
  var websiteController = require('../controllers/websiteController.js');
  console.log('routing')

  app.route('/newWebsite')
    .post(websiteController.newWebsite);

  
  app.route('/checkWebsite')
    .get(websiteController.checkWebsite);

};

