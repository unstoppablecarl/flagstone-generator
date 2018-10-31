import generate from './generate';
import draw from './draw';
import saveSvg from './save-svg';

const cellStrokeWidth        = 6;
const isCornerRadiusAbsolute = false;
const cornerRadius           = 0.5;
const width                  = 400;
const height                 = 1200;
const margin                 = 20;
const cleanCornerRadius      = 10;
const count                  = 500;
const minSize                = 10;
const spacingRadiusMin       = 10;
const spacingRadiusMax       = 40;
const svgId                  = 'cobblestone-svg';

let btnSave     = document.getElementById('btn-save');
let btnGenerate = document.getElementById('btn-generate');
let svg         = document.getElementById(svgId);

generateCobblestone();

onClick(btnGenerate, e => {
  generateCobblestone();
});

onClick(btnSave, e => {
  saveSvg(svgId, 'cobblestone.svg');
});

function generateCobblestone() {

  svg.innerHTML = '';

  const data = generate({
    count,
    width,
    height,
    cornerRadius,
    cleanCornerRadius,
    isCornerRadiusAbsolute,
    minSize,
    spacingRadiusMin,
    spacingRadiusMax,
  });

  draw({
    svgId,
    width,
    height,
    data,
    cellStrokeWidth,
    margin,
    spacingRadiusMin,
    spacingRadiusMax,
  });

  console.log('coords', data.length);
}

function onClick(el, callback) {
  el.addEventListener('click', callback, false);
}

