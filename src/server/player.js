const ObjectClass = require('./object');
const Constants = require('../shared/constants');

const { PLAYER_BASE_RADIUS, ELEMENTS } = Constants;

class Player extends ObjectClass {
  constructor(id, username, x, y) {
    super(id, x, y, Math.random() * 2 * Math.PI, Constants.PLAYER_BASE_SPEED);
    this.username = username;
    this.mass = 1;
    this.atomicNumber = 1;
    this.element = ELEMENTS[this.atomicNumber - 1];
    this.charge = 0;
    this.score = 0;
  }

  // Returns a newly created electron, or null.
  update(dt) {
    super.update(dt);

    // Make sure the player stays in bounds
    this.x = Math.max(0, Math.min(Constants.MAP_SIZE, this.x));
    this.y = Math.max(0, Math.min(Constants.MAP_SIZE, this.y));

    return null;
  }

  catchParticle(type) {
    switch (type) {
      case 'electrons':
        this.score += Constants.SCORE_ELECTRON_CATCH;
        this.charge -= 1;
        break;
      case 'protons':
        this.score += Constants.SCORE_PROTON_CATCH;
        this.charge += 1;
        this.mass += 1;
        this.atomicNumber += 1;
        this.element = ELEMENTS[this.atomicNumber - 1];
        break;
      case 'neutrons':
        this.score += Constants.SCORE_NEUTRON_CATCH;
        this.mass += 1;
        break;
      default: break;
    }
  }

  serializeForUpdate() {
    return {
      ...(super.serializeForUpdate()),
      direction: this.direction,
      mass: this.mass,
      element: this.element,
      charge: this.charge,
    };
  }

  calcRadius() {
    return PLAYER_BASE_RADIUS * (this.mass ** 0.33);
  }
}

module.exports = Player;
