var mongoose = require('mongoose');

testModel = new mongoose.Schema({
    name: {
        type: string,
        required: true,
    }
});

mongoose.model('testmodel', testModel)

module.exports = {
    // All models go at the root level.
    test: mongoose.model('testmodel');

    api: {
        /** Models that you want to expose an API for go here.
            Copy/paste in the model from above.
            Note that the model will be exposed at /api/<modelname>, where modelname is
            the key in this dictionary. Example:
            
                bacon: monogose.model('breakfastmodel')

            ... exposes /api/bacon and all associated API routes.        
        */
        test: mongoose.model('testmodel');
    }    
}