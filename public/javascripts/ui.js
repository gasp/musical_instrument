class Ui {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');

    // canvas width, height and unit (in pixels)
    this.width = 400;
    this.height = 400;
    this.unit = 50;

    // this.grid();
    // just some notes
    this.context.beginPath();
    this.context.font = '48px serif';
    this.context.fillStyle = '#477cf2';
    this.context.fillText('initializing', 80, 150);

    for (let i = 1; i < 5; i++) {
      for (let j = 0; j < 2; j++) {
        this.circle(i, j + 6, Math.random());
      }
    }
    this.ring(6, 6, -999, 0);
    this.context.fillStyle = '#000'
    this.context.font = '8px sans-serif'
    this.context.fillText('A: osc0',
      this.unit * 1 + this.unit/2 - 12,
      this.unit * 6 + this.unit/2 + 3);
    this.context.fillText('Z: osc1',
      this.unit * 2 + this.unit/2 - 12,
      this.unit * 6 + this.unit/2 + 3);
    this.context.fillText('E: osc2',
      this.unit * 3 + this.unit/2 - 12,
      this.unit * 6 + this.unit/2 + 3);
    this.context.fillText('R: osc3',
      this.unit * 4 + this.unit/2 - 12,
      this.unit * 6 + this.unit/2 + 3);
    this.context.fillText('Q: hat',
      this.unit * 1 + this.unit/2 - 8,
      this.unit * 7 + this.unit/2 + 3);
    this.context.fillText('S: bg',
      this.unit * 2 + this.unit/2 - 8,
      this.unit * 7 + this.unit/2 + 3);
  }
  tick(controller) {
    this.ring(6, 6, controller.x, controller.y);
    this.wave();
    this.circle(0, 6, 0);
    this.pitchcircle(0, 6, (context.currentTime % pitch) / pitch, '#ccc', false);
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

    for (let x = 0; x <= this.width; x += this.unit) {
      this.context.moveTo(0.5 + x + p, p);
      this.context.lineTo(0.5 + x + p, this.height + p);
    }

    for (let x = 0; x <= this.height; x += this.unit) {
      this.context.moveTo(p, 0.5 + x + p);
      this.context.lineTo(this.width + p, 0.5 + x + p);
    }

    this.context.strokeStyle = "black";
    this.context.stroke();
  }

  circle(ux, uy, completion=1, color='#fccd00') {
    const startx = ux * this.unit;
    const starty = uy * this.unit;
    this.context.clearRect(startx, starty, this.unit, this.unit);
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
    this.context.fillStyle = color;
    this.context.fill();
  }

  pitchcircle(ux, uy, completion=1, color='#fc1919', rec=true) {
    const startx = ux * this.unit;
    const starty = uy * this.unit;
    // this.context.clearRect(startx, starty, this.unit, this.unit);
    if (rec) {
      this.context.beginPath();
      this.context.strokeStyle = '#fc1919';
      this.context.lineWidth = 2;
      this.context.arc(startx + this.unit/2 , starty + this.unit/2, this.unit*2/5,
        - Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * completion, false);
      this.context.stroke();
      // debug
      // this.context.font = '8px sans-serif'
      // this.context.fillText(Math.floor(completion*100)/100,
      //   startx + this.unit/2 - 8,
      //   starty + this.unit/2 + 3);
    }

    this.context.beginPath();
    this.context.arc(startx + this.unit/2 , starty + this.unit/2, this.unit*2/5,
      Math.PI * 2 * completion - Math.PI / 2, Math.PI * 2 * completion + Math.PI / 16 - Math.PI / 2, false);
    this.context.strokeStyle = '#000'
    this.context.lineWidth = 4;
    this.context.stroke();
  }

  ring(ux, uy, cx, cy) {
    // start drawing at
    const startx = ux * this.unit;
    const starty = uy * this.unit;

    // pointer
    const pointx = startx + this.unit + this.unit/1.5 * cx;
    const pointy = starty + this.unit + this.unit/1.5 * cy;

    // clear the space used by the ring
    this.context.clearRect(startx, starty, this.unit * 2, this.unit * 2);

    // big circle
    this.context.beginPath();
    this.context.fillStyle = '#e2340e'; // '#ff115f';
    this.context.arc(startx + this.unit, starty + this.unit, this.unit, 0, Math.PI*2, false);
    this.context.fill();

    // small circle
    this.context.beginPath();
    this.context.fillStyle = '#fff';
    this.context.arc(startx + this.unit, starty + this.unit, this.unit / 2, 0, Math.PI*2, false);
    this.context.fill();

    // point
    this.context.beginPath();
    this.context.fillStyle = '#000';
    this.context.arc(pointx, pointy, this.unit / 3 - 1, 0, Math.PI*2, false);
    this.context.fill();
  }
  wave() {
    analyser.getFloatTimeDomainData(dataArray);
    this.context.fillStyle = '#fff';
    this.context.fillRect(0, 0, this.width, 255);
    this.context.lineWidth = 2;
    this.context.strokeStyle = '#477cf2';
    this.context.beginPath();

    const sliceWidth = this.width / 1024;
    let x = 0;
    this.context.moveTo(0, 150);
    for (let i = 0; i < 1024; i++) {
      const v = dataArray[i] * 200.0;
      const y = Math.min(200/2 + v, 200);
      this.context.lineTo(x, y + 50);
      x += sliceWidth;
    }
    this.context.lineTo(this.width, 150);
    this.context.stroke();
  }
}
