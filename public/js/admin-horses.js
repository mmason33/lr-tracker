window.addEventListener('load', async () => {
	const horses = await getFirestoreData('horses');
	const node = document.querySelector('.horse-wrap');
	node.innerHTML = buildMarkup('horse', horses);
	console.log(horses);
});

async function getFirestoreData(firestoreCollection) {
	const db = firebase.firestore();
	const collection = await db.collection(firestoreCollection).get();
	const arr = [];
	collection.forEach(doc => {
		const obj = doc.data();
		obj.id = doc.id;
		arr.push(obj);
	});

	return arr;
}

function buildMarkup(identifier, arr) {
	let html = '';
	arr.forEach(el => {
		html += `
			<div class="${identifier}">
				<div>${el.name}</div>
				<div>${el.client_id}</div>
			</div>
		`;
	});

	return html;
}
