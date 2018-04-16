"use strict";
var mongoose = require('mongoose');
var Scheme = require('../models/scheme');

var _clone = function(item) {
        return JSON.parse(JSON.stringify(item));
};

var SchemeDbApi = {

        Add: function(scheme, callback) {          
                //console.log("Adding ........")
                //console.log(JSON.stringify(scheme));      
                Scheme.save( (err) => {
                        if(err)	console.log("Error :: " + err);                                    
                        callback(null, _clone(scheme));		
                });
        },
      
        getAllSchemes: function(callback) {                
                Scheme.find({}, (err, schemes) => {
                        if(err)	console.log("Error :: " + err);
                        callback(null, _clone(schemes));
                });		
        },
      
        getSchemeById: function(id, callback) {
                console.log("calling getSchemeById");
                //scheme.findById({'_id': ObjectId(id)}, (err, scheme) => {
                Scheme.findById(id, (err, scheme) => {
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
      
        deleteSchemeById: function(id, callback) {
                Scheme.findByIdAndRemove(id, (err, scheme) => {
                        if(err)	console.log("Err :: "+ err);
                        callback(null, _clone(scheme));		
                });        
        }      
};
      
module.exports = SchemeDbApi ;
      