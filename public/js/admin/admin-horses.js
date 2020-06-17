import getFirestoreData from '../utils/get-firestore.js'
import buildTile from './build-tile.js';
import handleAddNewForm from './admin-add-new-form.js';
import activeStateHandler from './active-state-handler.js';
import deleteButton from './delete-button.js';

window.addEventListener('load', async () => {
	const collectionName = 'horses';
	const horses = await getFirestoreData(collectionName);
	const node = document.querySelector('.horse-wrap');
	node.innerHTML = buildTile(horses);
	handleAddNewForm(collectionName);
	activeStateHandler('.horse-wrap');
	deleteButton('.horse-wrap', 'horses');
});
