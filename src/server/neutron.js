const shortid = require('shortid');
const ObjectClass = require('./object');
const Constants = require('../shared/constants');

class Proton extends ObjectClass {
  constructor(x, y) {
    super(shortid(), x, y, Constants.NEUTRON_MAX_X_SPEED);
  }

  // Returns true if should be destroyed
  update(dt) {
    super.update(dt);
    return this.x < 0 || this.x > Constants.MAP_SIZE || this.y < 0 || this.y > Constants.MAP_SIZE;
  }
}

module.exports = Proton;
