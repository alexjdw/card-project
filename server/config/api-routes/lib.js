function isDict(v) {
    return a.constructor == Object;
}

/** respond_with_json(error, results, response, context)
        error: any
            Pass in the mongoose "err" variable here.
        results: object
            Pass in the mongoose query results here.
        response: express response
            Express response object. Pass the one from the request.
        context?: any
            Context for the call. Optional. Takes anything that's printable. This prints if there's an error.

    Generic function that takes a Mongoose query result + express response object, and responds to the client with a json.*/
function respondWithJson(error, results, response, context) {
    if (error) {
        //DB Query failed for some reason. Handle the error here.
        console.log("Database call failed!");
        console.log(error)
        if (context) {
            console.log("This was the context for the error: ", context)
            response.status(500).json({ error: "Database call failed.", context: context })
        } else {
            response.status(500).json({ error: "It's broke" })
        };
    } else {
        response.json(results);
    }
}

/** checkObjIsSubsetOfSchema(obj, schema) -> boolean
    Confirms that all objects in obj are also in schema.
    Does not confirm that all objects in schema are in object.
    If true, object can be used to update another objected of the schema safely without adding new fields.*/
function checkObjIsSubsetOfSchema(obj, schema) {
    for (item in obj) {
        if (schema[item] === undefined) {
            return false;
        }
        if (isDict(obj[item])) {
            if (isDict(schema[item])) {
                if (!checkObjIsSubsetOfSchema(obj[item], schema[item])) {
                    return false;
                }
            } else {
                // console.log("Dictionaries don't line up", obj[item], schema[item])
                return false;
            }
        }
        if (Array.isArray(obj[item])) {
            if (!Array.isArray(schema[item])) {
                return false;
            }
        }
    }
    return true;
}


/** checkObjHasRequiredPaths(obj, schema) -> boolean
    Confirms that an object has all the required paths from a schema's requiredPaths array. If true, obj can be used to create an instance of schema directly without trimming any extra data. */
function checkObjHasRequiredPaths(obj, paths) {
    for (let path in paths) {
        path = paths[path].split('.');
        
        var runner = obj;
        for (p in path) {
            runner = runner[path[p]]
            if (runner === undefined) {
                return false;
            }
        }
    }
    return true;
}

module.exports = {
    checkObjHasRequiredPaths: checkObjHasRequiredPaths,
    checkObjIsSubsetOfSchema: checkObjIsSubsetOfSchema,
    respondWithJson: respondWithJson
}