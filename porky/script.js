const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const textInput = document.getElementById('textInput');
const colorPicker = document.getElementById('colorPicker');
const downloadBtn = document.getElementById('downloadBtn');
const letterSpacing = document.getElementById('letterSpacing');
const spacingValue = document.getElementById('spacingValue');
const thickness1 = document.getElementById('thickness1');
const thickness2 = document.getElementById('thickness2');
const thickness3 = document.getElementById('thickness3');
const thickness1Value = document.getElementById('thickness1Value');
const thickness2Value = document.getElementById('thickness2Value');
const thickness3Value = document.getElementById('thickness3Value');
const custom1Toggle = document.getElementById('custom1Toggle');
const custom2Toggle = document.getElementById('custom2Toggle');
const custom3Toggle = document.getElementById('custom3Toggle');
const color1Picker = document.getElementById('color1Picker');
const color2Picker = document.getElementById('color2Picker');
const color3Picker = document.getElementById('color3Picker');

let font;

// Load font
const fontFace = new FontFace('Porkys', 'url(/PORKYS.TTF)');
fontFace.load().then((loadedFont) => {
  document.fonts.add(loadedFont);
  font = loadedFont;
  render();
});

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * window.devicePixelRatio;
  canvas.height = rect.height * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  render();
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map(x => {
    const hex = Math.round(Math.max(0, Math.min(255, x))).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join('');
}

function adjustColor(hex, percent) {
  const rgb = hexToRgb(hex);
  const factor = 1 + (percent / 100);
  return rgbToHex(rgb.r * factor, rgb.g * factor, rgb.b * factor);
}

function drawText(context, withGrid = true) {
  const text = textInput.value || 'HELLO';
  const baseColor = colorPicker.value;
  const rect = canvas.getBoundingClientRect();
  const width = context.canvas.width / window.devicePixelRatio;
  const height = context.canvas.height / window.devicePixelRatio;
  
  // Clear canvas
  context.clearRect(0, 0, width, height);
  
  // Set font with letter spacing
  let fontSize = Math.min(width, height) * 0.25;
  const spacing = parseFloat(letterSpacing.value);
  const t1 = parseInt(thickness1.value);
  const t2 = parseInt(thickness2.value);
  const t3 = parseInt(thickness3.value);
  
  // Apply letter spacing
  context.font = `${fontSize}px Porkys`;
  context.letterSpacing = `${fontSize * (spacing - 1) * 0.1}px`;
  
  // Measure text and scale down if needed
  const totalStrokeWidth = t1 + t2 * 2 + t3 * 2;
  let textMetrics = context.measureText(text);
  let textWidth = textMetrics.width + totalStrokeWidth;
  let textHeight = fontSize + totalStrokeWidth;
  
  const padding = 40;
  const maxWidth = width - padding;
  const maxHeight = height - padding;
  
  let scale = 1;
  if (textWidth > maxWidth) {
    scale = Math.min(scale, maxWidth / textWidth);
  }
  if (textHeight > maxHeight) {
    scale = Math.min(scale, maxHeight / textHeight);
  }
  
  if (scale < 1) {
    fontSize *= scale;
    context.font = `${fontSize}px Porkys`;
    context.letterSpacing = `${fontSize * (spacing - 1) * 0.1}px`;
  }
  
  if (withGrid) {
    // Draw grid background (scale with font size)
    const baseGridSize = 20;
    const baseFontSize = Math.min(width, height) * 0.25;
    const gridScale = fontSize / baseFontSize;
    const gridSize = Math.max(1, Math.round(baseGridSize * gridScale));
    context.fillStyle = '#f0f0f0';
    context.fillRect(0, 0, width, height);
    context.fillStyle = '#e0e0e0';
    for (let x = 0; x < width; x += gridSize) {
      for (let y = 0; y < height; y += gridSize) {
        if ((x / gridSize + y / gridSize) % 2 === 0) {
          context.fillRect(x, y, gridSize, gridSize);
        }
      }
    }
  }
  
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  
  const x = width / 2;
  const y = height / 2;
  
  // Calculate colors
  const darkerColor = custom1Toggle.checked ? color1Picker.value : adjustColor(baseColor, -15);
  const whiteColor = custom2Toggle.checked ? color2Picker.value : '#ffffff';
  const lighterColor = custom3Toggle.checked ? color3Picker.value : adjustColor(baseColor, 60);
  
  context.lineJoin = 'round';
  context.miterLimit = 2;
  
  // Draw strokes from outermost to innermost
  // Outermost layer (lightest color)
  context.strokeStyle = lighterColor;
  context.lineWidth = t1 + t2 * 2 + t3 * 2;
  context.strokeText(text, x, y);
  
  // Middle layer (white)
  context.strokeStyle = whiteColor;
  context.lineWidth = t1 + t2 * 2;
  context.strokeText(text, x, y);
  
  // Innermost layer (darkest color)
  context.strokeStyle = darkerColor;
  context.lineWidth = t1;
  context.strokeText(text, x, y);
  
  // Fill text with base color
  context.fillStyle = baseColor;
  context.fillText(text, x, y);
}

function render() {
  if (!font) return;
  drawText(ctx, true);
}

function download() {
  if (!font) return;
  
  // Create temporary canvas for download
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  
  // Set canvas size to match current canvas
  const rect = canvas.getBoundingClientRect();
  tempCanvas.width = rect.width * window.devicePixelRatio;
  tempCanvas.height = rect.height * window.devicePixelRatio;
  tempCtx.scale(window.devicePixelRatio, window.devicePixelRatio);
  
  // Draw without grid
  drawText(tempCtx, false);
  
  // Download
  const link = document.createElement('a');
  link.download = 'text-rasterized.png';
  link.href = tempCanvas.toDataURL('image/png');
  link.click();
}

function updateSliderValues() {
  spacingValue.textContent = letterSpacing.value;
  thickness1Value.textContent = thickness1.value;
  thickness2Value.textContent = thickness2.value;
  thickness3Value.textContent = thickness3.value;
}

function toggleCustomColor(toggle, colorPicker) {
  if (toggle.checked) {
    colorPicker.classList.remove('hidden');
  } else {
    colorPicker.classList.add('hidden');
  }
  render();
}

// Event listeners
textInput.addEventListener('input', render);
colorPicker.addEventListener('input', render);
letterSpacing.addEventListener('input', () => {
  updateSliderValues();
  render();
});
thickness1.addEventListener('input', () => {
  updateSliderValues();
  render();
});
thickness2.addEventListener('input', () => {
  updateSliderValues();
  render();
});
thickness3.addEventListener('input', () => {
  updateSliderValues();
  render();
});
downloadBtn.addEventListener('click', download);
window.addEventListener('resize', resizeCanvas);

custom1Toggle.addEventListener('change', () => toggleCustomColor(custom1Toggle, color1Picker));
custom2Toggle.addEventListener('change', () => toggleCustomColor(custom2Toggle, color2Picker));
custom3Toggle.addEventListener('change', () => toggleCustomColor(custom3Toggle, color3Picker));
color1Picker.addEventListener('input', render);
color2Picker.addEventListener('input', render);
color3Picker.addEventListener('input', render);

// Initial render
updateSliderValues();
resizeCanvas();
