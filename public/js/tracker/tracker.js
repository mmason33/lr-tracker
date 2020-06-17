import getFirestoreData from '../utils/get-firestore.js'

window.addEventListener('load', async () => {
	const horseData = await getFirestoreData('horses');
	buildHorseTiles(horseData);
});

function buildHorseTiles(arrOfObjs) {
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

