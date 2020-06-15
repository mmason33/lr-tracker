window.addEventListener('load', () => {
	document.querySelector('form').addEventListener('submit', (e) => {
		e.preventDefault();
		const obj = {};
		Array.from(e.currentTarget.elements).filter(input => input.type === 'text' || input.type === 'password').forEach(node => {
			obj[node.name] = node.value;
		});

		if (obj.username && obj.password) signIn(obj);
	});
});

function signIn(obj) {
	console.log(obj);
	fetch('/adminSignin', {
		method: 'POST',
		body: JSON.stringify(obj),
		headers: {
			'Content-Type': 'application/json',
		}
	}).then(res => res.json().then(res_data => {
		console.log(res_data);
		if (res_data.error) {
			console.log('error');
			// some error message
			return false;
		}

		if (res_data.cookie_name && res_data.cookie_value) {
			setCookie(res_data.cookie_name, res_data.cookie_value, 10);
			window.location.href = window.origin + '/admin/auth';
		}

	})).catch(err => {
		console.log(err);
	});
}

function setCookie(cname, cvalue, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	const expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
