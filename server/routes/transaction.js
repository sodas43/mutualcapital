var express = require('express');
var router = express.Router();
var transaction = require('../models/transaction');
var sip = require('../models/SIP');
var lumpsum = require('../models/lumpsum');
var TransactionDbApi = require('../DbApi/transactionDBApi');
var Scheme = require('../models/scheme');
var SchemeDbApi = require('../DbApi/SchemeDbApi');

// ===================================================================
//                         T R A N S A C T I O N S
// ===================================================================
function generateTransNo() {
    return (Math.floor(Math.random()*900000) + 100000); // 6 digits
}

function unitCount(schemeName) {
    var NAV = 1;
    SchemeDbApi.getSchemeByName(schemeName, function(err, scheme) {
        //res.json(scheme);
        console.log("scheme : "+JSON.stringify(scheme));
        let data = JSON.parse(JSON.stringify(scheme));
        console.log(data[0]['schemeNAV']);
        NAV = data[0]['schemeNAV'];
        console.log(NAV);
    });
    var gene = Math.floor(Math.random()*900000) + 100000; // 6 digits
    console.log("TransNo : "+gene);
}
//unitCount("HDFC Top 200 Fund - Dividend Option");

// ADD SIP
router.post("/AddSIP", function(req, res) {
	var newSip = new sip ({
        schemeName : req.body.schemeName,                
        amt        : req.body.amt,
        duration   : req.body.duration,
        startdate  : req.body.startdate,
        date_bought: req.body.date_bought,
        user_id    : req.body.user_id        
    });
          	
	TransactionDbApi.AddSIP(newSip, function(err, newSip) {
	  res.json(newSip);
	});
})

// ADD LUMPSUM
router.post("/AddLumpsum", function(req, res) {
	var newLumpsum = new lumpsum ({
        schemeName : req.body.schemeName,                
        amt        : req.body.amt,
        date_bought: req.body.date_bought,
        user_id    : req.body.user_id        
    });
    
    // res.render('../views/payment', {
    //     title: 'Confirm Payment'
    // });

	// TransactionDbApi.AddLumpsum(newLumpsum, function(err, newLumpsum) {
	//   res.json(newLumpsum);
	// });
})

// ADD TRANSACTION
router.post("/AddTransaction", function(req, res) {
	var newTrans = new transaction ({
        schemeName   : req.body.schemeName,                
        amt          : req.body.amt,
        trans_type   : req.body.trans_type,
        trans_no     : generateTransNo(),
        units_bought : unitsBought,
        date_bought  : req.body.date_bought,
        user_id      : req.body.user_id        
    });
          	
	TransactionDbApi.AddTransacton(newTrans, function(err, newTrans) {
	  res.json(newTrans);
	});
})

module.exports = router;