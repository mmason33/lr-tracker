window.addEventListener('load', async () => {
	setHorseName();
	const productData = await getFirestoreData('products');
	const serviceData = await getFirestoreData('services');
	buildProductTiles(productData);
	buildServiceTiles(serviceData);
	productClick();
	serviceClick();
	saveClick();
});

function saveClick() {
	document.querySelector('.save-details').addEventListener('click', () => {
		saveDataToFirestore();
	});
}

async function saveDataToFirestore() {
	const horseJson = document.querySelector('.horse-name').getAttribute('data-object');
	const productData = Array.from(document.querySelectorAll('.product-tile.active')).map(product => JSON.parse(product.dataset.object));
	const serviceData = Array.from(document.querySelectorAll('.service-tile.active')).map(service => JSON.parse(service.dataset.object));
	const data = JSON.parse(horseJson);
	data.products = productData;
	data.services = serviceData;
	const db = firebase.firestore();
	db.collection('records').add(data)
	.then(function(docRef) {
		// api to quickbooks route
		console.log("Document written with ID: ", docRef.id);
	})
	.catch(function(error) {
		console.error("Error adding document: ", error);
	});
}

function productClick() {
	document.querySelector('.products').addEventListener('click', (e) => {
		console.log('product click', e.target.nodeName === 'H5');

		if (e.target.classList.contains('tile')) {
			e.target.classList.toggle('active');
		}

		if (e.target.nodeName === 'H5') {
			e.target.parentNode.classList.toggle('active');
		}
	});
}

function serviceClick() {
	document.querySelector('.services').addEventListener('click', (e) => {
		console.log('product click', e.target.nodeName === 'H5');

		if (e.target.classList.contains('tile')) {
			e.target.classList.toggle('active');
		}

		if (e.target.nodeName === 'H5') {
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
		<h1>${name}</h1>
	`;
}

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

function buildProductTiles(arrOfObjs) {
	const node = document.querySelector('.products');
	let html = '';
	arrOfObjs.forEach(product => {
		html += `
			<div class="product-tile tile" data-object='{"name": "${product.name}", "price": "${product.price}", "id": "${product.id}"}'>
				<h5>${product.name}</h5>
				<h5>${product.price}</h5>
				<h5>${product.id}</h5>
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
				<h5>${service.name}</h5>
				<h5>${service.price}</h5>
				<h5>${service.id}</h5>
			</div>
		`;
	});

	node.innerHTML = html;
}



