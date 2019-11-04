const shortid = require('shortid');
const ObjectClass = require('./object');
const Constants = require('../shared/constants');

class Electron extends ObjectClass {
  constructor(x, y) {
    super(shortid(), x, y, 0.2, -1, Constants.ELECTRON_MAX_X_SPEED);
  }

  // Returns true if the electron should be destroyed
  update(dt) {
    super.update(dt);
    return this.x < 0 || this.x > Constants.MAP_SIZE || this.y < 0 || this.y > Constants.MAP_SIZE;
  }
}

module.exports = Electron;
