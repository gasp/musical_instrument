class App {
  constructor () {
    this.ticking = false;
    setTimeout(()=> {
      if (!this.ticking) this.tick();
    }, 1000); // cool down 1 sec
  }

  tick () {
    this.ticking = true;
    window.requestAnimationFrame(() => this.tick());
    // console.log('ticking');
    
  }
}

const app = new App();
