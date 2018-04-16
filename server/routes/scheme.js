
var express = require('express');
var router = express.Router();
var Scheme = require('../models/scheme');
var SchemeDbApi = require('../DbApi/SchemeDbApi');

// ===================================================================
//                         S C H E M E S
// ===================================================================

// ADD
router.post("/AddScheme", function(req, res) {
	var scheme = new Scheme ({
        schemeName: req.body.schemeName,
        schemeDescription: req.body.schemeDescription,
				schemeNAV: req.body.schemeNAV,
				subCategory: req.body.subCategory,
        categoryName: req.body.categoryName
	});
	// console.log("calling post /AddCategory");
	// console.log("Data : " + JSON.stringify(req.body));
      
	// console.log("in post" + JSON.stringify(category, null, 2));
      	
	SchemeDbApi.Add(scheme, function(err, scheme) {
	  res.json(scheme);
	});
})

// EDIT
router.put('/editScheme/:id', function(req, res) {
	//console.log("calling post /add");
	//console.log("Data : " + JSON.stringify(req.body));
	SchemeDbApi.updateSchemeById(req.params.id, req.body, function(err, items) {
		res.json(items);
	});
});
// GET ALL
router.get('/listScheme', function(req, res) {
	SchemeDbApi.getAllSchemes(function(err, items) {
	  res.json(items);
      });
});

// GET PARTICULAR SCHEME
router.get('/listScheme/:id', function(req, res) {
	console.log("get /listScheme/"+req.params.id);
	SchemeDbApi.getSchemeById(req.params.id, function(err, scheme) {
	  res.json(scheme);
	});
});

// DELETE
router.delete('/deleteScheme/:id', function(req, res) {
	//console.log('delete' + req.params.id);
	SchemeDbApi.deleteSchemeById(req.params.id, function(err, items) {
	  res.json(items);    
	});
});

module.exports = router;