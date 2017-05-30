class Ui {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');

    // canvas width, height and unit (in pixels)
    this.width = 400;
    this.height = 400;
    this.unit = 50;

    this.grid();
  }
  tick() {

  }
  // grid
  grid() {
    this.context.strokeStyle = '#ccc'; // '#ff115f';
    this.context.lineWidth = 0.5;

    //padding around grid
    const p = 0;
    //size of canvas
    const cw = this.width + (p*2) + 1;
    const ch = this.height + (p*2) + 1;

    for (var x = 0; x <= this.width; x += this.unit) {
      this.context.moveTo(0.5 + x + p, p);
      this.context.lineTo(0.5 + x + p, this.height + p);
    }

    for (var x = 0; x <= this.height; x += this.unit) {
      this.context.moveTo(p, 0.5 + x + p);
      this.context.lineTo(this.width + p, 0.5 + x + p);
    }

    this.context.strokeStyle = "black";
    this.context.stroke();
  }
}

window.addEventListener('load', () => {
  const ui = new Ui(document.querySelector('canvas'))
}, false);
