const ObjectClass = require('./object');
const Constants = require('../shared/constants');

const { PLAYER_BASE_RADIUS, ELEMENTS, MOUSE_FORCE } = Constants;

class Player extends ObjectClass {
  constructor(id, username, x, y) {
    super(id, x, y, 1, 0, 0);
    this.username = username;
    this.atomicNumber = 1;
    this.element = ELEMENTS[this.atomicNumber - 1];
    this.molecule = null;
    this.score = 0;
    this.mouseXForce = 0;
    this.mouseYForce = 0;
    this.lines = [];
  }

  // Returns a newly created electron, or null.
  update(dt) {
    this.lines = [];
    super.update(dt);

    this.xSpeed = this.xSpeed + this.mouseXForce / this.mass;
    this.ySpeed = this.ySpeed + this.mouseYForce / this.mass;

    // Bounce from boundaries
    if (this.x < 0) {
      this.xSpeed = Constants.COLLISION_SPEED_DROP * Math.abs(this.xSpeed);
    } else if (this.x > Constants.MAP_SIZE) {
      this.xSpeed = -1 * Constants.COLLISION_SPEED_DROP * Math.abs(this.xSpeed);
    }
    if (this.y < 0) {
      this.ySpeed = Constants.COLLISION_SPEED_DROP * Math.abs(this.ySpeed);
    } else if (this.y > Constants.MAP_SIZE) {
      this.ySpeed = -1 * Constants.COLLISION_SPEED_DROP * Math.abs(this.ySpeed);
    }

    this.xSpeed = this.xSpeed * Constants.PLAYER_SPEED_WASTE;
    this.ySpeed = this.ySpeed * Constants.PLAYER_SPEED_WASTE;
  }

  setMouseForce(xMouseDistRatio, yMouseDistRatio) {
    this.mouseXForce = xMouseDistRatio * MOUSE_FORCE * (this.mass ** 0.5);
    this.mouseYForce = yMouseDistRatio * MOUSE_FORCE * (this.mass ** 0.5);
  }

  catchParticle(particle, type) {
    this.xSpeed = (this.xSpeed * this.mass + particle.xSpeed * particle.mass) /
      (this.mass + particle.mass) * Constants.COLLISION_SPEED_DROP;
    this.ySpeed = (this.ySpeed * this.mass + particle.ySpeed * particle.mass) /
      (this.mass + particle.mass) * Constants.COLLISION_SPEED_DROP;
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
      molecule: this.molecule,
      charge: this.charge,
      lines: this.lines,
    };
  }

  calcRadius() {
    return PLAYER_BASE_RADIUS * (this.mass ** 0.33);
  }

  calcDirection() {
    return Math.atan2(this.xSpeed, -this.ySpeed);
  }
}

module.exports = Player;
