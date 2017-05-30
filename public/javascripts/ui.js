class Ui {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');

    // canvas width, height and unit (in pixels)
    this.width = 400;
    this.height = 400;
    this.unit = 50;

    this.grid();
    this.circle(0,0,Math.random());
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
  circle(ux, uy, completion) {
    const startx = ux * this.unit;
    const starty = uy * this.unit;
    this.context.clearRect(startx, starty * this.unit, this.unit, this.unit);

    this.context.beginPath();
    // background grey circle
    // x, y, radius, start, end, anticlockwise
    this.context.arc(startx + this.unit/2 , starty + this.unit/2, this.unit*2/5,
      0, Math.PI*2, false);
    this.context.fillStyle = '#e2e1e1';
    this.context.fill();

    this.context.beginPath();
    // over yellow arc
    // context.arc(150, 150, 50,
    //   Math.PI / 2 - Math.PI * percent / 100,
    //   Math.PI / 2 + Math.PI * percent / 100, false);
    this.context.arc(startx + this.unit/2 , starty + this.unit/2, this.unit*2/5,
      Math.PI * (1 - 2 * completion) / 2,
      Math.PI * (1 + 2 * completion) / 2, false
    );
    this.context.fillStyle = '#fccd00';
    this.context.fill();
  }
}

window.addEventListener('load', () => {
  const ui = new Ui(document.querySelector('canvas'))
}, false);
