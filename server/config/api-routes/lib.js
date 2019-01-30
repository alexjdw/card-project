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


/** checkObjExactlyImplementsSchema(obj, schema) -> boolean
    Confirms that an object exactly matches a schema. If true, obj can be used to create an instance of schema directly without trimming any extra data. */
function checkObjExactlyImplementsSchema(obj, schema) {
    return checkObjIsSubsetOfSchema(obj, schema) && checkObjIsSubsetOfSchema(schema, obj)
}

module.exports = {
    checkObjExactlyImplementsSchema: checkObjExactlyImplementsSchema,
    checkObjIsSubsetOfSchema: checkObjIsSubsetOfSchema,
    respondWithJson: respondWithJson
}

// //quick tests
// function assert(test, message) {
//     if (!test) { 
//         console.log(message)
//      }
// }
// var schema1 = {name: String, list: [String]}
// var works = {name: "Alex", list: []}
// var failboth = {body: "b"}
// var fail1 = {list: []}

// var nestedschema = {name: {taco: ''}}
// var nestedwin = {name: {taco: 'Taco!'}}

// var complex = {
//     a: {aa: {aaa: String}},
//     b: {bb: {bbb: []}},
//     c: [],
//     d: String
//     }
// var complexwin =
//     {
//     a: {aa: {aaa: ''}},
//     b: {bb: {bbb: []}},
//     c: [],
//     d: ''
//     }

// var complexfail = {
//     a: {aa: ''},
//     b: {bb: {bbb: []}},
//     c: [],
//     d: ''
//     }

// var complexfail2 = {
//     a: {aa: {aaa: ''}},
//     b: {bb: {bbb: ''}},
//     c: [],
//     d: ''
//     }

// assert(checkObjExactlyImplementsSchema(works, schema1),
//     "works should pass checkObjExactlyImplementsSchema");

// assert(!checkObjExactlyImplementsSchema(fail1, schema1),
//     "fail1 should fail checkObjExactlyImplementsSchema");

// assert(checkObjIsSubsetOfSchema(fail1, schema1),
//     "fail1 should pass checkObjIsSubsetOfSchema");

// assert(!checkObjIsSubsetOfSchema(failboth, schema1),
//     "failboth should fail checkObjIsSubsetOfSchema")

// assert(!checkObjExactlyImplementsSchema(fail1, nestedschema),
//     "fail1 should fail checkObjExactlyImplementsSchema");

// assert(checkObjExactlyImplementsSchema(nestedwin, nestedschema),
//     "nestedwin should pass checkObjExactlyImplementsSchema");

// assert(checkObjExactlyImplementsSchema(complexwin, complex),
//     "complexwin should pass checkObjExactlyImplementsSchema")

// assert(!checkObjExactlyImplementsSchema(complexfail, complex),
//     "complexfail should fail checkObjExactlyImplementsSchema")

// assert(!checkObjExactlyImplementsSchema(complexfail2, complex),
//     "complexfail2 should fail checkObjExactlyImplementsSchema")