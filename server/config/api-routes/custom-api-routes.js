var models = require('../../models/models.js');
var lib = require('./lib');
var bcrypt = require('bcryptjs');
var respondWithJson = lib.respondWithJson;
var checkObjIsSubsetOfSchema = lib.checkObjIsSubsetOfSchema // use to validate update requsts.
var checkObjExactlyMatchesSchema = lib.checkObjExactlyMatchesSchema //use to validate create requests.


/** in: request.body object */
function validate_user(user) {
    // Ensures the user has an 8-character alphanumeric password with at least one capital letter and one symbol.
    let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    // Ensures valid email
    let emailRegex = new RegExp("^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$");
 
    return strongRegex.test(user.password) && emailRegex.test(user.email) && user.password == user.confirm;
}

function encrypt_pw(pw) {
    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(pw, salt);
}

module.exports = function(app) {
    //Custom API routes go here.

    /** Get user route */
    app.get('/api/user/:id', function(request, response) {
        models.User.findById(request.params.id, function(error, user) {
            respondWithJson(error, user, response, context({context: "Looking up a user."}));
        });
    });

    /** Authenticate user route */
    app.post('/api/user/auth', function(request, response) {
        if (!request.body.email || request.body.password) {
            response.json({error: "Please ensure to include 'email' and 'password' in your submission."});
        } else {
            models.User.find({email: request.body.email}, (error, user) => {
                if (error) {
                    response.json({
                        error: "There was an error of some kind when looking up the user.",
                        dbErrorObject: error
                    });
                } else if (user) {
                    if (bcrypt.compareSync(request.body.password, user.password)) {
                        request.session['_id'] = user._id;
                        request.session['email'] = user.email;
                        response.json({_id: user._id, authenticated: true});
                    } else {
                        response.json({_id: '', authenticated: false, error: "User failed authentication."});    
                    }
                } else {
                    response.json({_id: '', authenticated: false, error: "User failed authentication."});
                }
            });
        }
    });

    app.post('/api/user', function(request, response) {
        console.log(request.body);
        if (!validate_user(request.body)) {
            response.json({error: "User failed validation. Please ensure password matches confirm field, email is in x@y.z format, password is strong enough."})
        } else {
            var user = {
                email: request.body.email,
                password: encrypt_pw(request.body.password),
                card_templates: [],
                saved_cards: [],
                sent_cards: []
            }
            models.User.create(user, function(error, new_user) {
                if (error) {
                    response.json({error: error, context: "User passed validation, attempting to create in DB."})
                } else {
                    request.session['_id'] = user._id;
                    request.session['email'] = user.email;
                    respondWithJson(error, new_user, response);
                }
            });
        }
    });
}