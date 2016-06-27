
module.exports = function(app, express){

  var websiteRouter = express.Router();
  var websiteController = require('./../controllers/websiteController.js');

  websiteRouter.route('/newWebsite')
    .post(websiteController.newWebsite);

  
  websiteRouter.route('/checkWebsite')
    .get(websiteController.checkWebsite);

};

