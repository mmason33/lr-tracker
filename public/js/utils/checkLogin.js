function checkLogin() {
	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			window.auth_user = user;
			return user;
		}
		window.location.href = window.origin;
	  });
}

checkLogin();
