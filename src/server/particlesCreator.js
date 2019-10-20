const Constants = require('../shared/constants');
const Electron = require('./electron');

const ELECTRONS_MAX_COUNT = 50;

class ParticlesCreator {
  static createElectron(electrons) {
    if (electrons.length < ELECTRONS_MAX_COUNT) {
      const x = Constants.MAP_SIZE * Math.random();
      const y = Constants.MAP_SIZE * Math.random();
      const direction = Math.random() * 2 * Math.PI;
      return new Electron(x, y, direction);
    }
    return null;
  }
}

module.exports = ParticlesCreator;
