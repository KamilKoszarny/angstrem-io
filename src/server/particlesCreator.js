const Constants = require('../shared/constants');
const Electron = require('./electron');
const Proton = require('./proton');
const Neutron = require('./neutron');

class ParticlesCreator {
  static createParticle(particles, type) {
    switch (type) {
      case 'electrons': return this.createElectron(particles);
      case 'protons': return this.createProton(particles);
      case 'neutrons': return this.createNeutron(particles);
      default: return null;
    }
  }

  static createElectron(electrons) {
    if (electrons.length < Constants.ELECTRONS_MAX_COUNT) {
      const { x, y } = this.generateCoords();
      return new Electron(x, y);
    }
    return null;
  }

  static createProton(protons) {
    if (protons.length < Constants.PROTONS_MAX_COUNT) {
      const { x, y } = this.generateCoords();
      return new Proton(x, y);
    }
    return null;
  }

  static createNeutron(neurtons) {
    if (neurtons.length < Constants.NEUTRON_MAX_X_SPEED) {
      const { x, y } = this.generateCoords();
      return new Neutron(x, y);
    }
    return null;
  }

  static generateCoords() {
    const x = Constants.MAP_SIZE * Math.random();
    const y = Constants.MAP_SIZE * Math.random();
    return { x, y };
  }
}

module.exports = ParticlesCreator;
