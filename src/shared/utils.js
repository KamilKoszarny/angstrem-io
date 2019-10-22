const Constants = require('../shared/constants');

class Utils {
  static getPaticleRadius(type) {
    switch (type) {
      case 'electrons': return Constants.ELECTRON_RADIUS;
      case 'protons': return Constants.PROTON_RADIUS;
      case 'neutrons': return Constants.NEUTRON_RADIUS;
      default: return null;
    }
  }
}

module.exports = Utils;
