const Constants = require('../shared/constants');

// Returns an array of electrons to be destroyed.
function applyReactionForces(players) {
  for (let i = 0; i < players.length; i++) {
    for (let j = 0; j < players.length; j++) {
      if (i !== j) {
        const player1 = players[i];
        const player2 = players[j];
        const dist = player1.distanceTo(player2);
        if (dist <= Constants.REACTION_FORCE_MAX_DIST &&
              react([player1.element, player2.element])) {
          const force = (player1.mass + player2.mass) * -Constants.REACTION_FORCE / (dist + 1);
          const xForce = force * (player1.x - player2.x) / dist;
          const yForce = force * (player1.y - player2.y) / dist;
          player1.setForce(xForce, yForce);
          player2.setForce(-xForce, -yForce);
          player1.lines.push({ x: player2.x - player1.x, y: player2.y - player1.y, force });
          player2.lines.push({ x: player1.x - player2.x, y: player1.y - player2.y, force });
        }
      }
    }
  }
}

function react(elements) {
  for (let i = 0; i < Constants.REACTIONS.length; i++) {
    const reaction = Constants.REACTIONS[i];
    const reactants = elements.map(element => element.name);
    if (JSON.stringify(reaction.reactants) === JSON.stringify(reactants)) {
      return reaction;
    }
  }
  return null;
}

module.exports = applyReactionForces;
