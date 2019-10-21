const ObjectClass = require('./object');
const Constants = require('../shared/constants');

const { PLAYER_BASE_RADIUS } = Constants;

class Player extends ObjectClass {
  constructor(id, username, x, y) {
    super(id, x, y, Math.random() * 2 * Math.PI, Constants.PLAYER_SPEED);
    this.username = username;
    this.mass = 1;
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

  catchElectron() {
    this.score += Constants.SCORE_ELECTRON_CATCH;
    this.mass += 1;
  }

  serializeForUpdate() {
    return {
      ...(super.serializeForUpdate()),
      direction: this.direction,
      mass: this.mass,
    };
  }

  calcRadius() {
    return PLAYER_BASE_RADIUS * (this.mass ** 0.33);
  }
}

module.exports = Player;
