var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mean_project');


CardTemplateSchema = new mongoose.Schema({
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
        name: String,
        url: String
    }],
    options: [String], //placeholder for other user choices that we could add.
    creator: {
        type: String,
        required: true
    },
    created_count: {
        type: Number,
        default: 0
    },
});

Card = new mongoose.Schema({
    creator: {
        type: String,
        required: true
    },
    template: {
        type: mongoose.Schema.types.ObjectId,
        required: true
    }
    sent: {
        type: Boolean,
        default: false
    },
    form_data: {
        type: Object,
        required: true
    },
    recipient_emails: {
        type: [String]
    }
});

UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    hashed_pw: {
        type: String,
    },
    card_templates: {
        type: [{type: mongoose.Schema.types.ObjectId, ref="CardTemplate"}]
    },
    saved_cards: {
        type: [{type: mongoose.Schema.types.ObjectId, ref="Card"}]
    },
    sent_cards: {
        type: [{type: mongoose.Schema.types.ObjectId, ref="Card"}]
    }
});

mongoose.model('CardTemplate', CardTemplateSchema);
mongoose.model('User', UserSchema);
mongoose.model('Card', Card);


module.exports = {
    CardTemplate: mongoose.model('CardTemplate'),
    User: mongoose.model('User')

    api: {
        /** Models that you want to expose an API for go here AND in the first level of the exports object. They can have different names.
        Note: the key is the API route. So bikes: mongoose.model('SuperDuperBikes') results in an api at /api/bikes */
        templates: mongoose.model('CardTemplate')
    }
}