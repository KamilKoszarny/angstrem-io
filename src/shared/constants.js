const Element = require('./element');

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

  ELECTRONS_MAX_COUNT: 50,
  PROTONS_MAX_COUNT: 20,
  NEUTRONS_MAX_COUNT: 15,

  MOUSE_FORCE: 500,
  MOUSE_FORCE_DIVIDER: 50,

  ELEMENTS: [
    new Element(1, 'Hydrogen', 'H', 'White'),
    new Element(2, 'Helium', 'He', 'LightCyan'),
    new Element(3, 'Lithium', 'Li', 'MediumOrchid'),
    new Element(4, 'Beryllium', 'Be', 'YellowGreen'),
    new Element(5, 'Boron', 'B', 'LightSalmon'),
  ],

  MAP_SIZE: 3000,
  MSG_TYPES: {
    JOIN_GAME: 'join_game',
    GAME_UPDATE: 'update',
    INPUT: 'input',
    GAME_OVER: 'dead',
  },
});
