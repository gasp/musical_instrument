class Controller {
  constructor() {
    this.pads = [];
    this.prevPads = [];
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
  }
  tick() {
    // no pads, return
    if (!this.pads.length) return;

    // map axes
    let ax = 1;
    let ay = 2;
    if (/Chrome/.test(navigator.userAgent)) {
      // chrome has to refresh getGamepads
      navigator.getGamepads();
      // chrome maps diffetrently
      ax = 0;
      ay = 1;
    }

    // no movement, ignore
    if (this.x === this.pads[0].axes[ax] && this.y === this.pads[0].axes[ay]) return;

    this.x = this.pads[0].axes[ax];
    this.y = this.pads[0].axes[ay];
    // console.log(this.x, this.y);
    lfo_amp.gain.value = this.y;
    if (this.x > 0) lfo.frequency.value = Math.exp(this.x) * 400;
    if (this.x < 0) lfo.frequency.value = this.x * 100;
    console.log(lfo.frequency.value);
  }
}
