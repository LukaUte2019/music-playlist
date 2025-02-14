let loadOnlineAPI = false;


const errorElement = document.getElementById('error');

$.ajax({
	url: "http://lukaserver.ddns.net:81/songs",

	success: function(data) {
	errorElement.style.display = 'none';
	}
,
    error: function() {
	errorElement.style.display = 'visible';
	}
})

export async function getSongs() {

	if (loadOnlineAPI) {
		const response = await fetch('http://lukaserver.ddns.net:81/songs');
		const songs = await response.json();
		return new Promise((resolve) => {
			const delay = Math.floor(Math.random() * 3000) + 1000;
			setTimeout(() => {
				resolve(songs);
			}, delay)
		})
	    
	} else {
		const response = await fetch('/music-playlist/songs.json');
		const songs = await response.json();
		return new Promise((resolve) => {
			const delay = Math.floor(Math.random() * 3000) + 1000;
			setTimeout(() => {
				resolve(songs);
			}, delay)
		})
	}
	}