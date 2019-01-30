module.exports = function(app) {
    // Add API routes
    require('./api-routes/default-api-routes')(app);
    require('./api-routes/custom-api-routes')(app);
}