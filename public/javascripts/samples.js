class Sample {
  constructor() {
    this.audioData = null;
  }
  load(url) {
    return fetch(url).then((response) => { // fetch is natively a promise
      return response.arrayBuffer();
    }).then((audioData) => {
      return new Promise((resolve, reject) => {
        context.decodeAudioData(audioData, (buffer) => {
          this.audioData = buffer;
          resolve(buffer)
        });
      });
    });
  }
  play(loop=false) {
    const player = context.createBufferSource();
    player.buffer = this.audioData;
    player.start();
    player.loop = loop;
    player.connect(amp);
    return player;
  }
}

const samples = [
  {name: 'hat', source: '/samples/odx/012_DX_Cl_Hat.wav', loop: false},
  {name: 'abt', source: '/samples/ade/003_abt.wav', loop: true}
];

Promise.all((() => {
  samples.forEach((s) => {
    s.obj = new Sample();
  });
  return samples.map((s) => {
    return s.obj.load(s.source);
  });
})()).then((audioBuffers) => {
  // everything is playable !
  console.log(audioBuffers, samples[1].obj.audioData.duration);
  // FIXME no need to autostart,
  // instead, start drawing some ui
  // samples.forEach((s) => {
  //   s.obj.play(s.loop);
  // });
});
