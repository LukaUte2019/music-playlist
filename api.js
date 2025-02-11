export async function getSongs() {
	const response = await fetch('http://lukaserver.ddns.net:81/songs');
	const songs = await response.json();

	return new Promise((resolve) => {
		const delay = Math.floor(Math.random() * 3000) + 1000;
		setTimeout(() => {
			resolve(songs);
		}, delay)
	})
}