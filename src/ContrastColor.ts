// modified from https://gist.github.com/dcondrey/183971f17808e9277572
export const getColorContrast = (rgb: string) => {
  if (typeof rgb !== 'string') {
    return '';
  }

  if (!rgb.includes('rgb') && rgb.includes('#')) {
    rgb = hexToRgb(rgb);
  }

  if (rgb.length < 3 || !rgb.includes('rgb')) {
    return '';
  }

  // Strip everything except the integers eg. "rgb(" and ")" and " "
  rgb = rgb.split(/\(([^)]+)\)/)[1].replace(/ /g, '');

  // map RGB values to variables
  var r = parseInt(rgb.split(',')[0], 10),
    g = parseInt(rgb.split(',')[1], 10),
    b = parseInt(rgb.split(',')[2], 10);

  // calculate contrast of color (standard grayscale algorithmic formula)
  var contrast =
    (Math.round(r * 299) + Math.round(g * 587) + Math.round(b * 114)) / 1000;

  return contrast >= 128 ? 'black' : 'white';
};

// https://stackoverflow.com/a/5624139/3695983
export const hexToRgb = (hex: string) => {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (_m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return `rgb(${parseInt(result ? result[1] : '0', 16)},${parseInt(
    result ? result[2] : '0',
    16
  )},${parseInt(result ? result[3] : '0', 16)})`;
};
