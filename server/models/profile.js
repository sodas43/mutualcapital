var mongoose = require('mongoose');

// define the schema for our user model
var SchemaTypes = mongoose.Schema.Types;

var ProfileSchema = mongoose.Schema({
    PAN    : {
        no          : String,
        verified    : Boolean,
        KYCVerified : Boolean
    },
    bank   : {
        name: String,
        acno: Number,
        branch: String,
        city: String,
        IFSC: String,
        payout: String
    },
    mobile  : Number,
    user_id : { type: mongoose.Schema.Types.ObjectId, ref: 'User'}       
},
{ collection: 'user_profile' }
);

// create the model for users and expose it to our app
module.exports = mongoose.model('user_profile', ProfileSchema);