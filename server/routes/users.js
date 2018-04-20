var express  = require('express');
var router   = express.Router();
var passport = require('passport');
var async    = require('async');
var crypto   = require('crypto');
var User     = require('../models/user');
var nodemailer = require('nodemailer');
var configAuth = require('../auth/_config');
var path = require('path');


//module.exports = function(app, passport) {

// FORGOT PASSWORD ==============================
router.post('/forgot', function(req, res, next) {
	async.waterfall(
		[
			function(done) {
				crypto.randomBytes(20, function(err, buf) {
					var token = buf.toString('hex');
					done(err, token);
				});
			},
			function(token, done) {
				User.findOne({ 'local.email': req.body.email }, function(err, user) {
					if (!user) {
						return res.status(401).json({info: "No account with this email address exists."});
					}
					
					user.local.resetPasswordToken = token;
					user.local.resetPasswordExpires = Date.now() + 3600000; // 1 hour
				
					user.save(function(err) {
						done(err, token, user);
					});
				});
			},
			function(token, user, done) {
				var smtpTransport = nodemailer.createTransport(
					{
						service: process.env.MAIL_SERVICE,
						auth: {
								user: process.env.MAIL_USER,
								pass: process.env.MAIL_PWDKEY
						}
					});
				console.log(user.local.email);
				var mailOptions = {
				to: user.local.email,
					from: 'support@mutualcapital.com',
					subject: 'MutualCapital Support : Reset Your Password',
					text: 'Hi ' + user.local.email + ',\n\n' +'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
						'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
						'http://' + req.headers.host + '/reset/password/' + token + '\n\n' +
					'If you did not request this, please ignore this email and your password will remain unchanged.\n\n\n\n'+
					'\nThanks,\n'+'\nTeam MutualCapital\n'
				};
				
				smtpTransport.sendMail(mailOptions, function(err) {
				if (err) console.log("err in sending mail: "+err);
				return res.status(200).json({info: 'An e-mail has been sent to ' + user.local.email + ' with further instructions.'});
					done(err, 'done');
				});
			}
	  ], function(err) {
		if (err) return next(err);
		res.redirect('/forgot');
	});
	
});

// RESET PASSWORD ======================
router.get('/reset/password/:token', function(req, res, next) {
	console.log("1 : "+req.params.token);
	console.log("date: "+Date.now());
	User
		.findOne({ 'local.resetPasswordToken': req.params.token })
		.where ('local.resetPasswordExpires').gt(new Date())
		.exec((err, user) => {
			if (err) { return next(err); }
			if (!user) {
				console.log("2");
				//return res.status(401).json({info: 'Password reset token is invalid or has expired.'})
			  	req.flash('errors', { msg: 'Password reset token is invalid or has expired. Please reset it again.' });
				//return res.redirect('back');
				res.render('../views/success', {
					title: 'Password Reset'
				});
			}
			console.log("User found : "+user);
			res.render('../views/reset', {
			  title: 'Password Reset'
			});
		});	  
  });

  router.post('/reset/password/:token', function(req, res) {
	async.waterfall(
		[
			function(done) {
				console.log('In post');
				console.log(req.body.password);
				console.log(req.body.confirm);
				
				req.assert('confirm', 'Passwords do not match').equals(req.body.password);
				const errors = req.validationErrors();
				
				  if (errors) {
					req.flash('errors', errors);
					return res.redirect('back');
				  }		
				console.log("hiiiiii");
				User.findOne({ 'local.resetPasswordToken': req.params.token, 'local.resetPasswordExpires': { $gt: new Date() } }, function(err, user) {
					if (!user) {
						req.flash('error', { msg: 'Password reset token is invalid or has expired. Please reset it again.' });
						return res.redirect('back');
						// setTimeout(() => {
						// 	res.redirect(process.env.MAINURL+':'+process.env.PORT);
						// }, 3000);
					}
					
					user.local.password = user.generateHash(req.body.password);
					user.local.resetPasswordToken = undefined;
					user.local.resetPasswordExpires = undefined;
			
					user.save(function(err) {
						req.logIn(user, function(err) {
							done(err, user);
						});
					});
				});
			},
			function(user, done) {
				var smtpTransport = nodemailer.createTransport(
				{
					service: process.env.MAIL_SERVICE,
					auth: {
						user: process.env.MAIL_USER,
						pass: process.env.MAIL_PWDKEY
					}
				});
				var mailOptions = {
					to: user.local.email,
					from: 'support@mutualcapital.com',
					subject: 'MutualCapital Support : Your password has been changed',
					text: 'Hello,\n\n' +
					'This is a confirmation that the password for your account ' + user.local.email + ' has just been changed.\n'+
					'\nThanks,\n'+'\nTeam MutualCapital\n'
				};

				smtpTransport.sendMail(mailOptions, function(err) {
					if (err) { req.flash('error', { msg: 'Error Occurred while trying to send mail.' });}
					req.flash('success', { msg: 'Success! Your password has been changed.' });
					req.flash('info', { msg: 'A confirmation mail has been sent to '+ user.local.email });
					req.flash('info', { msg: 'Please Login Again ...' });
					done(err);
				});
			},
			function(err) {
				res.render('../views/success', {
					title: 'Password Reset'
				});
			}
		], function(err) {
			res.redirect('/');
			});
  });

