function loadSampleWithFetch(url, cb) {
  fetch(url).then(function(response) {
    return response.arrayBuffer();
  }).then(function(audioData) {
    context.decodeAudioData(audioData, function(buffer) {
      console.log(buffer);
      cb(buffer);
    });
  });
}
var hat;

loadSampleWithFetch('/samples/odx/012_DX_Cl_Hat.wav', function (buffer){
    hat = buffer;
});


function playHat() {
     var player = context.createBufferSource();
    player.buffer = hat;
    player.start();
    player.loop = false;
    player.connect(amp); // FIXME this bypasses amp and analyzer
}


function playBackgroundLoop() {
  loadSampleWithFetch('/samples/ade/003_abt.wav', function (buffer){
      let bgLoop = buffer;
      const player = context.createBufferSource();
      player.buffer = bgLoop;
      player.start();
      player.loop = true;
      player.connect(amp);  // FIXME this bypasses amp and analyzer
      console.log('playing backgrouns')
  });

}
