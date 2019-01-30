var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mean_project');


cardSchema = new mongoose.Schema({
    input_fields: [{ //This is for the form
        field_name: {
            type: String,
            required: true,
        },
        field_input_type: {
            // can be "input" or "textarea" so the user can get a big or small text box
            type: String,
            required: true,
        }
    }],
    background_image: {
        type: String,
        required: true
    },
    other_images: [{
        //Maybe the user can upload more images?
        name: String,
        url: String
    }],
    options: [String], //placeholder for other user choices that we could add.
    creator: {
        type: String,
        required: true
    },
    times_created: {
        type: Number,
        default: 0
    },
});


userCreatedCard = new mongoose.Schema({
    creator: {

    },
    sent: {
        type: Boolean,
        default: false
    },
    data: {

    },
    recipient_emails: {

    }
});


module.exports = {
    CardTemplate: mongoose.model('CardTemplate'),

    api: {
        /** Models that you want to expose an API for go here AND in the first level of the exports object. They can have different names.
        Note: the key is the API route. So bikes: mongoose.model('SuperDuperBikes') results in an api at /api/bikes */
        templates: mongoose.model('CardTemplate')
    }
}