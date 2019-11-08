const Element = require('./element');
const Reaction = require('./reaction');

module.exports = Object.freeze({
  PLAYER_BASE_RADIUS: 10,
  ELECTRON_RADIUS: 3,
  PROTON_RADIUS: 9,
  NEUTRON_RADIUS: 9,

  PLAYER_MAX_X_SPEED: 300,
  ELECTRON_MAX_X_SPEED: 400,
  PROTON_MAX_X_SPEED: 100,
  NEUTRON_MAX_X_SPEED: 50,

  SCORE_ELECTRON_CATCH: 10,
  SCORE_PROTON_CATCH: 5,
  SCORE_NEUTRON_CATCH: 3,

  ELECTRONS_MAX_COUNT: 0,
  PROTONS_MAX_COUNT: 0,
  NEUTRONS_MAX_COUNT: 0,

  MOUSE_FORCE: 10,
  CHARGE_FORCE: 100,
  CHARGE_FORCE_MAX_DIST: 1000,
  REACTION_FORCE: 100,
  REACTION_FORCE_MAX_DIST: 1000,

  COLLISION_SPEED_DROP: 0.8,
  PLAYER_SPEED_WASTE: 0.99,

  MAP_SIZE: 3000,
  MSG_TYPES: {
    JOIN_GAME: 'join_game',
    GAME_UPDATE: 'update',
    INPUT: 'input',
    GAME_OVER: 'dead',
  },

  ELEMENTS: [
    new Element(1, 'Hydrogen', 'H', 'White'),
    new Element(2, 'Helium', 'He', 'LightCyan'),
    new Element(3, 'Lithium', 'Li', 'MediumOrchid'),
    new Element(4, 'Beryllium', 'Be', 'YellowGreen'),
    new Element(5, 'Boron', 'B', 'LightSalmon'),
  ],

  REACTIONS: [
    new Reaction(['Hydrogen', 'Hydrogen'].sort(), 'Dihydrogen'),
  ],
});
