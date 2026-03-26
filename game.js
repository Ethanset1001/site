import { Ball } from './ball.js';
import { Camera } from './camera.js';
import { InputHandler } from './input.js';

const GameState = {
  MENU: 'menu',
  PLAYING: 'playing',
  WIN: 'win',
  FADE_IN: 'fade_in'
};

class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    
    // Load textures
    this.woodTexture = new Image();
    this.woodTexture.src = '/seamless wood.jpg';
    
    this.resize();
    window.addEventListener('resize', () => this.resize());
    
    this.state = GameState.MENU;
    this.currentLevel = 0;
    this.strokes = 0;
    this.fadeAlpha = 0;
    
    this.levels = this.createLevels();
    
    this.ball = null;
    this.camera = new Camera(this.canvas.width, this.canvas.height);
    this.input = new InputHandler(this.canvas, this.camera);
    
    this.canvas.addEventListener('wheel', (e) => this.handleWheel(e));
    this.canvas.addEventListener('click', (e) => this.handleClick(e));
    window.addEventListener('keydown', (e) => this.handleKeyPress(e));
    
    // Lag prevention - pause on tab switch
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.lastTime = 0;
      }
    });
    
    this.lastTime = 0;
    this.animate(0);
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    if (this.camera) {
      this.camera.resize(this.canvas.width, this.canvas.height);
    }
  }
  
  generatePathLevel(levelNum) {
    console.log(`[DEBUG] Generating level ${levelNum + 1}`);
    const gridSize = 10;
    const tileSize = 400;
    const wallThickness = 40;
    
    // Create grid (false = unoccupied)
    const grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(false));
    
    // Random starting position
    const startRow = Math.floor(Math.random() * gridSize);
    const startCol = Math.floor(Math.random() * gridSize);
    
    const path = [{ row: startRow, col: startCol }];
    grid[startRow][startCol] = true;
    
    // Random path length
    const pathLength = Math.floor(Math.random() * 27) + 3; // 3-29
    
    let currentRow = startRow;
    let currentCol = startCol;
    
    // Generate path
    for (let i = 0; i < pathLength; i++) {
      const neighbors = [];
      
      // Check all 4 adjacent tiles
      const directions = [
        { dr: -1, dc: 0 }, // up
        { dr: 1, dc: 0 },  // down
        { dr: 0, dc: -1 }, // left
        { dr: 0, dc: 1 }   // right
      ];
      
      for (const dir of directions) {
        const newRow = currentRow + dir.dr;
        const newCol = currentCol + dir.dc;
        
        if (newRow >= 0 && newRow < gridSize && 
            newCol >= 0 && newCol < gridSize && 
            !grid[newRow][newCol]) {
          neighbors.push({ row: newRow, col: newCol });
        }
      }
      
      if (neighbors.length === 0) break;
      
      // Pick random neighbor
      const next = neighbors[Math.floor(Math.random() * neighbors.length)];
      grid[next.row][next.col] = true;
      path.push(next);
      currentRow = next.row;
      currentCol = next.col;
    }
    
    // Convert grid to world coordinates (centered)
    const gridWorldSize = gridSize * tileSize;
    const offset = -gridWorldSize / 2 + tileSize / 2;
    
    const startTile = path[0];
    const endTile = path[path.length - 1];
    
    const start = {
      x: offset + startTile.col * tileSize,
      y: offset + startTile.row * tileSize
    };
    
    const hole = {
      x: offset + endTile.col * tileSize,
      y: offset + endTile.row * tileSize,
      radius: 30
    };
    
    // Track which tiles have custom features
    const usedTiles = new Set();
    
    // Generate sand pits (1/33 chance per tile, skip start and end)
    const sandPits = [];
    for (let i = 1; i < path.length - 1; i++) {
      if (!usedTiles.has(i) && Math.random() < 1/33) {
        const tile = path[i];
        sandPits.push({
          x: offset + tile.col * tileSize,
          y: offset + tile.row * tileSize,
          size: tileSize * 0.7
        });
        usedTiles.add(i);
        console.log(`[DEBUG] Sand pit spawned at tile ${i}`);
      }
    }
    
    // Generate spinning walls (1/21 chance per tile, skip start and end)
    const spinningWalls = [];
    for (let i = 1; i < path.length - 1; i++) {
      if (!usedTiles.has(i) && Math.random() < 1/21) {
        const tile = path[i];
        const baseAngularVelocity = Math.PI / 2; // 15 rpm = 0.25 rev/sec = PI/2 rad/sec
        const speedMultiplier = 0.8 + Math.random() * 0.4; // 0.8x to 1.2x
        const randomRotation = (Math.random() * 720 - 360) * Math.PI / 180; // -360 to 360 degrees
        spinningWalls.push({
          x: offset + tile.col * tileSize,
          y: offset + tile.row * tileSize,
          width: tileSize * 0.6,
          height: wallThickness,
          rotation: randomRotation,
          angularVelocity: baseAngularVelocity * speedMultiplier
        });
        usedTiles.add(i);
        console.log(`[DEBUG] Spinning wall spawned at tile ${i}, speed: ${speedMultiplier.toFixed(2)}x`);
      }
    }
    
    // Generate center squares (1/27 chance per tile, skip start and end)
    const centerSquares = [];
    for (let i = 1; i < path.length - 1; i++) {
      if (!usedTiles.has(i) && Math.random() < 1/27) {
        const tile = path[i];
        const squareSize = tileSize * 0.65;
        centerSquares.push({
          x: offset + tile.col * tileSize,
          y: offset + tile.row * tileSize,
          width: squareSize,
          height: squareSize
        });
        usedTiles.add(i);
        console.log(`[DEBUG] Center square spawned at tile ${i}`);
      }
    }
    
    // Create walls - start with 4 walls per tile
    const tileWalls = new Map();
    
    // Initialize all path tiles with 4 walls
    for (const tile of path) {
      const key = `${tile.row},${tile.col}`;
      tileWalls.set(key, {
        top: true,
        bottom: true,
        left: true,
        right: true
      });
    }
    
    // Remove walls between connected tiles
    for (let i = 0; i < path.length - 1; i++) {
      const current = path[i];
      const next = path[i + 1];
      
      const currentKey = `${current.row},${current.col}`;
      const nextKey = `${next.row},${next.col}`;
      
      const dr = next.row - current.row;
      const dc = next.col - current.col;
      
      if (dr === -1) { // moving up
        tileWalls.get(currentKey).top = false;
        tileWalls.get(nextKey).bottom = false;
      } else if (dr === 1) { // moving down
        tileWalls.get(currentKey).bottom = false;
        tileWalls.get(nextKey).top = false;
      } else if (dc === -1) { // moving left
        tileWalls.get(currentKey).left = false;
        tileWalls.get(nextKey).right = false;
      } else if (dc === 1) { // moving right
        tileWalls.get(currentKey).right = false;
        tileWalls.get(nextKey).left = false;
      }
    }
    
    // Convert to wall objects
    const walls = [];
    for (const tile of path) {
      const key = `${tile.row},${tile.col}`;
      const wallsData = tileWalls.get(key);
      const tileX = offset + tile.col * tileSize;
      const tileY = offset + tile.row * tileSize;
      
      // Check for straight corridors (opposing connections)
      const hasVerticalCorridor = !wallsData.top && !wallsData.bottom && wallsData.left && wallsData.right;
      const hasHorizontalCorridor = !wallsData.left && !wallsData.right && wallsData.top && wallsData.bottom;
      
      if ((hasVerticalCorridor || hasHorizontalCorridor) && Math.random() < 1/12) {
        console.log(`[DEBUG] Narrowing corridor at tile (${tile.row}, ${tile.col})`);
        // Add narrowing walls
        const narrowWidth = tileSize * 0.35;
        const thickWall = wallThickness * 6;
        if (hasVerticalCorridor) {
          // Vertical corridor - add walls from left and right
          walls.push({
            x: tileX - tileSize/2 + narrowWidth/2,
            y: tileY,
            width: narrowWidth,
            height: thickWall
          });
          walls.push({
            x: tileX + tileSize/2 - narrowWidth/2,
            y: tileY,
            width: narrowWidth,
            height: thickWall
          });
        } else {
          // Horizontal corridor - add walls from top and bottom
          walls.push({
            x: tileX,
            y: tileY - tileSize/2 + narrowWidth/2,
            width: thickWall,
            height: narrowWidth
          });
          walls.push({
            x: tileX,
            y: tileY + tileSize/2 - narrowWidth/2,
            width: thickWall,
            height: narrowWidth
          });
        }
      }
      
      if (wallsData.top) {
        walls.push({
          x: tileX,
          y: tileY - tileSize/2,
          width: tileSize + wallThickness,
          height: wallThickness
        });
      }
      if (wallsData.bottom) {
        walls.push({
          x: tileX,
          y: tileY + tileSize/2,
          width: tileSize + wallThickness,
          height: wallThickness
        });
      }
      if (wallsData.left) {
        walls.push({
          x: tileX - tileSize/2,
          y: tileY,
          width: wallThickness,
          height: tileSize + wallThickness
        });
      }
      if (wallsData.right) {
        walls.push({
          x: tileX + tileSize/2,
          y: tileY,
          width: wallThickness,
          height: tileSize + wallThickness
        });
      }
      
      // Check for L-shaped inner corners (two adjacent walls)
      // 1/12 chance to add diagonal wall
      if (Math.random() < 1/12) {
        console.log(`[DEBUG] Diagonal wall at tile (${tile.row}, ${tile.col})`);
        const diagonalLength = Math.sqrt(2 * tileSize * tileSize) / 2;
        
        // Top-left corner
        if (wallsData.top && wallsData.left) {
          walls.push({
            x: tileX - tileSize/4,
            y: tileY - tileSize/4,
            width: diagonalLength,
            height: wallThickness,
            rotation: -Math.PI / 4
          });
        }
        // Top-right corner
        if (wallsData.top && wallsData.right) {
          walls.push({
            x: tileX + tileSize/4,
            y: tileY - tileSize/4,
            width: diagonalLength,
            height: wallThickness,
            rotation: Math.PI / 4
          });
        }
        // Bottom-left corner
        if (wallsData.bottom && wallsData.left) {
          walls.push({
            x: tileX - tileSize/4,
            y: tileY + tileSize/4,
            width: diagonalLength,
            height: wallThickness,
            rotation: Math.PI / 4
          });
        }
        // Bottom-right corner
        if (wallsData.bottom && wallsData.right) {
          walls.push({
            x: tileX + tileSize/4,
            y: tileY + tileSize/4,
            width: diagonalLength,
            height: wallThickness,
            rotation: -Math.PI / 4
          });
        }
      }
    }
    console.log(`[DEBUG] Level generated - Path length: ${path.length}, Walls: ${walls.length}, Sand pits: ${sandPits.length}, Spinners: ${spinningWalls.length}, Center squares: ${centerSquares.length}`);
    
    return {
      name: `Level ${levelNum + 1}`,
      start,
      hole,
      walls,
      sandPits,
      spinningWalls,
      centerSquares,
      par: path.length
    };
  }
  

  
  createLevels() {
    // Only one level
    return [
      this.generatePathLevel(0)
    ];
  }
  
  ensureLevelExists(index) {
    // Don't create any more levels
    return;
  }
  
  loadLevel(index) {
    this.ensureLevelExists(index);
    this.currentLevel = index;
    this.strokes = 0;
    const level = this.levels[index];
    this.ball = new Ball(level.start.x, level.start.y);
    this.camera.x = level.start.x;
    this.camera.y = level.start.y;
    this.camera.zoom = 1;
    this.state = GameState.PLAYING;
  }
  
  handleClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (this.state === GameState.MENU) {
      // Check if clicked on play button
      if (x > this.canvas.width/2 - 100 && x < this.canvas.width/2 + 100 &&
          y > this.canvas.height/2 - 25 && y < this.canvas.height/2 + 25) {
        this.fadeAlpha = 1;
        this.state = GameState.FADE_IN;
        this.loadLevel(0);
      }
    } else if (this.state === GameState.WIN) {
      // Next level - regenerate
      if (x > this.canvas.width/2 - 100 && x < this.canvas.width/2 + 100 &&
          y > this.canvas.height/2 + 50 && y < this.canvas.height/2 + 100) {
        // Generate new level
        this.levels[0] = this.generatePathLevel(0);
        this.loadLevel(0);
      }
    }
  }
  
  handleKeyPress(e) {
    if (this.state === GameState.PLAYING && e.key.toLowerCase() === 'r') {
      this.loadLevel(this.currentLevel);
    }
  }
  
  handleWheel(e) {
    if (this.state === GameState.PLAYING) {
      e.preventDefault();
      const zoomSpeed = 0.001;
      const delta = -e.deltaY * zoomSpeed;
      const newZoom = Math.max(0.3, Math.min(3, this.camera.zoom + delta));
      this.camera.zoom = newZoom;
    }
  }
  

  
  update(deltaTime) {
    // Handle fade in transition
    if (this.state === GameState.FADE_IN) {
      this.fadeAlpha -= deltaTime * 2;
      if (this.fadeAlpha <= 0) {
        this.fadeAlpha = 0;
        this.state = GameState.PLAYING;
      }
      // Continue with game update during fade
    }
    
    if (this.state !== GameState.PLAYING && this.state !== GameState.FADE_IN) return;
    
    // Allow dragging anytime
    this.input.canDrag = true;
    
    if (this.input.isDragging) {
      return;
    }
    
    if (this.input.launchVelocity) {
      this.ball.vx = this.input.launchVelocity.x;
      this.ball.vy = this.input.launchVelocity.y;
      this.strokes++;
      console.log(`[DEBUG] Ball launched - Velocity: (${this.ball.vx.toFixed(2)}, ${this.ball.vy.toFixed(2)}), Strokes: ${this.strokes}`);
      this.input.launchVelocity = null;
    }
    
    this.ball.update(deltaTime);
    
    const level = this.levels[this.currentLevel];
    
    // Update spinning walls
    for (const wall of level.spinningWalls) {
      wall.rotation += wall.angularVelocity * deltaTime;
    }
    
    // Check if ball is in sand pit
    for (const sand of level.sandPits) {
      const dx = this.ball.x - sand.x;
      const dy = this.ball.y - sand.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < sand.size / 2) {
        // Slow down the ball significantly
        this.ball.vx *= 0.91;
        this.ball.vy *= 0.91;
        break;
      }
    }
    
    this.camera.follow(this.ball.x, this.ball.y, deltaTime);
    
    // Check if ball reached hole
    const dx = this.ball.x - level.hole.x;
    const dy = this.ball.y - level.hole.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Pull ball toward hole if nearby
    const pullRadius = 80;
    if (distance < pullRadius && distance > 0) {
      const pullStrength = 0.15 * (1 - distance / pullRadius);
      const angle = Math.atan2(-dy, -dx);
      this.ball.vx += Math.cos(angle) * pullStrength;
      this.ball.vy += Math.sin(angle) * pullStrength;
    }
    
    if (distance < level.hole.radius) {
      const speed = Math.sqrt(this.ball.vx * this.ball.vx + this.ball.vy * this.ball.vy);
      if (speed < 0.1) {
        console.log(`[DEBUG] Win! Final strokes: ${this.strokes}, Par: ${level.par}`);
        this.state = GameState.WIN;
      }
    }
    
    // Check collisions with walls (static walls)
    for (const wall of level.walls) {
      let closestX, closestY;
      
      if (wall.rotation) {
        // For rotated walls, transform ball position to wall's local space
        const cos = Math.cos(-wall.rotation);
        const sin = Math.sin(-wall.rotation);
        
        // Translate ball to wall origin
        const localX = this.ball.x - wall.x;
        const localY = this.ball.y - wall.y;
        
        // Rotate to align with wall
        const rotatedX = localX * cos - localY * sin;
        const rotatedY = localX * sin + localY * cos;
        
        // Find closest point on wall in local space
        const localClosestX = Math.max(-wall.width/2, Math.min(rotatedX, wall.width/2));
        const localClosestY = Math.max(-wall.height/2, Math.min(rotatedY, wall.height/2));
        
        // Transform back to world space
        const worldClosestX = localClosestX * cos + localClosestY * sin;
        const worldClosestY = -localClosestX * sin + localClosestY * cos;
        
        closestX = wall.x + worldClosestX;
        closestY = wall.y + worldClosestY;
      } else {
        // Non-rotated walls use simple AABB
        closestX = Math.max(wall.x - wall.width/2, Math.min(this.ball.x, wall.x + wall.width/2));
        closestY = Math.max(wall.y - wall.height/2, Math.min(this.ball.y, wall.y + wall.height/2));
      }
      
      const dx = this.ball.x - closestX;
      const dy = this.ball.y - closestY;
      const distanceSq = dx * dx + dy * dy;
      const radiusSq = this.ball.radius * this.ball.radius;
      
      if (distanceSq < radiusSq) {
        const distance = Math.sqrt(distanceSq);
        
        if (distance === 0) {
          // Ball is exactly at center - push it out in direction of velocity
          const velMag = Math.sqrt(this.ball.vx * this.ball.vx + this.ball.vy * this.ball.vy);
          if (velMag > 0) {
            this.ball.x += (this.ball.vx / velMag) * this.ball.radius;
            this.ball.y += (this.ball.vy / velMag) * this.ball.radius;
          } else {
            this.ball.x += this.ball.radius;
          }
          continue;
        }
        
        const overlap = this.ball.radius - distance;
        const normalX = dx / distance;
        const normalY = dy / distance;
        
        // Push ball out
        this.ball.x += normalX * overlap;
        this.ball.y += normalY * overlap;
        
        // Calculate velocity along normal
        const velDotNormal = this.ball.vx * normalX + this.ball.vy * normalY;
        
        // Only reflect if moving toward wall
        if (velDotNormal < 0) {
          // Reflect velocity with damping
          this.ball.vx -= 1.8 * velDotNormal * normalX;
          this.ball.vy -= 1.8 * velDotNormal * normalY;
        }
      }
    }
    
    // Check collisions with center squares
    for (const square of level.centerSquares) {
      const closestX = Math.max(square.x - square.width/2, Math.min(this.ball.x, square.x + square.width/2));
      const closestY = Math.max(square.y - square.height/2, Math.min(this.ball.y, square.y + square.height/2));
      
      const dx = this.ball.x - closestX;
      const dy = this.ball.y - closestY;
      const distanceSq = dx * dx + dy * dy;
      const radiusSq = this.ball.radius * this.ball.radius;
      
      if (distanceSq < radiusSq) {
        const distance = Math.sqrt(distanceSq);
        
        if (distance === 0) {
          const velMag = Math.sqrt(this.ball.vx * this.ball.vx + this.ball.vy * this.ball.vy);
          if (velMag > 0) {
            this.ball.x += (this.ball.vx / velMag) * this.ball.radius;
            this.ball.y += (this.ball.vy / velMag) * this.ball.radius;
          } else {
            this.ball.x += this.ball.radius;
          }
          continue;
        }
        
        const overlap = this.ball.radius - distance;
        const normalX = dx / distance;
        const normalY = dy / distance;
        
        this.ball.x += normalX * overlap;
        this.ball.y += normalY * overlap;
        
        const velDotNormal = this.ball.vx * normalX + this.ball.vy * normalY;
        
        if (velDotNormal < 0) {
          this.ball.vx -= 1.8 * velDotNormal * normalX;
          this.ball.vy -= 1.8 * velDotNormal * normalY;
        }
      }
    }
    
    // Check collisions with spinning walls
    for (const wall of level.spinningWalls) {
      let closestX, closestY;
      
      // For rotated walls, transform ball position to wall's local space
      const cos = Math.cos(-wall.rotation);
      const sin = Math.sin(-wall.rotation);
      
      // Translate ball to wall origin
      const localX = this.ball.x - wall.x;
      const localY = this.ball.y - wall.y;
      
      // Rotate to align with wall
      const rotatedX = localX * cos - localY * sin;
      const rotatedY = localX * sin + localY * cos;
      
      // Find closest point on wall in local space
      const localClosestX = Math.max(-wall.width/2, Math.min(rotatedX, wall.width/2));
      const localClosestY = Math.max(-wall.height/2, Math.min(rotatedY, wall.height/2));
      
      // Transform back to world space
      const worldClosestX = localClosestX * cos + localClosestY * sin;
      const worldClosestY = -localClosestX * sin + localClosestY * cos;
      
      closestX = wall.x + worldClosestX;
      closestY = wall.y + worldClosestY;
      
      const dx = this.ball.x - closestX;
      const dy = this.ball.y - closestY;
      const distanceSq = dx * dx + dy * dy;
      const radiusSq = this.ball.radius * this.ball.radius;
      
      if (distanceSq < radiusSq) {
        const distance = Math.sqrt(distanceSq);
        
        if (distance === 0) {
          // Ball is exactly at center - push it out in direction of velocity
          const velMag = Math.sqrt(this.ball.vx * this.ball.vx + this.ball.vy * this.ball.vy);
          if (velMag > 0) {
            this.ball.x += (this.ball.vx / velMag) * this.ball.radius;
            this.ball.y += (this.ball.vy / velMag) * this.ball.radius;
          } else {
            this.ball.x += this.ball.radius;
          }
          continue;
        }
        
        const overlap = this.ball.radius - distance;
        const normalX = dx / distance;
        const normalY = dy / distance;
        
        // Push ball out
        this.ball.x += normalX * overlap;
        this.ball.y += normalY * overlap;
        
        // Calculate velocity along normal
        const velDotNormal = this.ball.vx * normalX + this.ball.vy * normalY;
        
        // Only reflect if moving toward wall
        if (velDotNormal < 0) {
          // Reflect velocity with damping
          this.ball.vx -= 1.8 * velDotNormal * normalX;
          this.ball.vy -= 1.8 * velDotNormal * normalY;
        }
      }
    }
  }
  
  render() {
    this.ctx.fillStyle = '#fff';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    if (this.state === GameState.MENU) {
      this.renderMenu();
    } else if (this.state === GameState.PLAYING || this.state === GameState.FADE_IN) {
      this.renderGame();
      
      // Draw fade overlay
      if (this.state === GameState.FADE_IN) {
        this.ctx.fillStyle = `rgba(26, 77, 46, ${this.fadeAlpha})`;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      }
    } else if (this.state === GameState.WIN) {
      this.renderWin();
    }
  }
  
  renderMenu() {
    // Green gradient background
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    gradient.addColorStop(0, '#1a4d2e');
    gradient.addColorStop(1, '#0f2818');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.ctx.fillStyle = '#a8d5ba';
    this.ctx.font = '48px Space Mono';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('GOLF', this.canvas.width/2, this.canvas.height/2 - 100);
    
    // Play button
    this.ctx.fillStyle = '#2d6a4f';
    this.ctx.fillRect(this.canvas.width/2 - 100, this.canvas.height/2 - 25, 200, 50);
    this.ctx.fillStyle = '#d8f3dc';
    this.ctx.font = '24px Space Mono';
    this.ctx.fillText('PLAY', this.canvas.width/2, this.canvas.height/2);
  }
  

  renderGame() {
    this.ctx.save();
    this.camera.apply(this.ctx);
    
    const level = this.levels[this.currentLevel];
    
    // Draw sea blue ocean background (only visible area)
    this.ctx.fillStyle = '#0077be';
    const viewPadding = 1000;
    this.ctx.fillRect(
      this.camera.x - viewPadding / this.camera.zoom,
      this.camera.y - viewPadding / this.camera.zoom,
      (this.canvas.width + viewPadding * 2) / this.camera.zoom,
      (this.canvas.height + viewPadding * 2) / this.camera.zoom
    );
    
    // Draw checkerboard grass background within 10x10 grid
    const gridSize = 10;
    const tileSize = 400;
    const gridWorldSize = gridSize * tileSize;
    const offset = -gridWorldSize / 2;
    
    // Draw checkerboard pattern
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const isEven = (row + col) % 2 === 0;
        this.ctx.fillStyle = isEven ? '#4a7c59' : '#3a6c49';
        this.ctx.fillRect(
          offset + col * tileSize,
          offset + row * tileSize,
          tileSize,
          tileSize
        );
      }
    }
    
    // Draw sand pits
    for (const sand of level.sandPits) {
      this.ctx.fillStyle = '#d4a574';
      this.ctx.beginPath();
      this.ctx.arc(sand.x, sand.y, sand.size / 2, 0, Math.PI * 2);
      this.ctx.fill();
    }
    
    // Draw hole
    this.ctx.fillStyle = '#000';
    this.ctx.beginPath();
    this.ctx.arc(level.hole.x, level.hole.y, level.hole.radius, 0, Math.PI * 2);
    this.ctx.fill();
    
    this.ctx.strokeStyle = '#666';
    this.ctx.lineWidth = 3;
    this.ctx.stroke();
    
    // Draw walls
    for (const wall of level.walls) {
      this.ctx.save();
      
      if (wall.rotation) {
        this.ctx.translate(wall.x, wall.y);
        this.ctx.rotate(wall.rotation);
        this.ctx.translate(-wall.x, -wall.y);
      }
      
      if (this.woodTexture.complete) {
        this.ctx.translate(wall.x - wall.width/2, wall.y - wall.height/2);
        const pattern = this.ctx.createPattern(this.woodTexture, 'repeat');
        this.ctx.fillStyle = pattern;
        this.ctx.fillRect(0, 0, wall.width, wall.height);
      } else {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(
          wall.x - wall.width/2,
          wall.y - wall.height/2,
          wall.width,
          wall.height
        );
      }
      
      this.ctx.restore();
    }
    
    // Draw center squares
    for (const square of level.centerSquares) {
      if (this.woodTexture.complete) {
        this.ctx.translate(square.x - square.width/2, square.y - square.height/2);
        const pattern = this.ctx.createPattern(this.woodTexture, 'repeat');
        this.ctx.fillStyle = pattern;
        this.ctx.fillRect(0, 0, square.width, square.height);
        this.ctx.translate(-(square.x - square.width/2), -(square.y - square.height/2));
      } else {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(
          square.x - square.width/2,
          square.y - square.height/2,
          square.width,
          square.height
        );
      }
    }
    
    // Draw spinning walls
    for (const wall of level.spinningWalls) {
      this.ctx.save();
      
      this.ctx.translate(wall.x, wall.y);
      this.ctx.rotate(wall.rotation);
      this.ctx.translate(-wall.x, -wall.y);
      
      if (this.woodTexture.complete) {
        this.ctx.translate(wall.x - wall.width/2, wall.y - wall.height/2);
        const pattern = this.ctx.createPattern(this.woodTexture, 'repeat');
        this.ctx.fillStyle = pattern;
        this.ctx.fillRect(0, 0, wall.width, wall.height);
      } else {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(
          wall.x - wall.width/2,
          wall.y - wall.height/2,
          wall.width,
          wall.height
        );
      }
      
      this.ctx.restore();
    }
    
    // Draw ball
    this.ball.render(this.ctx);
    
    // Draw launch indicator
    if (this.input.isDragging) {
      const worldDrag = this.camera.screenToWorld(
        this.input.dragStart.x, 
        this.input.dragStart.y
      );
      const worldCurrent = this.camera.screenToWorld(
        this.input.dragCurrent.x, 
        this.input.dragCurrent.y
      );
      
      let dx = worldCurrent.x - worldDrag.x;
      let dy = worldCurrent.y - worldDrag.y;
      
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 450;
      if (distance > maxDistance) {
        const scale = maxDistance / distance;
        dx *= scale;
        dy *= scale;
      }
      
      this.ctx.strokeStyle = '#000';
      this.ctx.lineWidth = 3;
      this.ctx.setLineDash([5, 5]);
      this.ctx.beginPath();
      this.ctx.moveTo(this.ball.x, this.ball.y);
      this.ctx.lineTo(this.ball.x - dx * 2, this.ball.y - dy * 2);
      this.ctx.stroke();
      this.ctx.setLineDash([]);
      
      const angle = Math.atan2(-dy, -dx);
      const arrowLength = 15;
      const arrowX = this.ball.x - dx * 2;
      const arrowY = this.ball.y - dy * 2;
      
      this.ctx.beginPath();
      this.ctx.moveTo(arrowX, arrowY);
      this.ctx.lineTo(
        arrowX - arrowLength * Math.cos(angle - 0.5),
        arrowY - arrowLength * Math.sin(angle - 0.5)
      );
      this.ctx.moveTo(arrowX, arrowY);
      this.ctx.lineTo(
        arrowX - arrowLength * Math.cos(angle + 0.5),
        arrowY - arrowLength * Math.sin(angle + 0.5)
      );
      this.ctx.stroke();
    }
    
    this.ctx.restore();
    
    // Draw HUD
    this.ctx.fillStyle = '#000';
    this.ctx.font = '20px Space Mono';
    this.ctx.textAlign = 'left';
    this.ctx.fillText(`Strokes: ${this.strokes}`, 20, 40);
    this.ctx.fillText(`Par: ${level.par}`, 20, 70);
  }
  
  renderWin() {
    this.renderGame();
    
    this.ctx.fillStyle = 'rgba(26, 77, 46, 0.95)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.ctx.fillStyle = '#d8f3dc';
    this.ctx.font = '48px Space Mono';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('HOLE IN!', this.canvas.width/2, this.canvas.height/2 - 50);
    
    this.ctx.font = '24px Space Mono';
    const level = this.levels[this.currentLevel];
    const score = this.strokes - level.par;
    const scoreText = score === 0 ? 'Par' : score < 0 ? `${-score} Under` : `${score} Over`;
    this.ctx.fillText(`${this.strokes} strokes (${scoreText})`, this.canvas.width/2, this.canvas.height/2);
    
    // Next Level button
    this.ctx.fillStyle = '#2d6a4f';
    this.ctx.fillRect(this.canvas.width/2 - 100, this.canvas.height/2 + 50, 200, 50);
    this.ctx.fillStyle = '#d8f3dc';
    this.ctx.fillText('NEXT', this.canvas.width/2, this.canvas.height/2 + 75);
  }
  

  
  animate(currentTime) {
    // Lag prevention - cap deltaTime to prevent physics issues
    let deltaTime = (currentTime - this.lastTime) / 1000;
    if (this.lastTime === 0) {
      deltaTime = 1/60;
    } else {
      // Cap at 3 frames worth of time (prevents clipping through walls)
      deltaTime = Math.min(deltaTime, 3/60);
    }
    this.lastTime = currentTime;
    
    this.update(deltaTime);
    this.render();
    
    requestAnimationFrame((time) => this.animate(time));
  }
}

new Game();