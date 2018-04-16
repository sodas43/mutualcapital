




var mongoose = require('mongoose');
// require('mongoose-double')(mongoose);

// define the schema for our user model
var SchemaTypes = mongoose.Schema.Types;

var schemeSchema = mongoose.Schema({
        schemeName        : String,
        schemeDescription : String,
        // schemeNAV         : mongoose.Schema.Types.Double,
        schemeNAV         : Number,
        subCategory       : String,
        // categoryID        : { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
        categoryName      : { type: mongoose.Schema.Types.String, ref: 'Category' }
},
{ collection: 'Scheme' }
);

// create the model for users and expose it to our app
module.exports = mongoose.model('Scheme', schemeSchema);