// LOGOUT ==============================
	router.get('/logout', function(req, res) {
		req.logout();
        res.status(200).clearCookie('connect.sid', { path: '/' });
        req.session.destroy((err) => {
	    		//res.redirect('http://127.0.0.1:4200');
	    		res.redirect('/');
        });
		
	});

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

	// locally --------------------------------
		// LOGIN ===============================
		// show the login form
		router.get('/login', function(req, res) {
			// res.render('login.jade', { message: req.flash('loginMessage') });
		});

		// process the login form
		router.post('/login', function(req, res, next) {
			passport.authenticate('local-login', function(err, user, info) {
				if (err) { return next(err) }
				if (!user) {
					console.log(info);
					return res.status(401).json({info: info});
				}
				console.log("Got User: "+ user.local.firstName+" "+user.local.lastName);
				console.log("Is Admin: "+ user.local.isAdmin);
				return res.status(200).json({user: user.local.firstName+" "+user.local.lastName, isAdmin: user.local.isAdmin});				
			})(req, res, next);
		});
		

		// SIGNUP =================================
		// show the signup form
		router.get('/signup', function(req, res) {
			//res.render('signup.jade', { message: req.flash('loginMessage') });
		});

		// process the signup form
		router.post('/signup', function(req, res, next) { 
			passport.authenticate('local-signup', function(err, user, info) {
				if (err) { return next(err) }
				if (!user) {
					console.log(info);
					return res.status(401).json({info: info});
				}
				console.log("Got User: "+ user.local.firstName+" "+user.local.lastName);
				return res.status(200).json({user: user.local.firstName+" "+user.local.lastName});				
			})(req, res, next);
		});
		

	// FACEBOOK -------------------------------

		// send to facebook to do the authentication
	// 	app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

	// 	// handle the callback after facebook has authenticated the user
	// 	app.get('/auth/facebook/callback',
	// 		passport.authenticate('facebook', {
	// 			successRedirect : '/profile',
	// 			failureRedirect : '/'
	// 		}));

	// // TWITTER --------------------------------

	// 	// send to twitter to do the authentication
		router.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

		// handle the callback after twitter has authenticated the user
		router.get('/auth/twitter/callback',
			passport.authenticate('twitter', {
				successRedirect : '/',
				failureRedirect : '/'
			}));


	// GOOGLE ---------------------------------

		// send to google to do the authentication
		router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

		// the callback after google has authenticated the user
		router.get('/auth/google/callback',
		passport.authenticate('google', {
			successRedirect : '/',
			failureRedirect : '/'
		}));
		// router.get('/auth/google/callback',
		// 	passport.authenticate('google',  function(err, user, info) {
		// 		if (err) { return (err) }
		// 		if (!user) {
		// 			console.log("user does not exist"+info);
		// 			return res.status(401).json({message: 'user does not exist'});
		// 		}
		// 		console.log("Got User: "+ user.google.name);
		// 		return res.status(200).json({user: user.google.name});
		// 		//res.redirect('/');
		// 	})		
		// );

// RETURN CURRENT USER LOGGED IN ==============================
// ------------------------------

router.get('/currentUser', function(req, res) {
  //res.setHeader('Content-Type', 'application/json');
  console.log("user : "+req.user);
	return res.json({user: req.user});
});

// ROUTE MIDDLEWARE TO ENSURE USER IS LOGGED IN ==============================
// ----------------------------------------------
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}

router.get('*', function (req, res) {
  res.sendFile(path.join(__dirname + '/../../dist/index.html'));
});


module.exports = router;
