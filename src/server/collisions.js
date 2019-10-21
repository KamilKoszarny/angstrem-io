const Constants = require('../shared/constants');

// Returns an array of electrons to be destroyed.
function applyCollisions(players, electrons) {
  const destroyedElectrons = [];
  for (let i = 0; i < electrons.length; i++) {
    // Look for a player (who didn't create the electron) to collide each electron with.
    // As soon as we find one, break out of the loop to prevent double counting a electron.
    for (let j = 0; j < players.length; j++) {
      const electron = electrons[i];
      const player = players[j];
      if (
        electron.parentID !== player.id &&
        player.distanceTo(electron) <= player.calcRadius() + Constants.ELECTRON_RADIUS
      ) {
        destroyedElectrons.push(electron);
        player.catchElectron();
        break;
      }
    }
  }
  return destroyedElectrons;
}

module.exports = applyCollisions;
