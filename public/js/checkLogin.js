function checkLogin() {
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) return user;
		window.location.href = window.origin;
	  });
}

checkLogin();
