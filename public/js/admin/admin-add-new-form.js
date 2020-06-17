import saveDataToFirestore from '../utils/save-firestore.js';

export default function handleAddNewForm(collection) {
	document.querySelector('form').addEventListener('submit', (e) => {
		e.preventDefault();

		// Eliminate button element
		const data = {};
		const fields = Array.from(e.currentTarget.querySelectorAll('input'));
		const req_fields = fields.map(field => field.name);
		const inputs = Array.from(e.currentTarget.querySelectorAll('input')).forEach(input => {
			if (!input.value) return false;
			data[input.name] = input.value;
		});

		if (Object.values(data).length !== req_fields.length) return false;
		data.date = new Date();
		saveDataToFirestore(collection, data);
	});
}
