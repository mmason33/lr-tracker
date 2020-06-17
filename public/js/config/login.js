window.addEventListener('load', () => {
	initApp();
});

/**
 * Function called when clicking the Login/Logout button.
 */
function toggleSignIn() {
	if (!firebase.auth().currentUser) {
		firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
			.then(function () {
				const provider = new firebase.auth.GoogleAuthProvider();
				// In memory persistence will be applied to the signed in Google user
				// even though the persistence was set to 'none' and a page redirect
				// occurred.
				provider.addScope('https://www.googleapis.com/auth/plus.login');
				return firebase.auth().signInWithRedirect(provider);
			})
			.catch(function (error) {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
			});
	} else {
		firebase.auth().signOut();
	}

	document.getElementById('quickstart-sign-in').disabled = true;
}


function initApp() {
	// Result from Redirect auth flow.
	firebase.auth().getRedirectResult().then(function (result) {
		if (result.credential) {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const token = result.credential.accessToken;
			// document.getElementById('quickstart-oauthtoken').textContent = token;

			// Redirect
			window.location.href = window.origin + '/tracker';
		} else {
			// document.getElementById('quickstart-oauthtoken').textContent = 'null';
		}
		// The signed-in user info.
		const user = result.user;
	}).catch(function (error) {
		// Handle Errors here.
		const errorCode = error.code;
		const errorMessage = error.message;
		// The email of the user's account used.
		const email = error.email;
		// The firebase.auth.AuthCredential type that was used.
		const credential = error.credential;
		if (errorCode === 'auth/account-exists-with-different-credential') {
			alert('You have already signed up with a different auth provider for that email.');
			// If you are using multiple auth providers on your app you should handle linking
			// the user's accounts here.
		} else {
			console.error(error);
		}
	});

	// Listening for auth state changes.
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			// User is signed in.
			const displayName = user.displayName;
			const email = user.email;
			const emailVerified = user.emailVerified;
			const photoURL = user.photoURL;
			const isAnonymous = user.isAnonymous;
			const uid = user.uid;
			const providerData = user.providerData;
			// document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
			document.getElementById('quickstart-sign-in').textContent = 'Sign out';
			// document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
		} else {
			// User is signed out.
			// document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
			document.getElementById('quickstart-sign-in').textContent = 'Sign in with Google';
			// document.getElementById('quickstart-account-details').textContent = 'null';
			// document.getElementById('quickstart-oauthtoken').textContent = 'null';
		}

		document.getElementById('quickstart-sign-in').disabled = false;
	});

	document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
}
