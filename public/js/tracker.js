window.addEventListener('load', async () => {
	const horseData = await getFirestoreData('horses');
	buildHorseTiles(horseData);
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

	// Alphabitize
	arr.sort((a, b) => {
		const textA = a.name.toUpperCase();
		const textB = b.name.toUpperCase();
		return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
	});

	return arr;
}

function buildHorseTiles(arrOfObjs) {
	console.log(arrOfObjs);
	const targetNode = document.querySelector('.horses-wrap');
	let html = '';
	arrOfObjs.forEach(obj => {
		html += `
			<div class="horse-tile col-12">
				<a href="/tracker/${obj.id}?horse=${obj.name}&client_id=${obj.client_id}&id=${obj.id}">
					<p>${obj.name}</p>
				</a>
			</div>
		`;
	});

	targetNode.innerHTML = html;
}

