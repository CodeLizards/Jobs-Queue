module.exports = function(app, express){
  var websiteController = require('../controllers/websiteController.js');

  app.route('/newWebsite')
    .post(websiteController.newWebsite);

  
  app.route('/checkWebsite/:id')
    .get(websiteController.checkWebsite);

};

