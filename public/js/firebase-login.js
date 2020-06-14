




// const ui = new firebaseui.auth.AuthUI(firebase.auth());

// ui.start('#firebaseui-auth-container', {
// 	signInOptions: [
// 		// List of OAuth providers supported.
// 		firebase.auth.GoogleAuthProvider.PROVIDER_ID,
// 	],
// 	callbacks: {
// 		signInSuccessWithAuthResult: function (authResult, redirectUrl) {
// 			fetch('/cookie', {
// 				method: 'POST',
// 			}).then(res => {
// 				console.log(res);
// 				setCookie('lrTrackerC', res, 7);
// 				window.location.href = window.origin + '/tracker';
// 			});
// 			// User successfully signed in.
// 			// Return type determines whether we continue the redirect automatically
// 			// or whether we leave that to developer to handle.
// 			return true;
// 		},
// 	},
// });

// function setCookie(cname, cvalue, exdays) {
// 	var d = new Date();
// 	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
// 	var expires = "expires=" + d.toUTCString();
// 	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// }
