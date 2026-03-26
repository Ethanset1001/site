export class Camera {
  constructor(width, height) {
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
    this.zoom = 1;
    this.smoothing = 0.1;
  }
  
  resize(width, height) {
    this.width = width;
    this.height = height;
  }
  
  follow(targetX, targetY, deltaTime) {
    const speed = this.smoothing;
    this.x += (targetX - this.x) * speed;
    this.y += (targetY - this.y) * speed;
  }
  
  apply(ctx) {
    ctx.translate(this.width / 2, this.height / 2);
    ctx.scale(this.zoom, this.zoom);
    ctx.translate(-this.x, -this.y);
  }
  
  screenToWorld(screenX, screenY) {
    return {
      x: (screenX - this.width / 2) / this.zoom + this.x,
      y: (screenY - this.height / 2) / this.zoom + this.y
    };
  }
}