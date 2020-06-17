import getFirestoreData from '../utils/get-firestore.js'
import buildTile from './build-tile.js';
import handleAddNewForm from './admin-add-new-form.js';
import activeStateHandler from './active-state-handler.js';
import deleteButton from './delete-button.js';

window.addEventListener('load', async () => {
	const collectionName = 'services';
	const services = await getFirestoreData(collectionName);
	const node = document.querySelector('.service-wrap');
	node.innerHTML = buildTile(services);
	handleAddNewForm(collectionName);
	activeStateHandler('.service-wrap');
	deleteButton('.service-wrap', 'services');
});
