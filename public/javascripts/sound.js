// TODO:
// this should be cut between sources and player
// sources can be recorder (gum), samples (pre set sounds) and oscillator
// there should be a kind of sound.amp interface
// sound playBuffer too
// sound should then be sent to websocket
// http://www.jingpingji.com/blog/2015/8/4/transferring-sound-data-with-binaryjs-and-buffering-for-smooth-playbac

const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();

class Sound {
  constructor() {

  }
  play(buffer, options) {
    console.log(buffer, options.loop)
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(amp);
    source.loop = options.loop || false;
    source.start(options.start || 0);
  }
}

// Create + connect _compressor -- Compress me because I hate clipping
const compressor = context.createDynamicsCompressor(); // The defaults for this are good.
compressor.connect(context.destination); // Chain

// global gain control
const amp = context.createGain();
amp.gain.value = .5;
const analyser = context.createAnalyser();
amp.connect(analyser);


analyser.connect(compressor);
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
