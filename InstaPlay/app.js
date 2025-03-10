import { getSongs } from "./api.js";

const tableBody = document.getElementById('table-body');
const errorElement = document.getElementById('error');
const input = document.getElementById('search');
const select = document.getElementById('genre');
const restricted = document.getElementById('restricted');
const playlistBtn = document.getElementById('page-playlist-btn');
const musicBtn = document.getElementById('page-music-btn');
const pagination = document.getElementById('pagination');

function copy(event) {
    var target = event.target;
    var copyText = target.nextElementSibling;

    navigator.clipboard.writeText(copyText.value);

    alert("Copied: " + copyText.value);
}

errorElement.style.display = 'none';
let songsList = [];
let playlist = [];
let isPlaylist = false;
let songsPerPage = 10;
let currentPage = 1;

bindEventListeners();
getSongs().then((songs) => {
	console.log(songs);

	songsList = songs;
	renderTableData(songs);
	generateGenres();
});

function renderTableData(songs) {
	tableBody.innerHTML = '';

	const startIndex = (currentPage - 1) * songsPerPage;
	const endIndex = startIndex + songsPerPage;
	const slicedSongs = songs.slice(startIndex, endIndex)

	slicedSongs.forEach((song) => {

        const row = document.createElement('tr');


		localStorage.setItem(`${song.id}`, `?songname=${song.artistName}%artistname=${song.songName}$url=${song.songurl}`);


		const idCell = document.createElement('td');
		idCell.innerText = song.id;

		const titleCell = document.createElement('td');
		titleCell.innerHTML = `<div id="div-song-play-btn-${song.id}" title="Play song '${song.songName}'"><a style="text-decoration: none; color:inherit;" "target="_blank";" href="javascript:playSong('${song.songurl}','${song.id}');">${song.songName}</a></div>`

		const artistCell = document.createElement('td');
		artistCell.innerHTML = `<div title="View Artist ${song.artistName} on Google"><a href="https://www.google.com/search?q=${song.artistName}" style="text-decoration: none; color:inherit;";">${song.artistName}</a>`;

        const coverArtCell = document.createElement('td');
		coverArtCell.innerHTML = `<img src="${song.thumbnailurl}" alt="Album Cover" height="100" width="100">`

		const shareCell = document.createElement('td');
		let shareUrl = `'http://lukaserver.ddns.net/lukifyshare/openSong.php?image=${song.thumbnailurl}&artistname=${song.artistName}&songname=${song.songName}&songurl=${song.songurl}'`;
		shareCell.innerHTML = `<a style="text-decoration: none; color:inherit;" id="div-song-share-btn-${song.id}" href="javascript:navigator.clipboard.writeText(${shareUrl})";">Copy</a>`;

		const openShare = document.createElement('td');
		openShare.innerHTML = `<a style="text-decoration: none; color:inherit;" id="div-song-share-btn-${song.id}" href="http://lukaserver.ddns.net/lukifyshare/openSong.php?image=${song.thumbnailurl}&artistname=${song.artistName}&songname=${song.songName}&songurl=${song.songurl}";">Open Link</a>`;
        
		const playCell = document.createElement('td');
		playCell.innerHTML = `<div id="div-song-play-btn-${song.id}" title="Play song '${song.songName}'"><a id="play-btn-${song.id}" style="text-decoration: none;" href="javascript:playSong('${song.songurl}','${song.id}');">Play</a></div>`;

		const genreCell = document.createElement('td');
		genreCell.innerText = song.genre;

		const releaseCell = document.createElement('td');
		releaseCell.innerText = song.year;

		const bandCell = document.createElement('td');
		bandCell.innerHTML = `<div title="${song.bandinfo.singer1.description} and ${song.bandinfo.singer2.description}"><a href="https://www.google.com/search?q=${song.bandinfo.singer1.fulName} and ${song.bandinfo.singer2.fulName}" style="text-decoration: none; color:inherit;";">${song.bandinfo.NamesOfSingers}</a></div>`
  
        const wasonIDJShowCell = document.createElement('td');
		wasonIDJShowCell.innerHTML = `<a href="https://www.google.com/search?q=${song.bandinfo.singer1.fulName} on IDJ Show" style="text-decoration: none; color:inherit;";">${song.bandinfo.singer1.wasOnIDJShow}</a>`

		const djcell = document.createElement('td');
		djcell.innerHTML = `<a href="https://www.google.com/search?q=${song.bandinfo.existentDJinBand}" style="text-decoration: none; color:inherit;";">${song.bandinfo.existentDJinBand}</a>`

		const actionsCell = document.createElement('td');
		actionsCell.innerHTML = isPlaylist ?
			`<div id="div-song-playlistremove-btn-${song.id}" title="Remove song '${song.songName}' from playlist"><button id="remove-btn-${song.id}" class="btn btn-danger">Remove from playlist</button></div>` :
			`<div id="div-song-playlistadd-btn-${song.id}" title="Add song '${song.songName}' to playlist"><button id="add-btn-${song.id}" class="btn btn-primary">Add to playlist</button></div>`;

		// if (isPlaylist) {
		// 	actionsCell.innerHTML = `<button id="remove-btn-${song.id}" class="btn btn-danger">Remove from playlist</button>`
		// } else {
		// 	actionsCell.innerHTML = `<button id="add-btn-${song.id}" class="btn btn-primary">Add to playlist</button>`
		// }

		row.append(idCell, titleCell, artistCell, coverArtCell, genreCell, bandCell, wasonIDJShowCell, djcell, shareCell, openShare, playCell, actionsCell);
		tableBody.append(row);

		const isSongInPlaylist = playlist.find((playlistSong) => playlistSong.id === song.id);
		if (isSongInPlaylist && !isPlaylist) {
			const addBtn = document.getElementById(`add-btn-${song.id}`);
			const addBtndiv = document.getElementById(`div-song-playlistadd-btn-${song.id}`);
			addBtn.classList.add('disabled');
			addBtndiv.title.add('Song added to playlist')
		}
	});

	bindRowButtonEventListeners(slicedSongs);
	generatePagination(songs);
}

