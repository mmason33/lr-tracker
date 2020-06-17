export default function deleteButton(wrap, collection) {
	document.querySelector('.delete-button').addEventListener('click', () => {
		const db = firebase.firestore();
		const id_arr = Array.from(document.querySelector(wrap).querySelectorAll('.active')).map(el => el.dataset.id);
		if (!id_arr.length) return false;

		if (window.confirm('Are you sure you want to delete the selected fields?')) {
			id_arr.forEach(id => {
				db.collection(collection).doc(id).delete().then(() => {
					console.log("Document successfully deleted!");
					window.location.reload();
				}).catch((error) => {
					console.error("Error removing document: ", error);
				});
			});
		}
	});
}
