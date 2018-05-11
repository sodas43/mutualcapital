var mongoose = require('mongoose');

// define the schema for our user model
var SchemaTypes = mongoose.Schema.Types;

var SIPSchema = mongoose.Schema({
        schemeName : String,                
        amt        : Number,
        duration   : Number,
        startdate  : Date,
        date_bought: Date,
        user_id    : { type: mongoose.Schema.Types.ObjectId, ref: 'User'}       
},
{ collection: 'SIP' }
);

// create the model for users and expose it to our app
module.exports = mongoose.model('SIP', SIPSchema);