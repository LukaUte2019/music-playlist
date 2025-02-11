
function playSong(songurl, songid) {
	var audioElement = document.getElementById("playSong")
    var playPause = document.getElementById(`play-btn-${songid}`);
	var showPlayButton = document.getElementById(`play-btn-${songid - 1}`);
	playPause.style.textDecoration = "none";
	audioElement.src = songurl;

	if (playPause.innerText == "Play") {
		playPause.innerText = "Pause";
		audioElement.play();
	} else {
		playPause.innerText = "Play";
		audioElement.pause();
	}
}