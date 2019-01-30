var models = require('../../models/models.js').api
var lib = require('./lib')
var respondWithJson = lib.respondWithJson;
var checkObjIsSubsetOfSchema = lib.checkObjIsSubsetOfSchema // use to validate update requsts.
var checkObjExactlyMatchesSchema = lib.checkObjExactlyMatchesSchema //use to validate create requests.

module.exports = function(app) {
    //Custom API routes go here.
}