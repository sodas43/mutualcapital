"use strict";
var mongoose = require('mongoose');
var Profile = require('../models/profile');
var User       = require('../models/user');

var _clone = function(item) {
  return JSON.parse(JSON.stringify(item));
};

var ProfileDbApi = {

  Add: function(profile, callback) {          
    //console.log("Adding ........")
    //console.log(JSON.stringify(profile));      
    profile.save( (err) => {
      if(err)	{ 
        console.log("Error :: " + err);        
      }
      callback(null, _clone(profile));		
    });
  },

  getAllProfiles: function(callback) {
    //console.log("getAllProfiles API");          
    Profile.find({}, (err, profiles) => {
      if(err)	console.log("Error :: " + err);
      callback(null, _clone(profiles));
    });		
  },

  // getProfileByUserId: function(uid, callback) {
  //   //console.log("getProfileByUserId API");    
  //   console.log("uid : "+uid);
  //   Profile.find({"user_id": uid}, (err, profile) => {
  //     if(err)	console.log("Error :: " + err);
  //     console.log("getProfileByUserId : "+profile);
  //     callback(null, _clone(profile));
  //   });		
  // },

  getProfileByUserId: function(uid, callback) {
    //console.log("getProfileByUserId API");    
    console.log("uid : "+uid);
    User.findById(uid, (err, profile) => {
      if(err)	console.log("Error :: " + err);
      console.log("getProfileByUserId : "+profile);
      callback(null, _clone(profile));
    });		

    // User.find({'_id':uid}, (err, profile) => {
    //   if(err)	console.log("Error :: " + err);
    //   console.log("getEmailMobileByUserId1 : "+profile);
    //   callback(null, _clone(profile));
    // });		
  },

  updateMobileByUserId: function(id, body, callback) {
      //console.log("ProfileByUserId: id = " + id);
      //var query = {"_id": uid};
      User.findByIdAndUpdate(id, {"mobile": body.mobile}, (err, profile) => {
        if(err) console.log("Err :: "+ err);
        
        callback(null, _clone(profile));
      });     
  },

  updatePANByUserId: function(id, body, callback) {
    //console.log("ProfileByUserId: id = " + id);
    //var query = {"_id": uid};
    User.findByIdAndUpdate(id, {"PAN.no": body.PAN}, (err, profile) => {
      if(err) console.log("Err :: "+ err);
      
      callback(null, _clone(profile));
    });     
  },

  updateBankByUserId: function(id, body, callback) {
    //console.log("ProfileByUserId: id = " + id);
    //var query = {"_id": uid};
    User.findByIdAndUpdate(id, {
      "bank.name"   : body.bankName,
      "bank.acno"   : body.acno,
      "bank.branch" : body.branch,
      "bank.city"   : body.city,
      "bank.IFSC"   : body.IFSC,
      "bank.payout" : body.payout
    }, 
    (err, profile) => {
      if(err) console.log("Err :: "+ err);
      
      callback(null, _clone(profile));
    });     
},

  updatePasswordByUserId: function(id, body, callback) {
    //console.log("ProfileByUserId: id = " + id);
    //var query = {"_id": uid};

    User.findById(id, (err, user) => {
        if(err) {
          console.log("Err :: "+ err);
        }
        else if (!user.validPassword(body.password)) {
          console.log("password should not be previous one");
          let msg = {
            message: 'Password Policy Did not match'
          };
          
          callback(null, _clone(msg));
          //return res.status(409).json({ message: ' Password Policy Did not match' });
        }
        else {
          var newpwd = user.generateHash(body.password);
          User.update({'_id': id}, { $set: { 'local.password': newpwd }},(err, profile) => {
            if(err) console.log("Err :: "+ err);
            
            callback(null, _clone(profile));
          });     
        }
    })

    // var pwd = 
    // User.findByIdAndUpdate(id, {"mobile": body.mobile}, (err, profile) => {
    //   if(err) console.log("Err :: "+ err);
      
    //   callback(null, _clone(profile));
    // });     
  },

  // deleteCategoryById: function(id, callback) {
  //         Category.findByIdAndRemove(id, (err, category) => {
  //                 if(err)	console.log("Err :: "+ err);
  //                 callback(null, _clone(category));		
  //         });        
  // }      
};
      
module.exports = ProfileDbApi ;
      