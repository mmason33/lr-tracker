export default function activeStateHandler(topClass) {
	document.querySelector(topClass).addEventListener('click', (e) => {
		if (e.target.classList.contains('tile')) {
			e.target.classList.toggle('active');
		}

		if (e.target.parentNode.classList.contains('tile')) {
			e.target.parentNode.classList.toggle('active');
		}

		e.currentTarget.querySelector('.active') ?
			e.currentTarget.classList.add('has-active') :
			e.currentTarget.classList.remove('has-active');

		if (e.currentTarget.querySelector('.active')) {
			e.currentTarget.classList.add('has-active');
			document.querySelector('.delete-wrap').classList.remove('hidden');
			return false;
		}

		e.currentTarget.classList.remove('has-active');
		document.querySelector('.delete-wrap').classList.add('hidden');
	});
}

