class App {
  constructor () {
    this.ticking = false;
    setTimeout(()=> {
      if (!this.ticking) this.tick();
    }, 1000); // cool down 1 sec

    this.ui = new Ui(document.querySelector('canvas'));
    this.controller = new Controller();
    this.mic = new Microphone();
    this.sound = new Sound();
  }

  tick () {
    this.ticking = true;
    window.requestAnimationFrame(() => this.tick());
    // console.log('ticking');
    this.controller.tick();
    this.ui.tick(this.controller);
  }
}

let app = {};
window.addEventListener('load', () => {
  // singleton
  app = new App();
}, false);
