const mapping = {
  // this mapping  is for gamecube_retrolink on Chrome
  name: 'Generic   USB  Joystick   (STANDARD GAMEPAD Vendor: 0079 Product: 0006)',
  buttons: {
    // to avoid confusion, I will use north south, east west instead of directions
    n: 12, // top
    s: 13, // bottom
    w: 14, // left
    e: 15, // right
    // actions buttons
    a: 2,
    b: 3, // the red one
    x: 0,
    y: 1,
    l: 4, // left trigger
    r: 5, // right trigger
    z: 6, // alt right trigger
    p: 9, // start/pause
  },
  axes: {
    left: {x:0, y:1}, // control stick
    right: {x:2, y:3} // c/yellow stick
  }
};
// remap depending on browsers and pads

class Controller {
  constructor() {
    this.pads = [];
    this.prevPads = [];
    this.pad = false;
    this.buttons = {
      b: false
    };
    const gamepadSupportAvailable = navigator.getGamepads ||
        !!navigator.webkitGetGamepads ||
        !!navigator.webkitGamepads;

    if (!gamepadSupportAvailable) {
      // It doesn’t seem Gamepad API is available – show a message telling
      // the visitor about it.
      console.log('gamepad not supported by the browser');
    } else {
      // Check and see if gamepadconnected/gamepaddisconnected is supported.
      // If so, listen for those events and don't start polling until a gamepad
      // has been connected.
      if ('ongamepadconnected' in window) {
        window.addEventListener('gamepadconnected', this.onGamepadConnect, false);
        window.addEventListener('gamepaddisconnected', this.onGamepadDisconnect, false);
      } else {
        // If connection events are not supported just start polling
        // this.startPolling();
        setInterval(this.detect.bind(this), 5000);
        setTimeout(this.detect.bind(this), 1000);
        setTimeout(this.detect.bind(this), 2000);
      }
    }
  }

  onGamepadConnect() {
    console.log('connected')
  }
  detect() {
    console.log('pads?')
    const rawPads = navigator.getGamepads();
    if (!rawPads.length) return false;
    if (rawPads[0] === null) return false; // chrome always set 4 empty rawPads
    // do we already have data about pads ?
    // FIXME: check all gamepads, not only the first one
    if (this.prevPads.length && rawPads[0].id === this.prevPads[0].id) return false;

    // update pads
    this.prevPads = this.pads;
    if (!this.prevPads.length) this.prevPads = rawPads;
    this.pads = rawPads;
    console.log('new pad!', rawPads[0].id);
    this.pad = rawPads[0];
  }
  tick() {
    // no pads, return
    if (this.pad === false) return;

    if (/Chrome/.test(navigator.userAgent)) {
      // chrome has to refresh getGamepads
      navigator.getGamepads();
    }

    // map button b
    // pressed
    if (this.pad.buttons[mapping.buttons.b].pressed
      && !this.buttons.b) {
      app.ui.circle(0, 7, 1, '#aa0c0c');
      console.log('fake recording start');
    }
    // released
    if (!this.pad.buttons[mapping.buttons.b].pressed
      && this.buttons.b) {
      app.ui.circle(0, 7, 1, '#e2e1e1');
      console.log('fake recording stop');
    }
    this.buttons.b = this.pad.buttons[mapping.buttons.b].pressed;

    // no movement, ignore
    if (this.x === this.pad.axes[mapping.axes.left.x] && this.y === this.pad.axes[mapping.axes.left.y]) return;

    this.x = this.pad.axes[mapping.axes.left.x];
    this.y = this.pad.axes[mapping.axes.left.y];
    // console.log(this.x, this.y);
    // FIXME get those outta there
    lfo_amp.gain.value = this.y;
    if (this.x > 0) lfo.frequency.value = Math.exp(this.x) * 400;
    if (this.x < 0) lfo.frequency.value = this.x * 100;
    console.log(lfo.frequency.value);
  }
}
