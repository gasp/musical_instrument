// Prefer camera resolution nearest to 1280x720.
const constraints = { audio: true, video: false };

navigator.mediaDevices.getUserMedia(constraints)
.then(function(mediaStream) {
  const audio = document.querySelector('audio');
  audio.srcObject = mediaStream;
  audio.onloadedmetadata = function(e) {
    audio.play();
  };
})
.catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.
