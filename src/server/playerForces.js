const Constants = require('../shared/constants');
const Utils = require('../shared/utils');

// Returns an array of electrons to be destroyed.
function applyPlayerForces(players) {
  for (let i = 0; i < players.length; i++) {
    for (let j = 0; j < players.length; j++) {
      if (i !== j) {
        const player1 = players[i];
        const player2 = players[j];
        const dist = player1.distanceTo(player2);
        let force = 0;
        const product = react([player1.molecule, player2.molecule],
          [player1.element, player2.element]);
        if (dist < Constants.REACTION_FORCE_MAX_DIST && product) {
          if (!player1.molecule) {
            const moleculeId = Utils.makeid(8);
            player1.molecule = {
              name: product,
              id: moleculeId,
            };
            player2.molecule = {
              name: product,
              id: moleculeId,
            };
          }
          if (dist > Constants.REACTION_FORCE_MIN_DIST) {
            force += ((player1.mass + player2.mass) ** 0.2) *
              -1 * Constants.REACTION_FORCE / (dist + 1);
          }
        } else if (player1.molecule && Utils.equalsJSON(player1.molecule, player2.molecule)) {
          player1.molecule = null;
          player2.molecule = null;
        }
        if (dist < Constants.CHARGE_FORCE_MAX_DIST) {
          force += player1.charge * player2.charge * Constants.CHARGE_FORCE / (dist + 1);
        }
        const xForce = force * (player1.x - player2.x) / dist;
        const yForce = force * (player1.y - player2.y) / dist;
        player1.setForce(xForce, yForce);
        if (force !== 0) {
          player1.lines.push({ x: player2.x - player1.x, y: player2.y - player1.y, force });
        }
      }
    }
  }
}

function react(molecules, elements) {
  if (molecules[0] && Utils.equalsJSON(molecules[0], molecules[1])) {
    return molecules[0];
  }

  const reactants = [];
  for (let i = 0; i < molecules.length; i++) {
    if (molecules[i]) {
      reactants.push(molecules[i].name);
    } else {
      reactants.push(elements[i].name);
    }
  }

  for (let i = 0; i < Constants.REACTIONS.length; i++) {
    const reaction = Constants.REACTIONS[i];
    if (Utils.equalsJSON(reaction.reactants, reactants)) {
      return reaction.products[0];
    }
  }
  return null;
}

module.exports = applyPlayerForces;
