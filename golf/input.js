export class InputHandler {
  constructor(canvas, camera) {
    this.canvas = canvas;
    this.camera = camera;
    
    this.isDragging = false;
    this.dragStart = { x: 0, y: 0 };
    this.dragCurrent = { x: 0, y: 0 };
    this.launchVelocity = null;
    this.canDrag = true;
    
    this.canvas.addEventListener('mousedown', (e) => this.onStart(e.clientX, e.clientY));
    this.canvas.addEventListener('mousemove', (e) => this.onMove(e.clientX, e.clientY));
    this.canvas.addEventListener('mouseup', (e) => this.onEnd(e.clientX, e.clientY));
    
    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      this.onStart(touch.clientX, touch.clientY);
    });
    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      this.onMove(touch.clientX, touch.clientY);
    });
    this.canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.onEnd(this.dragCurrent.x, this.dragCurrent.y);
    });
  }
  
  onStart(x, y) {
    if (!this.canDrag) return;
    this.isDragging = true;
    this.dragStart = { x, y };
    this.dragCurrent = { x, y };
  }
  
  onMove(x, y) {
    if (this.isDragging) {
      this.dragCurrent = { x, y };
    }
  }
  
  onEnd(x, y) {
    if (this.isDragging) {
      let dx = x - this.dragStart.x;
      let dy = y - this.dragStart.y;
      
      // Cap to max power (450 distance = 900 arrow length)
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 450;
      if (distance > maxDistance) {
        const scale = maxDistance / distance;
        dx *= scale;
        dy *= scale;
      }
      
      this.launchVelocity = {
        x: -dx * 0.22,
        y: -dy * 0.22
      };
      
      this.isDragging = false;
    }
  }
}