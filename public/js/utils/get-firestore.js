export default async function getFirestoreData(firestoreCollection) {
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
