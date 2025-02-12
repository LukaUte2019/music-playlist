import { getSongs } from "./api.js";

const tableBody = document.getElementById('table-body');
const input = document.getElementById('search');
const select = document.getElementById('genre');

let songsList = [];

bindEventListeners();
getSongs().then((songs) => {

	songsList = songs;
	renderTableData(songs);
	generateGenres();
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
 try{} catch(err) {
    message.innerHTML = "Input is " + err;
  }


function bindEventListeners() {
	input.addEventListener('input', () => {
		filterSongs();
	})
}

function filterSongs() {
	// this is filter by search
	const searchValue = input.value.trim().toLowerCase();

	let filterSongs = songsList.map(song => song);

	const filteredSongs = songsList.filter((song) => {
		return song.songName.toLowerCase().includes(searchValue) ||
			song.artistName.toLowerCase().includes(searchValue);
	});

	console.log(filteredSongs);
	renderTableData(filteredSongs);

	console.log(filteredSongs);
	renderTableData(filteredSongs);
}

function generateGenres() {
	const genres = songsList.reduce((acc, curr) => {
		if (!acc.includes(curr.genre)) {
			acc.push(curr.genre)
		}

		return acc;
	}, []);

	console.log(genres)
}

const selectGenreOptions = document.createElement('option');
	selectGenreOptions.innerText = 'Select Genre';
	select.append(selectGenreOptions);

	genres.forEach((genre) => {
		const optionElement = document.createElement('option');
		optionElement.innerText = genre;
		optionElement.setAttribute('value', genre);
	})