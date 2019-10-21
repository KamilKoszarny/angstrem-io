module.exports = Object.freeze({
  PLAYER_BASE_RADIUS: 10,
  PLAYER_BASE_SPEED: 400,

  ELECTRON_RADIUS: 2,
  ELECTRON_SPEED: 500,

  PROTON_RADIUS: 10,
  PROTON_SPEED: 100,

  SCORE_ELECTRON_CATCH: 10,
  SCORE_PROTON_CATCH: 10,

  MAP_SIZE: 3000,
  MSG_TYPES: {
    JOIN_GAME: 'join_game',
    GAME_UPDATE: 'update',
    INPUT: 'input',
    GAME_OVER: 'dead',
  },
});
