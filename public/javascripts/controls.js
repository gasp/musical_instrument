const controls = () => {

  // keyboard controls

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
      samples[0].obj.play(samples[0].obj.audioData,{loop: samples[0].loop});
    }
    if(ev.which === 83) {
      app.ui.circle(2, 7, 1);
      samples[1].obj.play(samples[1].obj.audioData,{loop: samples[1].loop});
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
      // FIXME DUPLICATE with red button
      // FIXME this should be moved in sample
      setTimeout(() => {
        if (app.mic.get() === null) {
          console.error('app.mic.get() is empty')
        }
        // DRY this with Sample class
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
      }, 100);
    }
  });



  // gamepad controls
  app.controller.on('pressed', 'b', () => {
    console.log('b pressed');
    app.ui.circle(0, 7, 1, '#aa0c0c');
    app.mic.record();
  });

  app.controller.on('released', 'b', () => {
    console.log('b released');
    app.ui.circle(0, 7, 1, '#e2e1e1');
    app.mic.stop();
    // FIXME DUPLICATE with red button
    // FIXME this should be moved in sample
    setTimeout(() => {
      if (app.mic.get() === null) {
        console.error('app.mic.get() is empty')
      }
      // DRY this with Sample class
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
    }, 100);
  });
}
