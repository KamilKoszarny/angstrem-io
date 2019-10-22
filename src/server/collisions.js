const Utils = require('../shared/utils');

// Returns an array of electrons to be destroyed.
function applyCollisions(players, particles, type) {
  const destroyedParticles = [];
  for (let i = 0; i < particles.length; i++) {
    for (let j = 0; j < players.length; j++) {
      const particle = particles[i];
      const player = players[j];
      const particleRadius = Utils.getPaticleRadius(type);
      if (player.distanceTo(particle) <= player.calcRadius() + particleRadius) {
        destroyedParticles.push(particle);
        player.catchParticle(type);
        break;
      }
    }
  }
  return destroyedParticles;
}

module.exports = applyCollisions;
