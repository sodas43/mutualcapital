"use strict";
var mongoose = require('mongoose');
var Scheme = require('../models/scheme');
var AMFIScheme = require('../models/amfischeme');
var transaction = require('../models/transaction');
var lineReader = require('line-reader');

var _clone = function(item) {
        return JSON.parse(JSON.stringify(item));
};


var SchemeDbApi = {

        Add: function(scheme, callback) {          
                //console.log("Adding ........")
                //console.log(JSON.stringify(scheme));      
                scheme.save( (err) => {
                        if(err)	console.log("Error :: " + err);                                    
                        callback(null, _clone(scheme));		
                });
        },
      
        getAllSchemes: function(callback) {                
                Scheme.find({}, (err, schemes) => {
                        if(err)	console.log("Error :: " + err);
                        callback(null, _clone(schemes));
                });

                // //JUST FOR TESTING PURPOSE
                // transaction.find({}, (err, transactions) => {
                //         if(err)	console.log("Error :: " + err);
                //         callback(null, _clone(transactions));
                // });

        },
      
        getSchemeById: function(id, callback) {
                console.log("calling getSchemeById");
                //scheme.findById({'_id': ObjectId(id)}, (err, scheme) => {
                Scheme.findById(id, (err, scheme) => {
                        if(err)	console.log("Error :: " + err);      
                        callback (null, _clone(scheme));				
                });		
        },

        getSchemeNAV: function(name, callback) {
                console.log("calling getSchemeNAV : "+name);
                //scheme.findById({'_id': ObjectId(id)}, (err, scheme) => {
                Scheme.find({schemeName: name}, 'schemeNAV', (err, NAV) => {
                        if(err)	console.log("Error :: " + err);
                        console.log("NAV == "+NAV);
                        callback (null, _clone(NAV));				
                });		
        }, 

        getSchemeByName: function(name, callback) {
                console.log("calling getSchemeByName : "+name);
                //scheme.findById({'_id': ObjectId(id)}, (err, scheme) => {
                Scheme.find({schemeName: name}, 'schemeNAV schemeCode oneYrRet threeYrRet fiveYrRet', (err, scheme) => {
                        if(err)	console.log("Error :: " + err);      
                        callback (null, _clone(scheme));				
                });		
        },
      
        updateSchemeById: function(id, body, callback) {
                //console.log("updateBookById: id = " + id);
                Scheme.findByIdAndUpdate(id, {
                        schemeName: body.schemeName,
                        schemeDescription: body.schemeDescription,
                        schemeNAV: body.schemeNAV
                }, (err, schemeToUpdate) => {
                        if(err)	console.log("Err :: "+ err);
                        callback (null, _clone(schemeToUpdate));
                });			
        },

        updateScheme: function(body, callback) {
            console.log("updateScheme: schemeName = " + body.schemeName);
            console.log("updateScheme: body = " + JSON.stringify(body));
                
            var query = {"schemeName": body.schemeName};
            var update = {
              "categoryName": body.categoryName,
              "subCategory": body.subCategoryName,
              "schemeCode": body.schemeCode,
              "schemeType": body.schemeType,
              "schemeNAV": body.schemeNAV,
              "oneYrRet": body.oneYrRet,
              "threeYrRet": body.threeYrRet,
              "fiveYrRet": body.fiveYrRet
            };
            var options = {new: true};
            
            Scheme.findOneAndUpdate(query, update, options, (err, scheme) => {
                if(err) console.log("Err :: "+ err);
                                          
                callback(null, _clone(scheme));
            });			
        },
      
        updateSchemeNAV: function(scheme, callback) {
          console.log("updateScheme: schemeName = " + scheme.schemeName);
          console.log("updateScheme: scheme = " + JSON.stringify(scheme));
              
          var query = {"schemeCode": scheme.schemeCode};
          var update = {            
            "schemeNAV": scheme.schemeNAV,            
          };
          var options = {new: true};
          
          Scheme.findOneAndUpdate(query, update, options, (err, scheme) => {
              if(err) console.log("Err :: "+ err);
                                        
              callback(null, _clone(scheme));
          });			
        },
    
        // deleteSchemeById: function(id, callback) {
        //         Scheme.findByIdAndRemove(id, (err, scheme) => {
        //                 if(err)	console.log("Err :: "+ err);
        //                 callback(null, _clone(scheme));		
        //         });        
        // },

      
};
      
module.exports = SchemeDbApi ;
      