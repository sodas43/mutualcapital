
var express = require('express');
var router = express.Router();
var Category = require('../models/category');
var CategoryDbApi = require('../DbApi/CategoryDbApi');

// ===================================================================
//                         C A T E G O R Y
// ===================================================================

// ADD
router.post("/AddCategory", function(req, res) {
	var category = new Category ({
             categoryName: req.body.categoryName,
	     categoryDescription: req.body.categoryDescription		      
	});
	// console.log("calling post /AddCategory");
	// console.log("Data : " + JSON.stringify(req.body));
      
	// console.log("in post" + JSON.stringify(category, null, 2));
      	
	CategoryDbApi.Add(category, function(err, category) {
		if (err) res.json(err);
	  res.json(category);
	});
})

// EDIT
router.put('/editCategory/:id', function(req, res) {
	//console.log("calling post /add");
	//console.log("Data : " + JSON.stringify(req.body));
	CategoryDbApi.updateCategoryById(req.params.id, req.body, function(err, items) {
		res.json(items);
	});
});
// GET ALL
router.get('/listCategory', function(req, res) {
	CategoryDbApi.getAllCategories(function(err, items) {
	  res.json(items);
      });
});

// GET PARTICULAR CATEGORY
router.get('/listCategory/:id', function(req, res) {
	console.log("get /listCategory/"+req.params.id);
	CategoryDbApi.getCategoryById(req.params.id, function(err, category) {
	  res.json(category);
	});
});

// GET ALL CATEGORY NAMES
router.get('/listCategoryNames', function(req, res) {
	CategoryDbApi.getAllCategoryNames(function(err, items) {
	  res.json(items);
  });
});

// DELETE
router.delete('/deleteCategory/:id', function(req, res) {
	//console.log('delete' + req.params.id);
	CategoryDbApi.deleteCategoryById(req.params.id, function(err, items) {
	  res.json(items);    
	});
});

router.get('*', function (req, res) {
  res.sendFile(path.join(__dirname + '/../../dist/index.html'));
});
module.exports = router;
