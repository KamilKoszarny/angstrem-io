const Constants = require('../shared/constants');

class Object {
  constructor(id, x, y, mass, charge, initialMaxXSpeed) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.mass = mass;
    this.charge = charge;
    this.xSpeed = (2 * Math.random() - 1) * initialMaxXSpeed;
    this.ySpeed = (2 * Math.random() - 1) * initialMaxXSpeed;
    this.xForce = 0;
    this.yForce = 0;
  }

  update(dt) {
    this.x += dt * this.xSpeed;
    this.y += dt * this.ySpeed;
    this.xSpeed = this.xSpeed + this.xForce / this.mass;
    this.ySpeed = this.ySpeed + this.yForce / this.mass;
  }

  distanceTo(object) {
    const dx = this.x - object.x;
    const dy = this.y - object.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  serializeForUpdate() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
    };
  }

  setForce(xForce, yForce) {
    this.xForce = xForce;
    this.yForce = yForce;
  }
}

module.exports = Object;
