var mongoose = require('mongoose');

// define the schema for our user model
var SchemaTypes = mongoose.Schema.Types;

var lumpsumSchema = mongoose.Schema({
        schemeName : String,                
        amt        : Number,
        date_bought: Date,
        user_id    : { type: mongoose.Schema.Types.ObjectId, ref: 'User'}       
},
{ collection: 'lumpsum' }
);

// create the model for users and expose it to our app
module.exports = mongoose.model('lumpsum', lumpsumSchema);