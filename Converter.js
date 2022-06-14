class Converter {
  constructor() {
    this.C = require("./Constants");

    this.lengthMultiplier = {
      mm: {
        mm: 1,
        cm: 1 / this.C.CM_MM,
        m: 1 / this.C.M_MM,
        km: 1 / this.C.KM_MM,
      },
      cm: {
        mm: this.C.CM_MM,
        cm: 1,
        m: 1 / this.C.M_CM,
        km: 1 / this.C.KM_CM,
      },
      m: {
        mm: this.C.M_MM,
        cm: this.C.M_CM,
        m: 1,
        km: 1 / this.C.KM_M,
      },
      km: {
        mm: this.C.KM_MM,
        cm: this.C.KM_CM,
        m: this.C.KM_M,
        km: 1,
      },
    };

    this.weightMultiplier = {
      mg: {
        mg: 1,
        g: 1 / this.C.G_MG,
        lb: 1 / this.C.LB_MG,
        kg: 1 / this.C.KG_MG,
      },
      g: {
        mg: this.C.G_MG,
        g: 1,
        lb: 1 / this.C.LB_G,
        kg: 1 / this.C.KG_G,
      },
      kg: {
        mg: this.C.KG_MG,
        g: this.C.KG_G,
        lb: this.C.KG_LB,
        kg: 1,
      },
      lb: {
        mg: this.C.KG_MG,
        g: this.C.KG_G,
        lb: 1,
        kg: 1 / this.C.KG_LB,
      },
    };
  }

  _selectVariablesMultiplier(inputUnit, outputUnit) {
    const lengthUnits = Object.keys(this.lengthMultiplier);
    const weightUnits = Object.keys(this.weightMultiplier);

    if (lengthUnits.includes(inputUnit) && lengthUnits.includes(outputUnit)) {
      return this.lengthMultiplier;
    } else if (
      weightUnits.includes(inputUnit) &&
      weightUnits.includes(outputUnit)
    ) {
      return this.weightMultiplier;
    } else {
      throw Error("Invalid input and output types!");
    }
  }

  convert(num, inputUnit, outputUnit) {
    const multiplier = this._selectVariablesMultiplier(inputUnit, outputUnit);
    return num * multiplier[inputUnit][outputUnit];
  }
}

module.exports = new Converter();
