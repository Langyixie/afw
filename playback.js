var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var source;
var songLength;
var pre = document.querySelector('pre');
var myScript = document.querySelector('script');
var play = document.querySelector('.play');
var stop = document.querySelector('.stop');
var playbackControl = document.querySelector('.playback-rate-control');
var playbackValue = document.querySelector('.playback-rate-value');
playbackControl.setAttribute('disabled', 'disabled');
var loopstartControl = document.querySelector('.loopstart-control');
var loopstartValue = document.querySelector('.loopstart-value');
loopstartControl.setAttribute('disabled', 'disabled');
var loopendControl = document.querySelector('.loopend-control');
var loopendValue = document.querySelector('.loopend-value');
loopendControl.setAttribute('disabled', 'disabled');
function getData() {
  source = audioCtx.createBufferSource();
  request = new XMLHttpRequest();
  request.open('GET', 'Gymnopedie.wav', true);
  request.responseType = 'arraybuffer';
  request.onload = function() {
    var audioData = request.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        myBuffer = buffer;
        songLength = buffer.duration;
        source.buffer = myBuffer;
        source.playbackRate.value = playbackControl.value;
        source.connect(audioCtx.destination);
        source.loop = true;
        loopstartControl.setAttribute('max', Math.floor(songLength));
        loopendControl.setAttribute('max', Math.floor(songLength));
      },
      function(e){"Error with decoding audio data" + e.error});
  }
  request.send();
}
play.onclick = function() {
  getData();
  source.start(0);
  play.setAttribute('disabled', 'disabled');
  playbackControl.removeAttribute('disabled');
  loopstartControl.removeAttribute('disabled');
  loopendControl.removeAttribute('disabled');
}
stop.onclick = function() {
  source.stop(0);
  play.removeAttribute('disabled');
  playbackControl.setAttribute('disabled', 'disabled');
  loopstartControl.setAttribute('disabled', 'disabled');
  loopendControl.setAttribute('disabled', 'disabled');
}
playbackControl.oninput = function() {
  source.playbackRate.value = playbackControl.value;
  playbackValue.innerHTML = playbackControl.value;
}
loopstartControl.oninput = function() {
  source.loopStart = loopstartControl.value;
  loopstartValue.innerHTML = loopstartControl.value;
}
loopendControl.oninput = function() {
  source.loopEnd = loopendControl.value;
  loopendValue.innerHTML = loopendControl.value;
}
pre.innerHTML = myScript.innerHTML;
