const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const textInput = document.getElementById('textInput');
const colorPicker = document.getElementById('colorPicker');
const downloadBtn = document.getElementById('downloadBtn');
const letterSpacing = document.getElementById('letterSpacing');

let fontLoaded = false;

// load font properly
const fontFace = new FontFace('Porkys', 'url(./PORKYS.TTF)');
fontFace.load().then(f => {
  document.fonts.add(f);
  return document.fonts.ready;
}).then(() => {
  fontLoaded = true;
  render();
});

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * devicePixelRatio;
  canvas.height = rect.height * devicePixelRatio;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  render();
}

function drawText() {
  if (!fontLoaded) return;

  const text = textInput.value || 'HELLO';
  const color = colorPicker.value;

  const w = canvas.width / devicePixelRatio;
  const h = canvas.height / devicePixelRatio;

  ctx.clearRect(0, 0, w, h);

  let size = Math.min(w, h) * 0.25;
  ctx.font = `${size}px "Porkys"`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const spacing = (letterSpacing.value - 1) * size * 0.1;

  // measure full width manually
  let totalWidth = 0;
  for (let c of text) {
    totalWidth += ctx.measureText(c).width + spacing;
  }

  let x = w / 2 - totalWidth / 2;
  let y = h / 2;

  ctx.lineJoin = 'round';

  for (let c of text) {
    const cw = ctx.measureText(c).width;

    // outer stroke
    ctx.strokeStyle = '#ffb699';
    ctx.lineWidth = 20;
    ctx.strokeText(c, x + cw / 2, y);

    // middle stroke
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 14;
    ctx.strokeText(c, x + cw / 2, y);

    // inner stroke
    ctx.strokeStyle = '#c95529';
    ctx.lineWidth = 8;
    ctx.strokeText(c, x + cw / 2, y);

    // fill
    ctx.fillStyle = color;
    ctx.fillText(c, x + cw / 2, y);

    x += cw + spacing;
  }
}

function render() {
  drawText();
}

function download() {
  const link = document.createElement('a');
  link.download = 'text.png';
  link.href = canvas.toDataURL();
  link.click();
}

textInput.addEventListener('input', render);
colorPicker.addEventListener('input', render);
letterSpacing.addEventListener('input', render);
downloadBtn.addEventListener('click', download);
window.addEventListener('resize', resizeCanvas);

resizeCanvas();
