export const HEX = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
export const RGB = /(rgb)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*%?,\s*(\d{1,3})\s*%?(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/;
export const HSL = /(hsl)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/;

export class Hsva {
  constructor(public h: number, public s: number, public v: number, public a: number) { }
}
export class Hsla {
  constructor(public h: number, public s: number, public l: number, public a: number) { }
}
export class Rgba {
  constructor(public r: number, public g: number, public b: number, public a: number) { }
}
export class SliderPosition {
  constructor(public h: number, public s: number, public v: number, public a: number) { }
}
export class SliderDimension {
  constructor(public h: number, public s: number, public v: number, public a: number) { }
}

export class ColorUtil {
  colors: Array<any> = [
    { name: 'AliceBlue', code: '#F0F8FF' },
    { name: 'AntiqueWhite', code: '#FAEBD7' },
    { name: 'Aqua', code: '#00FFFF' },
    { name: 'Aquamarine', code: '#7FFFD4' },
    { name: 'Azure', code: '#F0FFFF' },
    { name: 'Beige', code: '#F5F5DC' },
    { name: 'Bisque', code: '#FFE4C4' },
    { name: 'Black', code: '#000000' },
    { name: 'BlanchedAlmond', code: '#FFEBCD' },
    { name: 'Blue', code: '#0000FF' },
    { name: 'BlueViolet', code: '#8A2BE2' },
    { name: 'Brown', code: '#A52A2A' },
    { name: 'BurlyWood', code: '#DEB887' },
    { name: 'CadetBlue', code: '#5F9EA0' },
    { name: 'Chartreuse', code: '#7FFF00' },
    { name: 'Chocolate', code: '#D2691E' },
    { name: 'Coral', code: '#FF7F50' },
    { name: 'CornflowerBlue', code: '#6495ED' },
    { name: 'Cornsilk', code: '#FFF8DC' },
    { name: 'Crimson', code: '#DC143C' },
    { name: 'Cyan', code: '#00FFFF' },
    { name: 'DarkBlue', code: '#00008B' },
    { name: 'DarkCyan', code: '#008B8B' },
    { name: 'DarkGoldenRod', code: '#B8860B' },
    { name: 'DarkGray', code: '#A9A9A9' },
    { name: 'DarkGrey', code: '#A9A9A9' },
    { name: 'DarkGreen', code: '#006400' },
    { name: 'DarkKhaki', code: '#BDB76B' },
    { name: 'DarkMagenta', code: '#8B008B' },
    { name: 'DarkOliveGreen', code: '#556B2F' },
    { name: 'DarkOrange', code: '#FF8C00' },
    { name: 'DarkOrchid', code: '#9932CC' },
    { name: 'DarkRed', code: '#8B0000' },
    { name: 'DarkSalmon', code: '#E9967A' },
    { name: 'DarkSeaGreen', code: '#8FBC8F' },
    { name: 'DarkSlateBlue', code: '#483D8B' },
    { name: 'DarkSlateGray', code: '#2F4F4F' },
    { name: 'DarkSlateGrey', code: '#2F4F4F' },
    { name: 'DarkTurquoise', code: '#00CED1' },
    { name: 'DarkViolet', code: '#9400D3' },
    { name: 'DeepPink', code: '#FF1493' },
    { name: 'DeepSkyBlue', code: '#00BFFF' },
    { name: 'DimGray', code: '#696969' },
    { name: 'DimGrey', code: '#696969' },
    { name: 'DodgerBlue', code: '#1E90FF' },
    { name: 'FireBrick', code: '#B22222' },
    { name: 'FloralWhite', code: '#FFFAF0' },
    { name: 'ForestGreen', code: '#228B22' },
    { name: 'Fuchsia', code: '#FF00FF' },
    { name: 'Gainsboro', code: '#DCDCDC' },
    { name: 'GhostWhite', code: '#F8F8FF' },
    { name: 'Gold', code: '#FFD700' },
    { name: 'GoldenRod', code: '#DAA520' },
    { name: 'Gray', code: '#808080' },
    { name: 'Grey', code: '#808080' },
    { name: 'Green', code: '#008000' },
    { name: 'GreenYellow', code: '#ADFF2F' },
    { name: 'HoneyDew', code: '#F0FFF0' },
    { name: 'HotPink', code: '#FF69B4' },
    { name: 'IndianRed ', code: '#CD5C5C' },
    { name: 'Indigo ', code: '#4B0082' },
    { name: 'Ivory', code: '#FFFFF0' },
    { name: 'Khaki', code: '#F0E68C' },
    { name: 'Lavender', code: '#E6E6FA' },
    { name: 'LavenderBlush', code: '#FFF0F5' },
    { name: 'LawnGreen', code: '#7CFC00' },
    { name: 'LemonChiffon', code: '#FFFACD' },
    { name: 'LightBlue', code: '#ADD8E6' },
    { name: 'LightCoral', code: '#F08080' },
    { name: 'LightCyan', code: '#E0FFFF' },
    { name: 'LightGoldenRodYellow', code: '#FAFAD2' },
    { name: 'LightGray', code: '#D3D3D3' },
    { name: 'LightGrey', code: '#D3D3D3' },
    { name: 'LightGreen', code: '#90EE90' },
    { name: 'LightPink', code: '#FFB6C1' },
    { name: 'LightSalmon', code: '#FFA07A' },
    { name: 'LightSeaGreen', code: '#20B2AA' },
    { name: 'LightSkyBlue', code: '#87CEFA' },
    { name: 'LightSlateGray', code: '#778899' },
    { name: 'LightSlateGrey', code: '#778899' },
    { name: 'LightSteelBlue', code: '#B0C4DE' },
    { name: 'LightYellow', code: '#FFFFE0' },
    { name: 'Lime', code: '#00FF00' },
    { name: 'LimeGreen', code: '#32CD32' },
    { name: 'Linen', code: '#FAF0E6' },
    { name: 'Magenta', code: '#FF00FF' },
    { name: 'Maroon', code: '#800000' },
    { name: 'MediumAquaMarine', code: '#66CDAA' },
    { name: 'MediumBlue', code: '#0000CD' },
    { name: 'MediumOrchid', code: '#BA55D3' },
    { name: 'MediumPurple', code: '#9370DB' },
    { name: 'MediumSeaGreen', code: '#3CB371' },
    { name: 'MediumSlateBlue', code: '#7B68EE' },
    { name: 'MediumSpringGreen', code: '#00FA9A' },
    { name: 'MediumTurquoise', code: '#48D1CC' },
    { name: 'MediumVioletRed', code: '#C71585' },
    { name: 'MidnightBlue', code: '#191970' },
    { name: 'MintCream', code: '#F5FFFA' },
    { name: 'MistyRose', code: '#FFE4E1' },
    { name: 'Moccasin', code: '#FFE4B5' },
    { name: 'NavajoWhite', code: '#FFDEAD' },
    { name: 'Navy', code: '#000080' },
    { name: 'OldLace', code: '#FDF5E6' },
    { name: 'Olive', code: '#808000' },
    { name: 'OliveDrab', code: '#6B8E23' },
    { name: 'Orange', code: '#FFA500' },
    { name: 'OrangeRed', code: '#FF4500' },
    { name: 'Orchid', code: '#DA70D6' },
    { name: 'PaleGoldenRod', code: '#EEE8AA' },
    { name: 'PaleGreen', code: '#98FB98' },
    { name: 'PaleTurquoise', code: '#AFEEEE' },
    { name: 'PaleVioletRed', code: '#DB7093' },
    { name: 'PapayaWhip', code: '#FFEFD5' },
    { name: 'PeachPuff', code: '#FFDAB9' },
    { name: 'Peru', code: '#CD853F' },
    { name: 'Pink', code: '#FFC0CB' },
    { name: 'Plum', code: '#DDA0DD' },
    { name: 'PowderBlue', code: '#B0E0E6' },
    { name: 'Purple', code: '#800080' },
    { name: 'RebeccaPurple', code: '#663399' },
    { name: 'Red', code: '#FF0000' },
    { name: 'RosyBrown', code: '#BC8F8F' },
    { name: 'RoyalBlue', code: '#4169E1' },
    { name: 'SaddleBrown', code: '#8B4513' },
    { name: 'Salmon', code: '#FA8072' },
    { name: 'SandyBrown', code: '#F4A460' },
    { name: 'SeaGreen', code: '#2E8B57' },
    { name: 'SeaShell', code: '#FFF5EE' },
    { name: 'Sienna', code: '#A0522D' },
    { name: 'Silver', code: '#C0C0C0' },
    { name: 'SkyBlue', code: '#87CEEB' },
    { name: 'SlateBlue', code: '#6A5ACD' },
    { name: 'SlateGray', code: '#708090' },
    { name: 'SlateGrey', code: '#708090' },
    { name: 'Snow', code: '#FFFAFA' },
    { name: 'SpringGreen', code: '#00FF7F' },
    { name: 'SteelBlue', code: '#4682B4' },
    { name: 'Tan', code: '#D2B48C' },
    { name: 'Teal', code: '#008080' },
    { name: 'Thistle', code: '#D8BFD8' },
    { name: 'Tomato', code: '#FF6347' },
    { name: 'Turquoise', code: '#40E0D0	 ' },
    { name: 'Violet', code: '#EE82EE' },
    { name: 'Wheat', code: '#F5DEB3' },
    { name: 'White', code: '#FFFFFF' },
    { name: 'WhiteSmoke', code: '#F5F5F5' },
    { name: 'Yellow', code: '#FFFF00' },
    { name: 'YellowGreen', code: '#9ACD32' }
  ];

  getColor(color: string) {
    let _element = document.createElement('div');
    _element.style.color = color;
    return _element.style.color.split(/\s+/).join('').toLowerCase();
  }

  /**
   * Checks whether a color is valid.
   * @param {Color} color
   * @return {boolean} Whether the color is a valid Color.
   */
  isColorValid(color: string) {
    return !!this.getColor(color) ? true : false;
  }

  hsla2hsva(hsla: Hsla) {
    let h: number = Math.min(hsla.h, 1), s = Math.min(hsla.s, 1), l = Math.min(hsla.l, 1);
    let a = Math.min(hsla.a, 1);
    if (l === 0) {
      return { h: h, s: 0, v: 0, a: a };
    } else {
      let v: number = l + s * (1 - Math.abs(2 * l - 1)) / 2;
      return { h: h, s: 2 * (v - l) / v, v: v, a: a };
    }
  }

  hsva2hsla(hsva: Hsva) {
    let h = hsva.h, s = hsva.s, v = hsva.v, a = hsva.a;
    if (v === 0) {
      return new Hsla(h, 0, 0, a);
    } else if (s === 0 && v === 1) {
      return new Hsla(h, 1, 1, a);
    } else {
      let l: number = v * (2 - s) / 2;
      return new Hsla(h, v * s / (1 - Math.abs(2 * l - 1)), l, a);
    }
  }

  rgbaToHsva(rgba: Rgba) {
    let r: number = Math.min(rgba.r, 1), g = Math.min(rgba.g, 1), b = Math.min(rgba.b, 1);
    let a = Math.min(rgba.a, 1);
    let max: number = Math.max(r, g, b), min = Math.min(r, g, b);
    let h: number, s: number, v: number = max;
    let d: number = max - min;
    s = max === 0 ? 0 : d / max;

    if (max === min) {
      h = 0;
    } else {
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return new Hsva(h, s, v, a);
  }

  hsvaToRgba(hsva: Hsva) {
    let h: number = hsva.h, s: number = hsva.s, v: number = hsva.v, a: number = hsva.a;
    let r: number, g: number, b: number;

    let i: number = Math.floor(h * 6);
    let f: number = h * 6 - i;
    let p: number = v * (1 - s);
    let q: number = v * (1 - f * s);
    let t: number = v * (1 - (1 - f) * s);

    switch (i % 6) {
      case 0:
        r = v; g = t; b = p;
        break;
      case 1:
        r = q; g = v; b = p;
        break;
      case 2:
        r = p; g = v; b = t;
        break;
      case 3:
        r = p; g = q; b = v;
        break;
      case 4:
        r = t; g = p; b = v;
        break;
      case 5:
        r = v; g = p; b = q;
        break;
    }

    return new Rgba(r, g, b, a);
  }

  stringToHsva(colorString: string) {
    let stringParsers = [
      {
        re: RGB,
        parse: function (execResult: Array<string>) {
          return new Rgba(parseInt(execResult[2]) / 255,
            parseInt(execResult[3]) / 255,
            parseInt(execResult[4]) / 255,
            isNaN(parseFloat(execResult[5])) ? 1 : parseFloat(execResult[5]));
        }
      },
      {
        re: HSL,
        parse: function (execResult: Array<string>) {
          return new Hsla(parseInt(execResult[2]) / 360,
            parseInt(execResult[3]) / 100,
            parseInt(execResult[4]) / 100,
            isNaN(parseFloat(execResult[5])) ? 1 : parseFloat(execResult[5]));
        }
      },
      {
        re: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/,
        parse: function (execResult: Array<string>) {
          return new Rgba(parseInt(execResult[1], 16) / 255,
            parseInt(execResult[2], 16) / 255,
            parseInt(execResult[3], 16) / 255,
            1);
        }
      },
      {
        re: /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])$/,
        parse: function (execResult: Array<string>) {
          return new Rgba(parseInt(execResult[1] + execResult[1], 16) / 255,
            parseInt(execResult[2] + execResult[2], 16) / 255,
            parseInt(execResult[3] + execResult[3], 16) / 255,
            1);
        }
      }
    ];
    colorString = colorString.toLowerCase();
    let hsva: any = null;
    for (let key in stringParsers) {
      if (stringParsers.hasOwnProperty(key)) {
        let parser = stringParsers[key];
        let match: Array<string> = parser.re.exec(colorString);
        let color = match && parser.parse(match);
        if (color) {
          if (color instanceof Rgba) {
            hsva = this.rgbaToHsva(color);
          } else if (color instanceof Hsla) {
            hsva = this.hsla2hsva(color);
          }
          return hsva;
        }
      }
    }
    return hsva;
  }

  outputFormat(hsva: Hsva, outputFormat: string) {
    if (hsva.a < 1) {
      switch (outputFormat) {
        case 'hsl':
          let hsla = this.hsva2hsla(hsva);
          let hslaText = new Hsla(Math.round((hsla.h) * 360), Math.round(hsla.s * 100),
            Math.round(hsla.l * 100), Math.round(hsla.a * 100) / 100
          );
          return 'hsla(' + hslaText.h + ',' + hslaText.s + '%,' +
            hslaText.l + '%,' + hslaText.a + ')';
        default:
          let rgba = this.denormalizeRGBA(this.hsvaToRgba(hsva));
          return 'rgba(' + rgba.r + ',' + rgba.g + ',' + rgba.b +
            ',' + Math.round(rgba.a * 100) / 100 + ')';
      }
    } else {
      switch (outputFormat) {
        case 'hsl':
          let hsla = this.hsva2hsla(hsva);
          let hslaText = new Hsla(Math.round((hsla.h) * 360), Math.round(hsla.s * 100),
            Math.round(hsla.l * 100), Math.round(hsla.a * 100) / 100);
          return 'hsl(' + hslaText.h + ',' + hslaText.s + '%,' + hslaText.l + '%)';
        case 'rgb':
          let rgba = this.denormalizeRGBA(this.hsvaToRgba(hsva));
          return 'rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ')';
        default:
          return this.hexText(this.denormalizeRGBA(this.hsvaToRgba(hsva)));
      }
    }
  }

  hexText(rgba: Rgba) {
    let mainText = ((1 << 24) | (rgba.r << 16) | (rgba.g << 8) | rgba.b).toString(16);
    let hexText = '#' + mainText.substr(1);
    return hexText.toLowerCase();
  }

  denormalizeRGBA(rgba: Rgba) {
    return new Rgba(Math.round(rgba.r * 255), Math.round(rgba.g * 255),
      Math.round(rgba.b * 255), rgba.a);
  }

}
