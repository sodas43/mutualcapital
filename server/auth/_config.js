var ids = {
  'facebook' : {
		'clientID' 		: 'your-secret-clientID-here', // your App ID
		'clientSecret' 	: 'your-client-secret-here', // your App Secret
		'callbackURL' 	: 'http://localhost:8080/auth/facebook/callback'
	},

	'twitter' : {
		'consumerKey' 		: 'xaHgDlC54cC6DrNBkTzaObi1f',
		'consumerSecret' 	: 'GKpcQTaEteVRU1MkVcvhPEuO1lwKBQw7uVy6xI63UC2T1tTW0C',
		'callbackURL' 		: 'https://mutualcapital.herokuapp.com/auth/twitter/callback'
	},

	'google' : {
		'clientID' 	: '662289305999-qudd5ebc52l79n9fmafpej2nd2rp22c0.apps.googleusercontent.com',
		'clientSecret' 	: 'UpUwGXgU4cUW6LVSdcmdfZGB',
		'callbackURL' 	: 'https://mutualcapital.herokuapp.com/auth/google/callback'
	}};
  
  module.exports = ids;
