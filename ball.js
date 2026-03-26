export class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.radius = 20;
    this.friction = 0.98;
  }
  
  update(deltaTime) {
    // Cap maximum speed to prevent clipping
    const maxSpeed = 45;
    const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (currentSpeed > maxSpeed) {
      const scale = maxSpeed / currentSpeed;
      this.vx *= scale;
      this.vy *= scale;
    }
    
    this.x += this.vx * deltaTime * 60;
    this.y += this.vy * deltaTime * 60;
    
    this.vx *= this.friction;
    this.vy *= this.friction;
    
    if (Math.abs(this.vx) < 0.01) this.vx = 0;
    if (Math.abs(this.vy) < 0.01) this.vy = 0;
  }
  
  render(ctx) {
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.stroke();
  }
}