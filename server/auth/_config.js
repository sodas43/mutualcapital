var ids = {
  'facebook' : {
		'clientID' 		: 'your-secret-clientID-here', // your App ID
		'clientSecret' 	: 'your-client-secret-here', // your App Secret
		'callbackURL' 	: 'http://localhost:8080/auth/facebook/callback'
	},

	'twitter' : {
		'consumerKey' 		: 'DciQcpLVQKSw7mCn5DGQt0rkm',
		'consumerSecret' 	: 'wcuYPLFTgz2OQjEliVKm5oCoq1ORRrzulS3prx5C7W0m1tP8Ha',
		'callbackURL' 		: 'https://mutualcapital.herokuapp.com/auth/twitter/callback',
		'userProfileURL'  : 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true'
	},

	'google' : {
		'clientID' 	: '662289305999-qudd5ebc52l79n9fmafpej2nd2rp22c0.apps.googleusercontent.com',
		'clientSecret' 	: 'UpUwGXgU4cUW6LVSdcmdfZGB',
		'callbackURL' 	: 'https://mutualcapital.herokuapp.com/auth/google/callback'		
	}};
  
  module.exports = ids;
