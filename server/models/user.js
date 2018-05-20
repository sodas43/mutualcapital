// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local   : {
        email                : String,
        password             : String,
        firstName            : String,
        lastName             : String,
        isAdmin              : Boolean,
        resetPasswordToken   : String,
        resetPasswordExpires : Date       
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        email        : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    PAN              : {
        no           : String,
        verified     : Boolean,
        KYCVerified  : Boolean
    },
    bank             : {
        name         : String,
        acno         : Number,
        branch       : String,
        city         : String,
        IFSC         : String,
        payout       : String
    },
    mobile           : String
},
{ collection: 'AuthUsers' }
);

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
