
function playSong(songurl, songid) {
	let audioElement = document.getElementById("playSong")
    let playPause = document.getElementById(`play-btn-${songid}`);
	var showPlayButton = document.getElementById(`play-btn-${songid - 1}`);
	playPause.style.textDecoration = "none";
	audioElement.src = songurl;

	if (playPause.innerText == "Play") {
		playPause.innerText = "Stop";
		audioElement.play();
		console.log(`Started playing audio stream: ${songurl}`)
		const addBtndiv = document.getElementById(`div-song-play-btn-${songid}`);
		addBtndiv.title.text = "Stop Playing song";
	} else {
		playPause.innerText = "Play";
		audioElement.pause();
		const addBtndiv = document.getElementById(`div-song-play-btn-${songid}`);
		addBtndiv.title.text = "Start Playing song";
		console.log(`Paused audio stream: ${songurl}`)
	}
}