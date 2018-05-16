"use strict";
var mongoose = require('mongoose');
//var Scheme = require('../models/scheme');
// var AMFIScheme = require('../models/amfischeme');
var transaction = require('../models/transaction');
var sip = require('../models/SIP');
var lumpsum = require('../models/lumpsum');
// var lineReader = require('line-reader');
var moment = require('moment');
var UpcomingTransaction = require('../models/upcomingTransaction');

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
    console.log("Adding lumpsum........")
    //console.log(JSON.stringify(newLumpsum));      
    newLumpsum.save( (err) => {
          if(err)	console.log("Error :: " + err);                                    
          callback(null, _clone(newLumpsum));		
    });
  },
  AddTransacton: function(newTransac, callback) {          
    console.log("Adding transact........")
    //console.log(JSON.stringify(newTransac));      
    newTransac.save( (err) => {
          if(err)	console.log("Error :: " + err);                                    
          callback(null, _clone(newTransac));		
    });
  }, 

  AddUpcomingTransacton: function(newTransac, callback) {          
    console.log("Adding upcoming transact........")
    //console.log(JSON.stringify(newTransac));      
    newTransac.save( (err) => {
          if(err)	console.log("Error :: " + err);                                    
          callback(null, _clone(newTransac));		
    });
  },

  getAllTodaysTransactions: function(callback) {
    console.log("Getting today's transactions");

    var today = moment().startOf('day');
    var tomorrow = moment(today).add(1, 'days');

    console.log("today : "+today);
    console.log("tomorrow : "+tomorrow);

    UpcomingTransaction.find({
      startdate: {
        $gte: today.toDate(),
        $lt: tomorrow.toDate()
      }},
      (err, transacs) => {
        if(err)	console.log("Error :: " + err);
        callback(null, _clone(transacs));
      }
    );
  },
  
  getAllUpcomingTransactions: function(uid, callback) { 
    console.log("upcoming : "+uid);
    // UpcomingTransaction.find({'user_id':uid}, (err, schemes) => {
    //         if(err)	console.log("Error :: " + err);
    //         callback(null, _clone(schemes));
    // });

    UpcomingTransaction
    .find({'user_id':uid})
    .sort({'startdate': -1})
    // .limit(4)
    .exec((err, schemes) => {
      if(err)	console.log("Error :: " + err);
      callback(null, _clone(schemes));
});
  },

  updateUpcomingTransactionbyId: function(id, body, callback) {
    console.log("update upcoming : "+id);
    console.log("update upcoming : "+JSON.stringify(body));
    //console.log("update upcoming : "+body.startdate);
    console.log("update upcoming date: "+body['startdate']);

    UpcomingTransaction.findByIdAndUpdate(id, {
      startdate: body['startdate'],      
    }, (err, schemeToUpdate) => {
      if(err)	console.log("Err :: "+ err);
      callback (null, _clone(schemeToUpdate));
    });			
  },

  getAllTransactions: function(uid, callback) {
    console.log("all : "+uid);                
    //transaction.find({},{"sort" : [['date_bought', '1']]}, (err, schemes) => {
    transaction
      .find({'user_id':uid})
      .sort({'date_bought': -1})      
      .exec((err, schemes) => {
        if(err)	console.log("Error :: " + err);
        callback(null, _clone(schemes));
    });
  },

  getLimitedAllTransactions: function(uid, callback) {
    console.log("all : "+uid);                
    //transaction.find({},{"sort" : [['date_bought', '1']]}, (err, schemes) => {
    transaction
      .find({'user_id':uid})
      .sort({'date_bought': -1})
      .limit(5)
      .exec((err, schemes) => {
        if(err)	console.log("Error :: " + err);
        callback(null, _clone(schemes));
    });
  },

  getDistinctSchemesFromAllTransactions: function(uid, callback) {
    console.log("all : "+uid);                
    //transaction.find({},{"sort" : [['date_bought', '1']]}, (err, schemes) => {
    transaction      
      .distinct('schemeName', {'user_id':uid})      
      .exec((err, schemeNames) => {
        if(err)	console.log("Error :: " + err);
        console.log("distinct : "+JSON.stringify(schemeNames));
        callback(null, _clone(schemeNames));
    });
  }
  
};
      
module.exports = transactionDbApi ;
      