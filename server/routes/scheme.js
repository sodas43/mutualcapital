
var express = require('express');
var router = express.Router();
var Scheme = require('../models/scheme');
var AMFIScheme = require('../models/amfischeme');
var SchemeDbApi = require('../DbApi/SchemeDbApi');
var lineReader = require('line-reader');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function toJSON(str) {
	var cells = str.split('\n').map(function (el) { return el.split(/\;/); });
	var headings = cells.shift();
	var NAV='';
	var out = cells.map(function (el) {
		var obj={};
		for (var i = 0, l = el.length; i < l; i++) {
			//obj[headings[i]] = isNaN(Number(el[i])) ? el[i] : +el[i];
			if (headings[i] === 'Scheme Code') { 
					obj['schemeCode'] = ((isNaN(Number(el[i])) ? el[i] : +el[i]));
			}
			if (headings[i] === 'Scheme Name') { 
					obj['schemeName'] = ((isNaN(Number(el[i])) ? el[i] : +el[i]));
			}
			if (headings[i] === 'Net Asset Value') { 
					obj['schemeNAV'] = ((isNaN(Number(el[i])) ? el[i] : +el[i]));
			}
		}
		var scheme = new Scheme({
			schemeName: obj['schemeName'],
			schemeCode: obj['schemeCode'],
			schemeNAV: obj['schemeNAV'],
			oneYrRet: getRandomInt(1, 10),
			threeYrRet: getRandomInt(5, 15),
			fiveYrRet: getRandomInt(8, 25)
		});
		console.log(scheme);
		SchemeDbApi.updateSchemeNAV(scheme, function(err, scheme) {
	  		//res.json(scheme);
		});
		// SchemeDbApi.Add(scheme, function(err, scheme) {
		// 	//res.json(scheme);
		// });
		return obj;
	});
	
	//console.log(JSON.stringify(out, null, 2));	
}

function getSchemeNAV() {
		
	console.log("calling getSchemeNAV");
	//scheme.findById({'_id': ObjectId(id)}, (err, scheme) => {
	var header = "Scheme Code;ISIN Div Payout/ ISIN Growth;ISIN Div Reinvestment;Scheme Name;Net Asset Value;Repurchase Price;Sale Price;Date";
	console.log("GETNAV");
	//READ file -- Bypass lines without ';'
	var firstLine=true;
	lineReader.eachLine("file.txt", function(line, last) {
			//console.log(line);
			var str = line;
			if ((str.search(';')) >=0 ) {
				
					//var n = str.search(schemeName);
					if(firstLine == false) {
							
							// if(	str.search('Aditya')>= 0 ||
							// 	str.search('DSP')>= 0 ||
							// 	str.search('HDFC')>= 0 ||
							// 	str.search('ICICI')>= 0 ||
								if (str.search('Axis')>= 0 ||
								str.search('DSP')>= 0 ||
								str.search('HDFC')>= 0
							) {
								console.log("Found : " +str);
								var s = header+'\n'+str;
								//console.log("s : "+s);
								toJSON(s);
							}
							
					}
					if (firstLine == true) { firstLine = false; }
			}
	});  	
}

//getSchemeNAV();
// ===================================================================
//                         S C H E M E S
// ===================================================================

// ADD
router.post("/AddScheme", function(req, res) {
	var scheme = new Scheme ({
        schemeName: req.body.schemeName,
        schemeDescription: req.body.schemeDescription,
				schemeNAV: req.body.schemeNAV,
				subCategory: req.body.subCategory?req.body.subCategory:"",
        categoryName: req.body.categoryName?req.body.categoryName:""
	});
	// console.log("calling post /AddCategory");
	// console.log("Data : " + JSON.stringify(req.body));
      
	// console.log("in post" + JSON.stringify(category, null, 2));
      	
	SchemeDbApi.Add(scheme, function(err, scheme) {
	  res.json(scheme);
	});
})

router.post("/UpdateScheme", function(req, res) {
	    	
	SchemeDbApi.updateScheme(req.body, function(err, scheme) {
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

router.get('/getSchemeDetails/:schemeName', function(req, res) {
	console.log("get /getSchemeDetails/"+req.params.schemeName);
	SchemeDbApi.getSchemeByName(req.params.schemeName, function(err, scheme) {
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


// GET PARTICULAR SCHEME NAV
router.get('/getSchemeNAV/:schemeName', function(req, res) {
	console.log("get /getSchemeNAV/"+req.params.schemeName);
	SchemeDbApi.getSchemeNAV(req.params.schemeName, function(err, NAV) {
	  res.json(NAV);
	});
});


module.exports = router;