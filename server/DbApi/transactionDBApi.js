"use strict";
var mongoose = require('mongoose');
//var Scheme = require('../models/scheme');
// var AMFIScheme = require('../models/amfischeme');
var transaction = require('../models/transaction');
var sip = require('../models/SIP');
var lumpsum = require('../models/lumpsum');
// var lineReader = require('line-reader');

var _clone = function(item) {
  return JSON.parse(JSON.stringify(item));
};


var transactionDbApi = {

  AddSIP: function(newSip, callback) {          
    //console.log("Adding ........")
    //console.log(JSON.stringify(newSip));      
    newSip.save( (err) => {
            if(err)	console.log("Error :: " + err);                                    
            callback(null, _clone(newSip));		
    });
  },
  AddLumpsum: function(newLumpsum, callback) {          
    //console.log("Adding ........")
    //console.log(JSON.stringify(newLumpsum));      
    newLumpsum.save( (err) => {
          if(err)	console.log("Error :: " + err);                                    
          callback(null, _clone(newLumpsum));		
    });
  },
  AddTransacton: function(newTransac, callback) {          
    //console.log("Adding ........")
    //console.log(JSON.stringify(newTransac));      
    newTransac.save( (err) => {
          if(err)	console.log("Error :: " + err);                                    
          callback(null, _clone(newTransac));		
    });
  }, 
  
};
      
module.exports = transactionDbApi ;
      