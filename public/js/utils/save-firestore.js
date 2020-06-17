export default function saveDataToFirestore(collection, data) {
	const db = firebase.firestore();
	db.collection(collection).add(data)
		.then(function(docRef) {
			window.location.reload();
			// api to quickbooks route
			console.log("Document written with ID: ", docRef.id);
		})
		.catch(function(error) {
			console.error("Error adding document: ", error);
		});
}
