var mongoose = require('mongoose');

// define the schema for our user model
var categorySchema = mongoose.Schema({
        categoryName        : {type: String, unique: true },
        categoryDescription : String
},
{ collection: 'Category' }
);

// create the model for users and expose it to our app
module.exports = mongoose.model('Category', categorySchema);
