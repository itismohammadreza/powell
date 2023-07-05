import {Component, OnInit} from '@angular/core';

export class WaterTexture {
  size
  points
  radius
  width
  maxAge
  height
  canvas
  ctx

  constructor(options) {
    this.size = 64;
    this.points = [];
    this.radius = this.size * 0.1;
    this.width = this.height = this.size;
    this.maxAge = 64;
    if (options.debug) {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.radius = this.width * 0.1;
    }

    this.initTexture();
    if (options.debug) document.body.append(this.canvas);
  }

  // Initialize our canvas
  initTexture() {
    this.canvas = document.createElement("canvas");
    this.canvas.id = "WaterTexture";
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext("2d");
    this.clear();
  }

  clear() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  addPoint(point) {
    this.points.push({x: point.x, y: point.y, age: 0});
  }

  update() {
    this.clear();
    this.points.forEach((point, i) => {
      point.age += 1;
      if (point.age > this.maxAge) {
        this.points.splice(i, 1);
      }
    });
    this.points.forEach(point => {
      this.drawPoint(point);
    });
  }

  drawPoint(point) {
    // Convert normalized position into canvas coordinates
    let pos = {
      x: point.x * this.width,
      y: point.y * this.height
    };
    const radius = this.radius;
    const ctx = this.ctx;

    let intensity = 1;
    intensity = 1 - point.age / this.maxAge;

    let color = "255,255,255";

    let offset = this.width * 5;
    // 1. Give the shadow a high offset.
    ctx.shadowOffsetX = offset;
    ctx.shadowOffsetY = offset;
    ctx.shadowBlur = radius * 1;
    ctx.shadowColor = `rgba(${color},${0.2 * intensity})`;

    this.ctx.beginPath();
    this.ctx.fillStyle = "rgba(255,0,0,1)";
    // 2. Move the circle to the other direction of the offset
    this.ctx.arc(pos.x - offset, pos.y - offset, radius, 0, Math.PI * 2);
    this.ctx.fill();
  }
}

class App {
  waterTexture: WaterTexture

  constructor() {
    this.waterTexture = new WaterTexture({debug: true});
    this.tick = this.tick.bind(this);
    this.init();
  }

  init() {
    window.addEventListener("mousemove", this.onMouseMove.bind(this));
    this.tick();
  }

  onMouseMove(ev) {
    const point = {
      x: ev.clientX / window.innerWidth,
      y: ev.clientY / window.innerHeight
    };

    this.waterTexture.addPoint(point);
  }

  tick() {
    this.waterTexture.update();
    requestAnimationFrame(this.tick);
  }
}

@Component({
  selector: 'ng-smoke',
  templateUrl: './smoke.component.html',
  styleUrls: ['./smoke.component.scss']
})
export class SmokeComponent implements OnInit {
  ngOnInit() {
    new App();
  }
}
