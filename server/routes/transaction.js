var express = require('express');
var router = express.Router();
var transaction = require('../models/transaction');
var upcomingTransaction = require('../models/upcomingTransaction');
var sip = require('../models/SIP');
var lumpsum = require('../models/lumpsum');
var TransactionDbApi = require('../DbApi/transactionDBApi');
var Scheme = require('../models/scheme');
var SchemeDbApi = require('../DbApi/SchemeDbApi');
var stripe = require('stripe')(process.env.STRIPE_KEY);
var schedule = require('node-schedule');
var moment = require('moment');

// ===================================================================
//                         T R A N S A C T I O N S
// ===================================================================
function generateTransNo() {
    return (Math.floor(Math.random()*900000) + 100000); // 6 digits
}

function getAllTodaysTransactions() {
    TransactionDbApi.getAllTodaysTransactions(function(err, items) {
        console.log("today's trans : "+JSON.stringify(items));
        /** TODO: loop through all items. For each item:
         *      1. get the scheme name
         *      2. call SchemeDbApi.getSchemeNAV(schemeName) to get the NAV.
         *      3. on success, insert into transaction table with this NAV and
         *      4. Update this schemes upcoming transaction date by 1 month.
         *      5. Repeat
         */ 
        var trans_today = items;
        trans_today.forEach(element => {
            console.log(element.schemeName);
            let newStartDate = moment(element.startdate).add(1, 'months');
            console.log(element.startdate);
            console.log(newStartDate);

            SchemeDbApi.getSchemeNAV(element.schemeName, function(err, NAV) {
                if (err) { console.log("Err: "+err); return; }
                if(NAV) {
                  // console.log(JSON.stringify(NAV));
                  console.log(NAV[0]['schemeNAV']);
                  var unitsBought = Math.floor(element.amt / NAV[0]['schemeNAV']);
                  // console.log("amt: "+element.amt);
                  // console.log(unitsBought);
  
                  var newTrans = new transaction ({
                      schemeName   : element.schemeName,                
                      amt          : element.amt,
                      trans_type   : 'SIP',
                      trans_no     : generateTransNo(),
                      units_bought : unitsBought,
                      NAV          : NAV[0]['schemeNAV'],
                      date_bought  : new Date(),
                      sipCnt       : (element.sipCnt ? (element.sipCnt+1) : 1),
                      user_id      : element.user_id        
                  });
                      
                  console.log("new trans : "+JSON.stringify(newTrans));
                  
                    TransactionDbApi.AddTransacton(newTrans, function(err, newTrans) {
                      //res.json(newTrans);
                      let newStartDate = moment(element.startdate).add(1, 'months');
                      console.log(newStartDate);
                      let obj = {
                          startdate: newStartDate
                      }
                      TransactionDbApi.updateUpcomingTransactionbyId(element._id, obj, function(err, items) {
                        //res.json(items);
                      });
                    });
                  
                  
                }
                
                    
            })

        });
        //console.log(trans_today[0]['schemeName']);
        //console.log(trans_today[1]['schemeName']);
        
    });
}
// function unitCount(schemeName, amount) {
//     var NAV = 1;
//     SchemeDbApi.getSchemeByName(schemeName, function(err, scheme) {
//         //res.json(scheme);
//         console.log("scheme : "+JSON.stringify(scheme));
//         let data = JSON.parse(JSON.stringify(scheme));
//         console.log(data[0]['schemeNAV']);
//         NAV = data[0]['schemeNAV'];
//         console.log(NAV);
//         console.log("Units bought : "+Math.floor(amount / NAV));
//         return (Math.floor(amount / NAV));
//     });
 
//}
//unitCount("HDFC Top 200 Fund - Dividend Option");
//getAllTodaysTransactions();
var rule = new schedule.RecurrenceRule();
rule.hour=16;
rule.minute=50;
rule.second=0;

