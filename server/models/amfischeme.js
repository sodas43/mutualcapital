




var mongoose = require('mongoose');
// require('mongoose-double')(mongoose);

// define the schema for our user model
var SchemaTypes = mongoose.Schema.Types;

var schemeSchema = mongoose.Schema({
        schemeName        : String,
        schemeCode        : Number,        
        schemeNAV         : Number
        // subCategory       : String,
        // // categoryID        : { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
        // categoryName      : { type: mongoose.Schema.Types.String, ref: 'Category' },
        // schemeType        : String,
        // oneYrRet          : Number,
        // threeYrRet        : Number,
        // fiveYrRet         : Number
},
{ collection: 'AMFIScheme' }
);

// create the model for users and expose it to our app
module.exports = mongoose.model('AMFIScheme', schemeSchema);