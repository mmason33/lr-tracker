export default function buildTile(arr) {
	let html = '';
	arr.forEach(el => {
		html += `
			<div class="tile" data-id="${el.id}">
				<p>${el.name}</p>
			</div>
		`;
	});

	return html;
}
