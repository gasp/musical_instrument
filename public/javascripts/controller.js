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

    // no movement, ignore
    if (this.x === this.pads[0].axes[1] && this.y === this.pads[0].axes[2]) return;

    this.x = this.pads[0].axes[1];
    this.y = this.pads[0].axes[2];
    console.log(this.x, this.y);
  }
}
