class Ui {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.grid();
  }
  tick() {

  }
  // grid
  grid(context) {
    this.context.strokeStyle = '#ccc'; // '#ff115f';
    this.context.lineWidth = 0.5;

    const bw = 400;
    const bh = 400;
    //padding around grid
    const p = 0;
    //size of canvas
    const cw = bw + (p*2) + 1;
    const ch = bh + (p*2) + 1;

    for (var x = 0; x <= bw; x += 50) {
      this.context.moveTo(0.5 + x + p, p);
      this.context.lineTo(0.5 + x + p, bh + p);
    }

    for (var x = 0; x <= bh; x += 50) {
      this.context.moveTo(p, 0.5 + x + p);
      this.context.lineTo(bw + p, 0.5 + x + p);
    }

    this.context.strokeStyle = "black";
    this.context.stroke();
  }
}

window.addEventListener('load', () => {
  const ui = new Ui(document.querySelector('canvas'))
}, false);
