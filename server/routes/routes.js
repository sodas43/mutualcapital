// var express = require('express');
// var router = express.Router();
// var passport = require('passport');

// //module.exports = function(app, passport) {

// // LOGOUT ==============================
// 	router.get('/logout', function(req, res) {
// 		req.logout();
//         res.status(200).clearCookie('connect.sid', { path: '/' });
//         req.session.destroy((err) => {
//             res.redirect('/');    
//         });
		
// 	});

// // =============================================================================
// // AUTHENTICATE (FIRST LOGIN) ==================================================
// // =============================================================================

// 	// locally --------------------------------
// 		// LOGIN ===============================
// 		// show the login form
// 		router.get('/login', function(req, res) {
// 			// res.render('login.jade', { message: req.flash('loginMessage') });
// 		});

// 		// process the login form
// 		router.post('/login', function(req, res, next) {
// 			passport.authenticate('local-login', function(err, user, info) {
// 				if (err) { return next(err) }
// 				if (!user) {
// 					console.log(info);
// 					return res.status(401).json({info: info});
// 				}
// 				console.log("Got User: "+ user.local.firstName+" "+user.local.lastName);
// 				return res.status(200).json({user: user.local.firstName+" "+user.local.lastName});				
// 			})(req, res, next);
// 		});
		

// 		// SIGNUP =================================
// 		// show the signup form
// 		router.get('/signup', function(req, res) {
// 			//res.render('signup.jade', { message: req.flash('loginMessage') });
// 		});

// 		// process the signup form
// 		router.post('/signup', function(req, res, next) { 
// 			passport.authenticate('local-signup', function(err, user, info) {
// 				if (err) { return next(err) }
// 				if (!user) {
// 					console.log(info);
// 					return res.status(401).json({info: info});
// 				}
// 				console.log("Got User: "+ user.local.firstName+" "+user.local.lastName);
// 				return res.status(200).json({user: user.local.firstName+" "+user.local.lastName});				
// 			})(req, res, next);
// 		});
		

// 	// facebook -------------------------------

// 		// send to facebook to do the authentication
// 	// 	app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

// 	// 	// handle the callback after facebook has authenticated the user
// 	// 	app.get('/auth/facebook/callback',
// 	// 		passport.authenticate('facebook', {
// 	// 			successRedirect : '/profile',
// 	// 			failureRedirect : '/'
// 	// 		}));

// 	// // twitter --------------------------------

// 	// 	// send to twitter to do the authentication
// 		router.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

// 		// handle the callback after twitter has authenticated the user
// 		router.get('/auth/twitter/callback',
// 			passport.authenticate('twitter', {
// 				successRedirect : '/profile',
// 				failureRedirect : '/'
// 			}));


// 	// google ---------------------------------

// 		// send to google to do the authentication
// 		router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

// 		// the callback after google has authenticated the user
// 		router.get('/auth/google/callback',
// 			passport.authenticate('google',  function(err, user) {
// 				if (err) { return (err) }
// 				if (!user) {
// 					console.log("user does not exist");
// 					return res.status(401).json({message: 'user does not exist'});
// 				}
// 				console.log("Got User: "+ user.google.name);
// 				return res.status(200).json({user: user.google.name});		
// 			})		
// 		);

// // route middleware to ensure user is logged in
// function isLoggedIn(req, res, next) {
// 	if (req.isAuthenticated())
// 		return next();

// 	res.redirect('/');
// }



// module.exports = router;