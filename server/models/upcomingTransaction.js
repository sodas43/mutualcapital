var mongoose = require('mongoose');
// require('mongoose-double')(mongoose);

// define the schema for our user model
var SchemaTypes = mongoose.Schema.Types;

var upcomingTransactionSchema = mongoose.Schema({
        schemeName   : String,                
        amt          : Number,
        Tns_type   : String,
        startdate     : Date,        
        user_id      : { type: mongoose.Schema.Types.ObjectId, ref: 'User'}     
},
{ collection: 'upcomingTransactions' }
);

// create the model for users and expose it to our app
module.exports = mongoose.model('upcomingTransaction', upcomingTransactionSchema);