var controller = require('../controllers/controller.js');

module.exports = function(app) {
    // Add API routes
    require('./api-routes/default-api-routes')(app);
    require('./api-routes/custom-api-routes')(app);
    
    // Upload file
    app.post('/file/upload', controller.fileUpload);
}

