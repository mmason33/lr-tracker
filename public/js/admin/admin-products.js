import getFirestoreData from '../utils/get-firestore.js'
import buildTile from './build-tile.js';
import handleAddNewForm from './admin-add-new-form.js';
import activeStateHandler from './active-state-handler.js';
import deleteButton from './delete-button.js';

window.addEventListener('load', async () => {
	const collectionName = 'products';
	const products = await getFirestoreData(collectionName);
	const node = document.querySelector('.product-wrap');
	node.innerHTML = buildTile(products);
	handleAddNewForm(collectionName);
	activeStateHandler('.product-wrap');
	deleteButton('.product-wrap', 'products');
});
