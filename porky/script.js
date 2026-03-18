const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const textInput = document.getElementById('textInput');
const colorPicker = document.getElementById('colorPicker');
const downloadBtn = document.getElementById('downloadBtn');
const letterSpacing = document.getElementById('letterSpacing');

let fontReady = false;

// load font properly (important)
const fontFace = new FontFace("Porky's", 'url(./PORKYS.TTF)');

fontFace.load()
  .then(f => {
    document.fonts.add(f);
    return document.fonts.load('100px "Porky\'s"');
  })
  .then(() => {
    fontReady = true;

    // small delay helps canvas actually switch font
    setTimeout(() => {
      render();
    }, 50);
  });

// resize canvas
function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * devicePixelRatio;
  canvas.height = rect.height * devicePixelRatio;

  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

  render();
}

// draw text (fixed)
function drawText() {
  if (!fontReady) return;

  const text = textInput.value || 'HELLO';
  const color = colorPicker.value;

  const w = canvas.width / devicePixelRatio;
  const h = canvas.height / devicePixelRatio;

  ctx.clearRect(0, 0, w, h);

  let size = Math.min(w, h) * 0.25;

  // IMPORTANT: set font before measuring
  ctx.font = `${size}px "Porky's"`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.lineJoin = 'round';

  const spacing = (letterSpacing.value - 1) * size * 0.1;

  // calculate total width manually
  let totalWidth = 0;
  for (let c of text) {
    totalWidth += ctx.measureText(c).width + spacing;
  }

  let x = w / 2 - totalWidth / 2;
  let y = h / 2;

  for (let c of text) {
    const cw = ctx.measureText(c).width;
    const cx = x + cw / 2;

    // outer stroke
    ctx.strokeStyle = '#ffb699';
    ctx.lineWidth = 20;
    ctx.strokeText(c, cx, y);

    // middle stroke
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 14;
    ctx.strokeText(c, cx, y);

    // inner stroke
    ctx.strokeStyle = '#c95529';
    ctx.lineWidth = 8;
    ctx.strokeText(c, cx, y);

    // fill
    ctx.fillStyle = color;
    ctx.fillText(c, cx, y);

    x += cw + spacing;
  }
}

// render
function render() {
  drawText();
}

// download
function download() {
  const link = document.createElement('a');
  link.download = 'text.png';
  link.href = canvas.toDataURL();
  link.click();
}

// events
textInput.addEventListener('input', render);
colorPicker.addEventListener('input', render);
letterSpacing.addEventListener('input', render);
downloadBtn.addEventListener('click', download);
window.addEventListener('resize', resizeCanvas);

// init
resizeCanvas();
