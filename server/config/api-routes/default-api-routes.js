/**
    Usage: 
    - Make your Mongoose schema.
    - Add a model.
    - Add it to module.exports in your models.js file under the API section.
    - Done! API for that model should be working immediately.
    test by going to /api/yourmodelname. You should get at least a response of {}.

    Add additoinal API routes in the custom-api-routes.
*/

var models = require('../../models/models.js').api
var lib = require('./lib.js')
var respondWithJson = lib.respondWithJson;
var checkObjIsSubsetOfSchema = lib.checkObjIsSubsetOfSchema
var checkObjHasRequiredPaths = lib.checkObjHasRequiredPaths


/** register_api_routes(app)
* app: expressjs App object
* 
* Registers the below API routes with the app. It registers a set of routes for each model included in the modelsjs file under the "api" export path. The api will be available at /api/<model> for each model.

For each model, these routes will be exposed: (routes start with api/<modelname>)

    /api/<model>/ [GET]
        Get all documents for this model.

    /api/<model>/ [POST]
        Add a new document. Submitted document is checked against the schema and may ONLY contain the data within the model. (Note that at this time, nested documents aren't checked.)

    /api/<model>/:id [GET]
        Get document by ID.

    /api/<model>/:id [PUT]
        Update document by ID. All inputs are verified against the schema.
    
    /api/<model>/:id [DELETE]
        Delete document by ID. */
function register_api_routes(app) {
    for (model in models) {
        /** GET -- Get all documents for model. */
        console.log("Registering /api/" + model);

        app.get('/api/' + model, function(request, response) {
            models[model].find({}, function(error, results) {
                respondWithJson(error, results, response,
                    {model: model, action: "GET"});
            });
        });

        /** GET Get document by ID. */
        app.get('/api/' + model + '/:id', function(request, response) {
            models[model].findById(request.params.id, function(error, results) {
                respondWithJson(error, results, response,
                    {model: model, action: "GET", id: request.params.id})
            });
        });
        
        /** POST -- Create a new doucment. */
        app.post('/api/' + model, function(request, response) {
            if (!checkObjHasRequiredPaths(request.body, models[model].schema.requiredPaths())) {
                response.status(400).json({
                    error: "Create request missing parameters. You must implement all model parameters. If the parameter is an array, please at least include an empty array.",
                    required_schema: models[model].schema.obj,
                    request: request.body});
                return;
            }

            models[model].create(request.body, function(error, results) {
                respondWithJson(error, results, response,
                    {model: model, action: "POST", data: request.body});
            });
        });

        /* PUT -- update a document by id */
        app.put('/api/' + model + '/:id', function(request, response) {
            if (!checkObjIsSubsetOfSchema(request.body, models[model].schema.obj)) {
                response.status(400).json({
                    error: "Update request has parameters that I didn't recognize. Make sure your request only implements parameters in the schema.",
                    required_schema: models[model].schema.obj,
                    request: request.body
                    });
                return;
            }

            models[model].updateOne({ _id: request.params.id }, { $set: request.body }, function(error, results) {
                respondWithJson(error, results, response,
                    {model: model, action: "PUT", id: request.params.id, data: request.body});
            });
        });

        /* DELETE -- Delete model by ID. */
        app.delete('/api/' + model + '/:id', function(request, response) {
            models[model].deleteOne({ _id: request.params.id }, function(error, results) {
                respondWithJson(error, results, response,
                    {model: model, action: "DELETE", id: request.params.id});
            });
        });
    }
}

module.exports = register_api_routes