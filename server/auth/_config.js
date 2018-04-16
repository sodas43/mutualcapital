var ids = {
  'facebook' : {
		'clientID' 		: 'your-secret-clientID-here', // your App ID
		'clientSecret' 	: 'your-client-secret-here', // your App Secret
		'callbackURL' 	: 'http://localhost:8080/auth/facebook/callback'
	},

	'twitter' : {
		'consumerKey' 		: 'xaHgDlC54cC6DrNBkTzaObi1f',
		'consumerSecret' 	: 'GKpcQTaEteVRU1MkVcvhPEuO1lwKBQw7uVy6xI63UC2T1tTW0C',
		'callbackURL' 		: 'http://127.0.0.1:4200/auth/twitter/callback'
	},

	'google' : {
		'clientID' 	: '662289305999-qudd5ebc52l79n9fmafpej2nd2rp22c0.apps.googleusercontent.com',
		'clientSecret' 	: 'UpUwGXgU4cUW6LVSdcmdfZGB',
		'callbackURL' 	: 'http://127.0.0.1:4200/auth/google/callback'
	},
	// 'sendgrid' : {
	// 	'API_KEY' : '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'
	// }
  };
  
  module.exports = ids;