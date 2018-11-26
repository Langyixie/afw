	var AudioContext = window.AudioContext || window.webkitAudioContext;
	var audioCtx = new AudioContext();
	var myAudio = document.querySelector('audio');
	var pre = document.querySelector('pre');v
	var myScript = document.querySelector('script');
	var button = document.querySelector('button');
	pre.innerHTML = myScript.innerHTML;
	// Create a MediaElementAudioSourceNode
	// Feed the HTMLMediaElement into it
	var source = audioCtx.createMediaElementSource(myAudio);
	// Create a compressor node
	var compressor = audioCtx.createDynamicsCompressor();
	compressor.threshold.value = -50;
	compressor.knee.value = 40;
	compressor.ratio.value = 12;
	compressor.attack.value = 0;
	compressor.release.value = 0.25;
	// connect the AudioBufferSourceNode to the destination
	source.connect(audioCtx.destination);
	button.onclick = function() {
	  var active = button.getAttribute('data-active');
	  if(active == 'false') {
	    button.setAttribute('data-active', 'true');
	    button.innerHTML = 'Remove compression';
	    source.disconnect(audioCtx.destination);
	    source.connect(compressor);
	    compressor.connect(audioCtx.destination);
	  } else if(active == 'true') {
	    button.setAttribute('data-active', 'false');
	    button.innerHTML = 'Add compression';
	    source.disconnect(compressor);
	    compressor.disconnect(audioCtx.destination);
	    source.connect(audioCtx.destination);
	  }
	}


// instigate our audio context
	// for cross browser
	const AudioContext = window.AudioContext || window.webkitAudioContext;
	const audioCtx = new AudioContext();
	// load some sound
	const audioElement = document.querySelector('audio');
	const track = audioCtx.createMediaElementSource(audioElement);
	const playButton = document.querySelector('.tape-controls-play');
	// play pause audio
	playButton.addEventListener('click', function() {
		// check if context is in suspended state (autoplay policy)
		if (audioCtx.state === 'suspended') {
			audioCtx.resume();
		}
		if (this.dataset.playing === 'false') {
			audioElement.play();
			this.dataset.playing = 'true';
		// if track is playing pause it
		} else if (this.dataset.playing === 'true') {
			audioElement.pause();
			this.dataset.playing = 'false';
		}
		let state = this.getAttribute('aria-checked') === "true" ? true : false;
		this.setAttribute( 'aria-checked', state ? "false" : "true" );
	}, false);
	// if track ends
	audioElement.addEventListener('ended', () => {
		playButton.dataset.playing = 'false';
		playButton.setAttribute( "aria-checked", "false" );
	}, false);
	// volume
	const gainNode = audioCtx.createGain();
	const volumeControl = document.querySelector('[data-action="volume"]');
	volumeControl.addEventListener('input', function() {
		gainNode.gain.value = this.value;
	}, false);
	// panning
	const pannerOptions = {pan: 0};
	const panner = new StereoPannerNode(audioCtx, pannerOptions);
	const pannerControl = document.querySelector('[data-action="panner"]');
	pannerControl.addEventListener('input', function() {
		panner.pan.value = this.value;
	}, false);
	// connect our graph
	track.connect(gainNode).connect(panner).connect(audioCtx.destination);
	// Track credit: Outfoxing the Fox by Kevin MacLeod under Creative Commons
