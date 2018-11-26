    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioCtx = new AudioContext();
    var myAudio = document.querySelector('audio');
    var pre = document.querySelector('pre');
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
