const errorElement = document.getElementById('error');

$.ajax({
	url: "http://lukaserver.ddns.net:81/radiohits",

	success: function(data) {
	errorElement.style.display = 'none';
	}
,
    error: function() {
	errorElement.style.display = 'visible';
	}
})
export async function getSongs() {
	const response = await fetch('http://lukaserver.ddns.net:81/radiohits');
	const songs = await response.json();



	return new Promise((resolve) => {
		const delay = Math.floor(Math.random() * 3000) + 1000;
		setTimeout(() => {
			resolve(songs);
		}, delay)
	})
}