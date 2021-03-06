import saveDataToFirestore from '../utils/save-firestore.js';
import getFirestoreData from '../utils/get-firestore.js'

window.addEventListener('load', async () => {
	setHorseName();
	const productData = await getFirestoreData('products');
	const serviceData = await getFirestoreData('services');
	buildProductTiles(productData);
	buildServiceTiles(serviceData);
	productClick();
	serviceClick();
	saveClick();
	addActions();
	closeAction();
});

function addActions() {
	document.querySelector('.actions').addEventListener('click', (e) => {
		if (e.target.classList.contains('tile')) {
			showHideSection(e.target.dataset.type, e.currentTarget);
			return false;
		}

		if (e.target.parentNode.classList.contains('tile')) {
			showHideSection(e.target.parentNode.dataset.type, e.currentTarget);
			return false;
		}
	});
}

function closeAction() {
	document.querySelector('.close-button').addEventListener('click', (e) => {
		showHideSection(e.currentTarget.dataset.type, document.querySelector('.actions'));
	});
}

function showHideSection(type, node) {
	node.classList.toggle('hidden');
	document.querySelector(`.${type}`).classList.toggle('hidden');
	const closeDiv = document.querySelector('.close-action');
	closeDiv.classList.toggle('hidden');
	closeDiv.querySelector('button').setAttribute('data-type', type);
}

function saveClick() {
	document.querySelector('.save-details').addEventListener('click', () => {
		saveDataToFirestore('records', getData());
	});
}

function getData() {
	const horseJson = document.querySelector('.horse-name').getAttribute('data-object');
	const productData = Array.from(document.querySelectorAll('.product-tile.active')).map(product => JSON.parse(product.dataset.object));
	const serviceData = Array.from(document.querySelectorAll('.service-tile.active')).map(service => JSON.parse(service.dataset.object));
	const data = JSON.parse(horseJson);
	data.products = productData;
	data.services = serviceData;
	data.date = new Date();
	data.submitted_by = {
		name: window.auth_user.displayName,
		email: window.auth_user.email
	};
	return data;
}

function productClick() {
	document.querySelector('.products').addEventListener('click', (e) => {
		if (e.target.classList.contains('tile')) {
			e.target.classList.toggle('active');
		}

		if (e.target.parentNode.classList.contains('tile')) {
			e.target.parentNode.classList.toggle('active');
		}
	});
}

function serviceClick() {
	document.querySelector('.services').addEventListener('click', (e) => {
		if (e.target.classList.contains('tile')) {
			e.target.classList.toggle('active');
		}

		if (e.target.parentNode.classList.contains('tile')) {
			e.target.parentNode.classList.toggle('active');
		}
	});
}

function setHorseName() {
	const node = document.querySelector('.horse-name');
	const params = new URLSearchParams(window.location.search);
	const name = params.get('horse');
	const client_id = params.get('client_id');
	const id = params.get('id');
	const attr = JSON.stringify({
		id,
		name,
		client_id,
	});
	node.setAttribute('data-object', attr);

	node.innerHTML = `
		<h2>${name}</h2>
	`;
}

function buildProductTiles(arrOfObjs) {
	const node = document.querySelector('.products');
	let html = '';
	arrOfObjs.forEach(product => {
		html += `
			<div class="product-tile tile" data-object='{"name": "${product.name}", "price": "${product.price}", "id": "${product.id}"}'>
				<p>${product.name}</p>
			</div>
		`;
	});

	node.innerHTML = html;
}

function buildServiceTiles(arrOfObjs) {
	const node = document.querySelector('.services');
	let html = '';
	arrOfObjs.forEach(service => {
		html += `
			<div class="service-tile tile" data-object='{"name": "${service.name}", "price": "${service.price}", "id": "${service.id}"}'>
				<p>${service.name}</p>
			</div>
		`;
	});

	node.innerHTML = html;
}



