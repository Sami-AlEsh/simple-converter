class Converter {
  constructor() {
    this.units = {
      /*
       * Reference: https://en.wikipedia.org/wiki/International_System_of_Units
       */
      Y: Math.pow(10, 24),
      Z: Math.pow(10, 21),
      E: Math.pow(10, 18),
      P: Math.pow(10, 15),
      T: Math.pow(10, 12),
      G: Math.pow(10, 9),
      M: Math.pow(10, 6),
      k: Math.pow(10, 3),
      h: Math.pow(10, 2),
      D: Math.pow(10, 1),

      d: Math.pow(10, -1),
      c: Math.pow(10, -2),
      m: Math.pow(10, -3),
      μ: Math.pow(10, -6),
      n: Math.pow(10, -9),
      p: Math.pow(10, -12),
      f: Math.pow(10, -15),
      a: Math.pow(10, -18),
      z: Math.pow(10, -21),
      y: Math.pow(10, -24),

      /*
       * Reference: https://ec.europa.eu/health/scientific_committees/opinions_layman/en/phthalates-school-supplies/glossary/mno/mass-units.htm
       */
      t: Math.pow(10, 6),
      lb: 453.59, // how many grams are in one pounds
      oz: 28.35, // how many grams are in one ounce

      /*
       * Measures
       */
      meter: 1,
      gram: 1,
    };
  }

  _parseUnit(unit) {
    let type = undefined;
    let value = 1;

    const lastLetter = unit[unit.length - 1];
    if (lastLetter === "m") {
      type = "length";
    } else if (lastLetter === "g") {
      type = "weight";
    } else {
      throw new Error("Invalid unit type: " + lastLetter);
    }

    unit = unit.slice(0, unit.length - 1);
    if (unit.length > 0) {
      if (Object.keys(this.units).includes(unit)) {
        value = this.units[unit];
        return { type, value };
      } else {
        throw new Error("Invalid unit /" + unit + "/ of type: " + type);
      }
    }

    return { type, value: 1 };
  }

  convert = (num, from, to) => {
    const inputData = this._parseUnit(from);
    const outputData = this._parseUnit(to);

    if (inputData.type !== outputData.type) {
      throw new Error(
        `Unit types are different: ${inputData.type} / ${outputData.type}`
      );
    }

    return (num * inputData.value) / outputData.value;
  };
}

module.exports = new Converter().convert;
