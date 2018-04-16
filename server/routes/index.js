var express = require('express');
var router = express.Router();

var passportTwitter = require('../auth/twitter');
var User = require('../models/user');

var _clone = function(item) {
  return JSON.parse(JSON.stringify(item));
};

/* GET home page. */
// router.get('/', isLoggedIn, function(req, res, next) {
//   res.render('index', { title: ' Auth Express' });
// });

// // router.get('/login', function(req, res, next) {
// //   res.send('Go back and register!');
// // });

// router.get('/auth/twitter', passportTwitter.authenticate('twitter'));

// router.get('/auth/twitter/callback',
//   passportTwitter.authenticate('twitter', { failureRedirect: '/signup' }),
//   function(req, res) {
//     // Successful authentication
//     res.json(JSON.stringify(req.user));
//     // res.redirect ('/signup', {user: req.user} );
//   });

// router.get('/auth/current_user',
//   function(req, res) {
//       res.json(_clone(req.user));
//   });

//   function isLoggedIn(req, res, next) {
    
//         // if user is authenticated in the session, carry on
//         if (req.isAuthenticated()) {
//             console.log("User:" + req.user);
//             console.log("Res User:" + res.user);
//           return next();
//         }
           
    
//         // if they aren't redirect them to the home page
//         res.redirect('/');
//     }

// router.get('/logout', function(req, res) {
//   console.log("In logout");
//   req.logout();
//   // res.redirect('/');
// });
module.exports = router;
