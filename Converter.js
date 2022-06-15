const units = {
  /*
   * Reference: https://en.wikipedia.org/wiki/International_System_of_Units
   */
  yotta: "Y",
  zeta: "Z",
  exa: "E",
  peta: "P",
  tera: "T",
  giga: "G",
  mega: "M",
  kilo: "k",
  hecto: "h",
  deca: "D",

  deci: "d",
  centi: "c",
  mili: "m",
  micro: "μ",
  nano: "n",
  pico: "p",
  femto: "f",
  atto: "a",
  zepto: "z",
  yocto: "y",

  /*
   * Reference: https://ec.europa.eu/health/scientific_committees/opinions_layman/en/phthalates-school-supplies/glossary/mno/mass-units.htm
   */
  tonne: "t",
  pound: "lb",
  ounce: "oz",

  gram: "",
  meter: "",
};

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
      lb: 453.59,
      oz: 28.35,

      /*
       * Measures
       */
      meter: 1,
      gram: 1,
    };
  }

  _validateUnits(inputUnit, outputUnit) {
    if (inputUnit.length > 2 || outputUnit.length > 2) {
      throw new Error(" invalid units!");
    }

    let inMeasure = inputUnit[inputUnit.length - 1];
    let outMeasure = outputUnit[outputUnit.length - 1];
    if (
      inMeasure !== outMeasure ||
      !["m", "g"].includes(inMeasure) ||
      !["m", "g"].includes(outMeasure)
    ) {
      throw new Error(" invalid units!");
    }

    inMeasure = inMeasure === "m" ? "meter" : "gram";
    outMeasure = outMeasure === "m" ? "meter" : "gram";

    const _inputUnit = inputUnit.length === 2 ? inputUnit[0] : inMeasure;
    const _outputUnit = outputUnit.length === 2 ? outputUnit[0] : outMeasure;

    return { inputUnit: _inputUnit, outputUnit: _outputUnit };
  }

  _convert(num, inputUnit, outputUnit) {
    const processedUnits = this._validateUnits(inputUnit, outputUnit);
    return (
      num *
      (this.units[processedUnits.inputUnit] /
        this.units[processedUnits.outputUnit])
    );
  }

  convertLength(num, from, to) {
    return this._convert(num, from + "m", to + "m");
  }

  convertWeight(num, from, to) {
    return this._convert(num, from + "g", to + "g");
  }
}

module.exports = {
  units,
  converter: new Converter(),
};
