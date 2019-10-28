class Object {
  constructor(id, x, y, initialMaxXSpeed) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.xSpeed = (2 * Math.random() - 1) * initialMaxXSpeed;
    this.ySpeed = (2 * Math.random() - 1) * initialMaxXSpeed;
  }

  update(dt) {
    this.x += dt * this.xSpeed;
    this.y -= dt * this.ySpeed;
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
}

module.exports = Object;
