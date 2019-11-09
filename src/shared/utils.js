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

  // assume uniqueness
  static makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  static equalsJSON(o1, o2) {
    return JSON.stringify(o1) === JSON.stringify(o2);
  }
}

module.exports = Utils;
