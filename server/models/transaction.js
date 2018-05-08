var mongoose = require('mongoose');
// require('mongoose-double')(mongoose);

// define the schema for our user model
var SchemaTypes = mongoose.Schema.Types;

var transactionSchema = mongoose.Schema({
        schemeName : String,
        type       : String,        
        amt        : Number,
        date       : Date       
},
{ collection: 'transaction' }
);

// create the model for users and expose it to our app
module.exports = mongoose.model('transaction', transactionSchema);