window.requestAnimFrame = (function() {

    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback, element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();
window.AudioContext = (function() {
    return window.webkitAudioContext || window.AudioContext || window.mozAudioContext;
})();

var audioContext;
var audioBuffer;
var sourceNode;
var analyserNode;
var javascriptNode;
var audioData = null;
var audioPlaying = false;
var sampleSize = 1024;
var amplitudeArray;
var audioUrl = "Gymnopedie.wav";
var canvasWidth = 512;
var canvasHeight = 256;
var ctx;
$(document).ready(function() {
    ctx = $("#canvas").get()[0].getContext("2d");
    try {
        audioContext = new AudioContext();
    } catch (e) {
        alert('Web Audio API is not supported in this browser');
    }

    $("#start_button").on('click', function(e) {
        e.preventDefault();

        setupAudioNodes();

        javascriptNode.onaudioprocess = function() {

            analyserNode.getByteTimeDomainData(amplitudeArray);

            if (audioPlaying == true) {
                requestAnimFrame(drawTimeDomain);
            }
        }

        if (audioData == null) {
            loadSound(audioUrl);
        } else {
            playSound(audioData);
        }
    });

    $("#stop_button").on('click', function(e) {
        e.preventDefault();
        sourceNode.stop(0);
        audioPlaying = false;
    });
});

function setupAudioNodes() {
    sourceNode = audioContext.createBufferSource();
    analyserNode = audioContext.createAnalyser();
    javascriptNode = audioContext.createScriptProcessor(sampleSize, 1, 1);

    amplitudeArray = new Uint8Array(analyserNode.frequencyBinCount);

    sourceNode.connect(audioContext.destination);
    sourceNode.connect(analyserNode);
    analyserNode.connect(javascriptNode);
    javascriptNode.connect(audioContext.destination);
}

function loadSound(url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    request.onload = function() {
        audioContext.decodeAudioData(request.response, function(buffer) {
            audioData = buffer;
            playSound(audioData);
        }, onError);
    }
    request.send();
}

function playSound(buffer) {
    sourceNode.buffer = buffer;
    sourceNode.start(0);
    sourceNode.loop = true;
    audioPlaying = true;
}

function onError(e) {
    console.log(e);
}

function drawTimeDomain() {
    clearCanvas();
    for (var i = 0; i < amplitudeArray.length; i++) {
        var value = amplitudeArray[i] / 256;
        var y = canvasHeight - (canvasHeight * value) - 1;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(i, y, 1, 1);
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}
