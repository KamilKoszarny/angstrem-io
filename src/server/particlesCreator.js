const Constants = require('../shared/constants');
const Electron = require('./electron');
const Proton = require('./proton');

const ELECTRONS_MAX_COUNT = 50;
const PROTONS_MAX_COUNT = 25;

class ParticlesCreator {
  static createParticle(particles, type) {
    switch (type) {
      case 'electrons': return this.createElectron(particles);
      case 'protons': return this.createProton(particles);
      default: return null;
    }
  }

  static createElectron(electrons) {
    if (electrons.length < ELECTRONS_MAX_COUNT) {
      const { x, y, direction } = this.generateCoords();
      return new Electron(x, y, direction);
    }
    return null;
  }

  static createProton(protons) {
    if (protons.length < PROTONS_MAX_COUNT) {
      const { x, y, direction } = this.generateCoords();
      return new Proton(x, y, direction);
    }
    return null;
  }

  static generateCoords() {
    const x = Constants.MAP_SIZE * Math.random();
    const y = Constants.MAP_SIZE * Math.random();
    const direction = Math.random() * 2 * Math.PI;
    return { x, y, direction };
  }
}

module.exports = ParticlesCreator;
