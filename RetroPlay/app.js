import { getSongs } from "./api.js";

const tableBody = document.getElementById('table-body');
const input = document.getElementById('search');
const select = document.getElementById('genre');
const playListBtn = document.getElementById('page-playlist-btn');
const musicListBtn = document.getElementById('page-music-btn');

let songsList = [];
let playList = [];
let isPlaylist = false;
let songsPerPage = 10;
let currentPage = 0;

bindEventListeners();
getSongs().then((songs) => {

	songsList = songs;
	renderTableData(songs,false);
	generateGenres();
});

function renderTableData(songs,isPlayist) {
	tableBody.innerHTML = '';

	const startIndex = (currentPage - 1) * songsPerPage;
	const endIndex = startIndex + songsPerPage;
	const slicedSongs = songs.slice(startIndex, endIndex);

	songs.forEach((song) => {
		const row = document.createElement('tr');

		const idCell = document.createElement('td');
		idCell.innerText = song.id;

		const titleCell = document.createElement('td');
		titleCell.innerHTML = `<a style="text-decoration: none; color:inherit;" "target="_blank";" href="javascript:playSong('${song.songurl}','${song.id}');">${song.songName}</a>`;

		const artistCell = document.createElement('td');
		artistCell.innerHTML = `<a href="https://www.google.com/search?q=${song.artistName}" style="text-decoration: none; color:inherit;";">${song.artistName}</a>`;

		const playCell = document.createElement('td');
		playCell.innerHTML = `<a id="play-btn-${song.id}" style="text-decoration: none;" href="javascript:playSong('${song.songurl}','${song.id}');">Play</a>`;

		const actionsCell = document.createElement('td');
		actionsCell.innerHTML = isPlayist?
			`<button id="add-btn-${song.id}" class="btn btn-danger">Remove from playlist</button>`:
            `<button id="add-btn-${song.id}" class="btn btn-primary">Add to playlist</button>`;
		row.append(idCell, titleCell, artistCell, playCell, actionsCell);
		tableBody.append(row);
		const isSongInPlaylist = playList.find((playListSong) => playListSong.id === song.id);
		if (isSongInPlaylist && isPlayist) {
			const addBtn = document.getElementById(`add-btn-${song.id}`);
			addBtn.classList.add('disabled');
		}
	});

	bindRowButtonEventListerners(slicedSongs);
	generatePagination(songs);
}
 try{} catch(err) {
    message.innerHTML = "Input is " + err;
  }


function bindEventListeners() {
	input.addEventListener('input', () => {
		filterSongs();
	})

	select.addEventListener('input', () => {
		filterSongs();
	})

	playListBtn.addEventListener('click', () => {
		renderTableData(playList, true);
	})

	musicListBtn.addEventListener('click', () => {
		renderTableData(songsList, false);
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


	renderTableData(filteredSongs,false);
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

	function bindRowButtonEventListerners(song) {
		songsList.forEach((song) => {
			const addtoPlaylistButton = document.getElementById(`add-btn-${song.id}`);
			addtoPlaylistButton.addEventListener('click', () => {
				addSongToPlaylist(song);
			})
	})
}

function addSongToPlaylist(song) {
	playList.push(song);
	filterSongs();
	console.log(song);
	const addToPlaylistButton = document.getElementById(`add-btn-${song.id}`);
	addToPlaylistButton.classList.add('disabled')


}

function removeSongFromPlaylist(song) {
	playList = playList.filter((playListSong) => {
		return playListSong.id !== song.id
	});
} 
renderTableData(playList, true);

function generatePagination(songs) {
	const totalPage = Math.ceil(songs.length / songsPerPage);

	for(let i = 1; i <= totalPage; i++) {
		const li = document.createElement('li');
		li.innerHTML = `<a class="page-link ${i === 1 ? 'active' : ''}" id="page-link-${i}" href="#">${i}</a>`;

		pagination.append(li);
      li.addEventListener('click', () => {
	  	currentPage = i;
	  	renderTableData(songs);

		  const activeElement = document.getElementsByClassName('page-link active');
		  if (activeElement) {
			  activeElement[0].classList.remove('active')
		  }

		document.getElementById(`page-link-${i}`).classList.add('active');
	  })
	}
}