function bindEventListeners() {
	input.addEventListener('input', () => {
		filterSongs();
	});

	select.addEventListener('input', () => {
		filterSongs();
	});

	restricted.addEventListener('input', () => {
		filterSongs();
	});

	playlistBtn.addEventListener('click', () => {
		isPlaylist = true;
		renderTableData(playlist);
	});

	musicBtn.addEventListener('click', () => {
		isPlaylist = false;
		renderTableData(songsList);
	})
}

function filterSongs() {
	// console.log('CALLED FILTER');

	// this is filter from input
	const searchValue = input.value.trim().toLowerCase();

	// get a copy of the songs list
	let filteredSongs = isPlaylist ? [...playlist] : songsList.map(song => song);
	// let filteredSongs = [...songsList];

	// filter out songs in playlist
	// filteredSongs = filteredSongs.filter((song) => {
	// 	return !playlist.find((playlistSong) => playlistSong.id === song.id)
	// })

	if (searchValue) {
		filteredSongs = filteredSongs.filter((song) => {
			return song.songName.toLowerCase().includes(searchValue) ||
				song.artistName.toLowerCase().includes(searchValue) ||
				song.bandinfo.NamesOfSingers.toLowerCase().includes(searchValue)
		});
	}

	// this is filter by genre
	const genreValue = select.value;
	if (genreValue) {
		filteredSongs = filteredSongs.filter((song) => {
			if (genreValue === 'Select Genre') {
				return true;
			}
			return song.genre === genreValue;
		});
	}

	const isRestrictedChecked = restricted.checked;
	filteredSongs = filteredSongs.filter((song) => {
		if (isRestrictedChecked) {
			return song.bandinfo.singer1.wasOnIDJShow === true;
		}

		return true;
	});

	// console.log(restricted.checked)
	// console.log(filteredSongs);
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

	const selectGenreOptions = document.createElement('option');
	selectGenreOptions.innerText = 'Select Genre';
	select.append(selectGenreOptions);

	genres.forEach((genre) => {
		const optionElement = document.createElement('option');
		optionElement.innerText = genre;
		optionElement.setAttribute('value', genre);

		select.append(optionElement);
	})
}

function bindRowButtonEventListeners(songsList) {
	if (!isPlaylist) {
		songsList.forEach((song) => {
			const addToPlaylistButton = document.getElementById(`add-btn-${song.id}`);
			addToPlaylistButton.addEventListener('click', () => {
				addSongToPlaylist(song);
			})
		})
	} else {
		songsList.forEach((song) => {
			const removeFromPlaylistButton = document.getElementById(`remove-btn-${song.id}`);
			removeFromPlaylistButton.addEventListener('click', () => {
				removeSongFromPlaylist(song);
			})
		})
	}
}

function addSongToPlaylist(song) {
	playlist.push(song);
	// console.log(playlist)
	// filterSongs()
	const addToPlaylistButton = document.getElementById(`add-btn-${song.id}`);

	addToPlaylistButton.classList.add('disabled')
}

function removeSongFromPlaylist(song) {
	playlist = playlist.filter((playlistSong) => {
		return playlistSong.id !== song.id;
	});

	renderTableData(playlist);
}

function generatePagination(songs) {
	const totalPages = Math.ceil(songs.length / songsPerPage);

	pagination.innerHTML = '';

	for (let i = 1; i <= totalPages; i++) {
		const li = document.createElement('li');
		li.innerHTML = `<a class="page-link ${i === 1 ? 'active' : ''}" id="page-link-${i}" href="#">${i}</a>`;
		pagination.append(li);

		li.addEventListener('click', () => {
			const activeElement = document.getElementsByClassName('page-link active');
			if (activeElement) {
				activeElement[0].classList.remove('active')
			}
			currentPage = i;
			renderTableData(songs);


			document.getElementById(`page-link-${i}`).classList.add('active');
		});
	}
}