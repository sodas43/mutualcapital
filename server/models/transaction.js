var mongoose = require('mongoose');
// require('mongoose-double')(mongoose);

// define the schema for our user model
var SchemaTypes = mongoose.Schema.Types;

var transactionSchema = mongoose.Schema({
        schemeName   : String,                
        amt          : Number,
        trans_type   : String,
        trans_no     : String,
        date_bought  : Date,
        units_bought : Number,
        user_id      : { type: mongoose.Schema.Types.ObjectId, ref: 'User'}     
},
{ collection: 'transactions' }
);

// create the model for users and expose it to our app
module.exports = mongoose.model('transaction', transactionSchema);