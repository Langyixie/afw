const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();
const audioElement = document.querySelector('audio');
const track = audioCtx.createMediaElementSource(audioElement);
const playButton = document.querySelector('.tape-controls-play');
playButton.addEventListener('click', function() {
	if (audioCtx.state === 'suspended') {
		audioCtx.resume();
	}
	if (this.dataset.playing === 'false') {
		audioElement.play();
		this.dataset.playing = 'true';
	} else if (this.dataset.playing === 'true') {
		audioElement.pause();
		this.dataset.playing = 'false';
	}
	let state = this.getAttribute('aria-checked') === "true" ? true : false;
	this.setAttribute( 'aria-checked', state ? "false" : "true" );
}, false);
audioElement.addEventListener('ended', () => {
	playButton.dataset.playing = 'false';
	playButton.setAttribute( "aria-checked", "false" );
}, false);
const gainNode = audioCtx.createGain();
const volumeControl = document.querySelector('[data-action="volume"]');
volumeControl.addEventListener('input', function() {
	gainNode.gain.value = this.value;
}, false);
const pannerOptions = {pan: 0};
const panner = new StereoPannerNode(audioCtx, pannerOptions);
const pannerControl = document.querySelector('[data-action="panner"]');
pannerControl.addEventListener('input', function() {
	panner.pan.value = this.value;
}, false);
track.connect(gainNode).connect(panner).connect(audioCtx.destination);
