function checkLogin() {
	firebase.auth().onAuthStateChanged((user) => {
		console.log(user);
		if (user) {
			window.auth_user = user;
			return user;
		}
		if (!window.location.href == window.origin) window.location.href = window.origin;
		return false;
	  });
}

checkLogin();
