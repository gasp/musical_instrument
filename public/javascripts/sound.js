const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();

// global gain control
const amp = context.createGain();
amp.gain.value = .5;
amp.connect(context.destination)

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
});

document.addEventListener("keyup", (ev) => {
  var i = kCodes.indexOf(ev.keyCode);
  if (ev.repeat) return;
  if(i>-1){
    app.ui.circle(i + 1, 6, .2);
    oscillators[i].off();
  }
});
