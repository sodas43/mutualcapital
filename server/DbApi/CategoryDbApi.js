"use strict";
var mongoose = require('mongoose');
var Category = require('../models/category');

var _clone = function(item) {
        return JSON.parse(JSON.stringify(item));
};

var CategoryDbApi = {

        Add: function(category, callback) {          
                //console.log("Adding ........")
                //console.log(JSON.stringify(category));      
                category.save( (err) => {
                        if(err)	{ 
                                console.log("Error :: " + err);
                                //throw err;
                        }

                        callback(null, _clone(category));		
                });
        },
      
        getAllCategories: function(callback) {
                //console.log("getAllBooks API");
                //console.log(JSON.stringify(books));
                Category.find({}, (err, categories) => {
                        if(err)	console.log("Error :: " + err);
                        callback(null, _clone(categories));
                });		
        },
      
        getCategoryById: function(id, callback) {
                console.log("calling getCategoryById");
                //Category.findById({'_id': ObjectId(id)}, (err, category) => {
                Category.findById(id, (err, category) => {
                        if(err)	console.log("Error :: " + err);      
                        callback (null, _clone(category));				
                });		
        },

        getAllCategoryNames: function(callback) {
                //console.log("getAllBooks API");
                //console.log(JSON.stringify(books));
                Category.find({}, 'categoryName', (err, categoryNames) => {
                        if(err)	console.log("Error :: " + err);
                        console.log("getAllCategoryNames : "+categoryNames);
                        callback(null, _clone(categoryNames));
                });		
        },
      
        updateCategoryById: function(id, body, callback) {
                //console.log("updateBookById: id = " + id);
                Category.findByIdAndUpdate(id, {
                        categoryName: body.categoryName,
                        categoryDescription: body.categoryDescription
                }, (err, categoryToUpdate) => {
                        if(err)	console.log("Err :: "+ err);
                        callback (null, _clone(categoryToUpdate));
                });			
        },
      
        deleteCategoryById: function(id, callback) {
                Category.findByIdAndRemove(id, (err, category) => {
                        if(err)	console.log("Err :: "+ err);
                        callback(null, _clone(category));		
                });        
        }      
};
      
module.exports = CategoryDbApi ;
      