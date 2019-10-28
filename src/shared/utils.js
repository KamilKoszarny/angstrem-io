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

  static distance(x1, y1, x2, y2) {
    return Math.sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2));
  }

  static distanceD(dx, dy) {
    return Math.sqrt((dx ** 2) + (dy ** 2));
  }
}

module.exports = Utils;
