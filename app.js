import { getSongs } from "./api.js";

const tableBody = document.getElementById('table-body');
const errorElement = document.getElementById('error');
const input = document.getElementById('search');

errorElement.style.display = 'none';

function showError() {
	errorElement.style.display = 'visible';
}
let songsList = [];

bindEventListeners();
getSongs().then((songs) => {
	console.log(songs);

	songsList = songs;
	renderTableData(songs);
});

function renderTableData(songs) {
	tableBody.innerHTML = '';

	songs.forEach((song) => {
		const row = document.createElement('tr');

		const idCell = document.createElement('td');
		idCell.innerText = song.id;

		const titleCell = document.createElement('td');
		titleCell.innerText = song.songName;

		const artistCell = document.createElement('td');
		artistCell.innerText = song.artistName;

		const playCell = document.createElement('td');
		playCell.innerHTML = `<a id="play-btn-${song.id}" style="text-decoration: none;" href="javascript:playSong('${song.songurl}','${song.id}');">Play</a>`;

		const actionsCell = document.createElement('td');
		actionsCell.innerHTML = `<button id="add-btn-${song.id}" class="btn btn-primary">Add to playlist</button>`;

		row.append(idCell, titleCell, artistCell, playCell, actionsCell);
		tableBody.append(row);
	})
}

function bindEventListeners() {
	input.addEventListener('input', () => {
		filterSongs();
	})
}

function filterSongs() {
	const searchValue = input.value.trim().toLowerCase();

	const filteredSongs = songsList.filter((song) => {
		return song.songName.toLowerCase().includes(searchValue) ||
			song.artistName.toLowerCase().includes(searchValue);
	});

	console.log(filteredSongs);
	renderTableData(filteredSongs);
}