// TODO:
// this should be cut between sources and player
// sources can be recorder (gum), samples (pre set sounds) and oscillator
// there should be a kind of sound.amp interface
// sound playBuffer too

const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();

class Sound {
  constructor() {

  }
  playBuffer(buffer, options) {
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(amp);
    source.loop = options.loop || false;
    source.start(options.start || 0);
  }
}


// global gain control
const amp = context.createGain();
amp.gain.value = .5;
const analyser = context.createAnalyser();
amp.connect(analyser);
analyser.connect(context.destination);
analyser.fftSize = 1024;
const dataArray = new Float32Array(1024);

// lfo
const lfo = context.createOscillator();
lfo.frequency.value = 20;
lfo_amp = context.createGain()
lfo_amp.gain.value = .5;
lfo.connect(lfo_amp);
lfo_amp.connect(amp);
lfo.start();

class Oscillator {
  constructor(freq) {
    this.gainNode = context.createGain();
    this.gainNode.gain.value = 0;
    console.log(context.currentTime);
    this.gainNode.gain.linearRampToValueAtTime(.25, context.currentTime + .01);
    console.log(this.gainNode.gain.value);

    this.oscillator = context.createOscillator();
    this.oscillator.frequency.value = freq;

    this.gainNode.connect(amp);
    // this.gainNode.connect(lfo.frequency);
    this.oscillator.connect(this.gainNode);

    this.oscillator.start();
    this.playing = true;
    this.oscillator.onended = () => {
        this.gainNode.disconnect(amp);
        this.oscillator.disconnect();
    }

    this.off = () => {
      console.log(context.currentTime);
      this.gainNode.gain.linearRampToValueAtTime(0.01, context.currentTime + .3);
      this.oscillator.stop(context.currentTime + .35);
    }
  }
}



var kCodes = [65,90,69,82],
  kLetters = ['a','z','e','r'],
  frequencies = [261.63,293.66,329.63,349.23],
  oscillators = [null,null,null,null];
// sound.init(kCodes.length);

document.addEventListener("keydown", (ev) => {
  const i = kCodes.indexOf(ev.keyCode);
  if (ev.repeat) return;
  if(i>-1){
    app.ui.circle(i + 1, 6, .8);
    oscillators[i] = new Oscillator(frequencies[i]);
  }
  if(ev.which === 32) {
    // in recording mode
    console.log('space pressed, recording mode')
    app.ui.circle(0, 7, 1, '#aa0c0c');
    app.mic.record();
    ev.preventDefault(); // prevent from scrolling
  }
  if(ev.which === 81) {
    app.ui.circle(1, 7, 1);
    samples[0].obj.play(samples[0].loop)
  }
  if(ev.which === 83) {
    app.ui.circle(2, 7, 1);
    samples[1].obj.play(samples[1].loop)
  }

});

document.addEventListener("keyup", (ev) => {
  var i = kCodes.indexOf(ev.keyCode);
  if (ev.repeat) return;
  if(i>-1){
    app.ui.circle(i + 1, 6, .2);
    oscillators[i].off();
  }
  if(ev.which === 81) {
    app.ui.circle(1, 7, 0);
  }
  if(ev.which === 32) {
    // in recording mode
    console.log('space pressed, recording mode')
    app.ui.circle(0, 7, 1, '#e2e1e1');
    app.mic.stop();
    // FIXME this should be moved in sample
    setTimeout(() => {
      if (app.mic.get() === null) {
        console.error('app.mic.get() is empty')
      }
      else context.decodeAudioData(app.mic.get(), function(buffer) {
        const source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(amp);
        source.loop = true;
        source.start(0);
      },
      function(e) {
        console.log("error ", e)
      });
    }, 100)
  }
});
