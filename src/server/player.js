const ObjectClass = require('./object');
const Constants = require('../shared/constants');

const { PLAYER_BASE_RADIUS, ELEMENTS, MOUSE_FORCE, MOUSE_FORCE_DIVIDER } = Constants;

class Player extends ObjectClass {
  constructor(id, username, x, y) {
    super(id, x, y, 0);
    this.username = username;
    this.mass = 1;
    this.atomicNumber = 1;
    this.element = ELEMENTS[this.atomicNumber - 1];
    this.charge = 0;
    this.score = 0;
    this.xForce = 0;
    this.yForce = 0;
  }

  // Returns a newly created electron, or null.
  update(dt) {
    super.update(dt);

    // Make sure the player stays in bounds
    this.x = Math.max(0, Math.min(Constants.MAP_SIZE, this.x));
    this.y = Math.max(0, Math.min(Constants.MAP_SIZE, this.y));

    this.xSpeed = this.xSpeed + (this.xForce - this.xSpeed) /
      MOUSE_FORCE_DIVIDER / (this.mass ** 0.3);
    this.ySpeed = this.ySpeed + (this.yForce - this.ySpeed) /
      MOUSE_FORCE_DIVIDER / (this.mass ** 0.3);
    return null;
  }

  setMouseForce(xMouseDistRatio, yMouseDistRatio) {
    this.xForce = xMouseDistRatio * MOUSE_FORCE;
    this.yForce = -yMouseDistRatio * MOUSE_FORCE;
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
      direction: this.calcDirection(),
      mass: this.mass,
      element: this.element,
      charge: this.charge,
    };
  }

  calcRadius() {
    return PLAYER_BASE_RADIUS * (this.mass ** 0.33);
  }

  calcDirection() {
    return Math.atan2(this.xSpeed, this.ySpeed);
  }
}

module.exports = Player;
