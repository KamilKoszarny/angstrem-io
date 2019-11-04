const Constants = require('../shared/constants');

// Returns an array of electrons to be destroyed.
function applyForces(players, particles, type) {
  for (let i = 0; i < players.length; i++) {
    for (let j = 0; j < particles.length; j++) {
      const player = players[i];
      const particle = particles[j];
      const dist = player.distanceTo(particle);
      if (dist <= Constants.CHARGE_FORCE_MAX_DIST) {
        const force = player.charge * particle.charge * -1 * Constants.CHARGE_FORCE / (dist + 1);
        const xForce = force * (player.x - particle.x) / dist;
        const yForce = force * (player.y - particle.y) / dist;
        particle.setForce(xForce, yForce);
      }
    }
  }
}

module.exports = applyForces;
