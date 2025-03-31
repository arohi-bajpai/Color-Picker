let r=0,g=0,b=0;
document.getElementById('colorInput').addEventListener('input', function() {
    color = this.value;
    document.getElementById('hexValue').textContent = color;
    document.getElementById('rgbValue').textContent = hexToRgb(color);
});
function hexToRgb(hex) {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);

    document.getElementById('hslValue').textContent = rgbToHsl(r,g,b);
    document.getElementById('hwbValue').textContent = rgbToHwb(r,g,b);
    document.getElementById('cmykValue').textContent = rgbToCmyk(r,g,b);
    return `rgb(${r}, ${g}, ${b})`;
}

function rgbToHsl(r, g, b) {
    var min, max, i, l, s, maxcolor, h, rgb = [];
    rgb[0] = r / 255;
    rgb[1] = g / 255;
    rgb[2] = b / 255;
    min = rgb[0];
    max = rgb[0];
    maxcolor = 0;
    for (i = 0; i < rgb.length - 1; i++) {
        if (rgb[i + 1] <= min) min = rgb[i + 1];
        if (rgb[i + 1] >= max) {
            max = rgb[i + 1];
            maxcolor = i + 1;
        }
    }
    if (maxcolor == 0) 
        h = (rgb[1] - rgb[2]) / (max - min);

    if (maxcolor == 1) 
        h = 2 + (rgb[2] - rgb[0]) / (max - min);

    if (maxcolor == 2) 
        h = 4 + (rgb[0] - rgb[1]) / (max - min);

    if (isNaN(h)) h = 0;
    h = h * 60;
    if (h < 0) h = h + 360; 
    l = (min + max) / 2;
    if (min == max)
        s = 0;
    else {
        if (l < 0.5)
            s = (max - min) / (max + min);
        else
            s = (max - min) / (2 - max - min);
    }
    return `hsl(${h},${Math.round(s*100)}%,${Math.round(l*100)}%)`;
}

function rgbToHwb(r, g, b) {
    var h, w, b;
    r = r / 255;
    g = g / 255;
    b = b / 255;
    max = Math.max(r, g, b);
    min = Math.min(r, g, b);
    chroma = max - min;
    if (chroma == 0) 
        h = 0;
    else if (r == max) 
        h = (((g - b) / chroma) % 6) * 360;
    else if (g == max) 
        h = ((((b - r) / chroma) + 2) % 6) * 360;
    else 
        h = ((((r - g) / chroma) + 4) % 6) * 360;
    w = min;
    b = 1 - max;
    return `hwb(${h},${Math.round(w*100)}%,${Math.round(b*100)}%)`;
}

function rgbToCmyk(r, g, b) {
    var c, m, y, k;
    r = r / 255;
    g = g / 255;
    b = b / 255;
    max = Math.max(r, g, b);
    k = 1 - max;
    if (k == 1) {
        c = 0;
        m = 0;
        y = 0;
    } else {
        c = (1 - r - k) / (1 - k);
        m = (1 - g - k) / (1 - k);
        y = (1 - b - k) / (1 - k);
    }
    return`cmyk(${Math.round(c*100)}%,${Math.round(m*100)}%,${Math.round(y*100)}%,${Math.round(k*100)}%)`;
  }