var upDateNAVDaily = schedule.scheduleJob(rule, function() {
	getAllTodaysTransactions();  
});

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
    console.log("in /AddLumpsum "+req.body);
	var newLumpsum = new lumpsum ({
        schemeName : req.body.schemeName,                
        amt        : req.body.amt,
        date_bought: req.body.date_bought,
        user_id    : req.body.user_id        
    });
    
    // res.render('../views/payment', {
    //     title: 'Confirm Payment'
    // });

	TransactionDbApi.AddLumpsum(newLumpsum, function(err, newLumpsum) {
	  res.json(newLumpsum);
	});
})

// ADD TRANSACTION
router.post("/AddTransaction", function(req, res) {
    console.log("in /AddTransaction "+req.body);

	var newTrans = new transaction ({
        schemeName   : req.body.schemeName,                
        amt          : req.body.amt,
        trans_type   : req.body.trans_type,
        trans_no     : generateTransNo(),
        units_bought : req.body.units_bought,
        NAV          : req.body.NAV,
        date_bought  : req.body.date_bought,
        user_id      : req.body.user_id        
    });
          	
	TransactionDbApi.AddTransacton(newTrans, function(err, newTrans) {
	  res.json(newTrans);
	});
})

// ADD UPCOMING TRANSACTION
router.post("/AddUpcomingTransaction", function(req, res) {
    console.log("in /AddUpcomingTransaction "+req.body);

	var newTrans = new upcomingTransaction ({
        schemeName   : req.body.schemeName,                
        amt          : req.body.amt,
        trans_type   : req.body.trans_type,
        startdate    : req.body.startdate,
        user_id      : req.body.user_id        
    });
          	
	TransactionDbApi.AddUpcomingTransacton(newTrans, function(err, newTrans) {
	  res.json(newTrans);
	});
})

// GET ALL UPCOMING TRANSACTIONs
router.get('/listUpcomingTransactions/:uid', function(req, res) {
    console.log("list upcoming : "+req.params.uid);
	TransactionDbApi.getAllUpcomingTransactions(req.params.uid, function(err, items) {
	  res.json(items);
    });
})

// GET ALL TRANSACTIONs
router.get('/listAllTransactions/:uid', function(req, res) {
    console.log("list all : "+req.params.uid);
	TransactionDbApi.getAllTransactions(req.params.uid, function(err, items) {
      console.log(JSON.stringify(items));
	  res.json(items);
    });
})

// GET LIMITED ALL TRANSACTIONs
router.get('/listLimitedAllTransactions/:uid', function(req, res) {
  console.log("list all : "+req.params.uid);
  TransactionDbApi.getLimitedAllTransactions(req.params.uid, function(err, items) {
    console.log(JSON.stringify(items));
  res.json(items);
  });
})

router.get('/listDistinctSchemesFromAllTransactions/:uid', function(req, res) {
  console.log("list DistinctSchemes : "+req.params.uid);
  TransactionDbApi.getDistinctSchemesFromAllTransactions(req.params.uid, function(err, items) {
    console.log(JSON.stringify(items));
    res.json(items);
  });
})


//PROCESS STRIPE PAYMENT
router.post("/payment", function(req, res) {
    var cardToken = req.body.cardToken;
	var amount = req.body.amount;
    console.log("card token : "+ cardToken);
    console.log("amt : "+ amount);

	// stripe.customers.create({
	// 	source: cardToken,
	// 	description: "User Payment" // this is usually the user email
	// }).then(function(customer) {
        var charge = stripe.charges.create({
            amount: parseInt(parseFloat(amount * 100), 10),
            currency: 'usd',
            source: cardToken,
            // customer: customer.id,
            description: 'Payment'
          }, function(err, charge) {
            if(err) {
              return res.status(500).json({ message: err })
            }

            // TransactionDbApi.AddLumpsum(newLumpsum, function(err, newLumpsum) {
	        //     //res.json(newLumpsum);
            // });
            
            // TransactionDbApi.AddTransacton(newTrans, function(err, newTrans) {
            //     //res.json(newTrans);
            // });

            res.status(200).json({ message: "Payment successful" });
        });
    //});
})


module.exports = router;
