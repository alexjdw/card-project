var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mean_project');

CardTemplateCustomInput = new mongoose.Schema({
    top: {
        type: Number,
        required: true
    },
    left: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    options: {
        type: Object,
        required: false
    }
});

CardTemplateSchema = new mongoose.Schema({
   custom_inputs: [CardTemplateCustomInput],
   height: {
       type: Number,
       required: true
   },
   width: {
       type: Number,
       required: true
   },
   description: {
       type: String,
       required: true
   },
//    options: [String], //placeholder for other user choices that we could add.
   creator: {
       type: String,
       required: true
   },
   template_name: {
       type: String,
       required: true
   },
   bg_image_url: {
       type: String,
       required: true
   },
   created_count: {
       type: Number,
       default: 0
   },
});

CardSchema = new mongoose.Schema({
   creator: {
       type: String,
       required: true
   },
   template: {
       type: mongoose.Schema.Types.ObjectId,
       required: true
   },
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
       type: [{type: mongoose.Schema.Types.ObjectId, ref: "CardTemplate"}]
   },
   saved_cards: {
       type: [{type: mongoose.Schema.Types.ObjectId, ref: "Card"}]
   },
   sent_cards: {
       type: [{type: mongoose.Schema.Types.ObjectId, ref: "Card"}]
   }
});

mongoose.model('CardTemplate', CardTemplateSchema);
mongoose.model('Card', CardSchema);
mongoose.model('User', UserSchema);


module.exports = {
   CardTemplate: mongoose.model('CardTemplate'),
   Card: mongoose.model('Card'),
   User: mongoose.model('User'),

   api: {
       /** Models that you want to expose an API for go here AND in the first level of the exports object. They can have different names.
       Note: the dictionary key is the API route. So bikes: mongoose.model('SuperDuperBikes') results in an api at /api/bikes */
       templates: mongoose.model('CardTemplate'),
       cards: mongoose.model('Card'),
       users: mongoose.model('User')
   }
}
