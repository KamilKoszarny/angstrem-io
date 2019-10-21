module.exports = Object.freeze({
  PLAYER_BASE_RADIUS: 10,
  PLAYER_SPEED: 200,

  ELECTRON_RADIUS: 3,
  ELECTRON_SPEED: 500,

  SCORE_ELECTRON_CATCH: 10,

  MAP_SIZE: 3000,
  MSG_TYPES: {
    JOIN_GAME: 'join_game',
    GAME_UPDATE: 'update',
    INPUT: 'input',
    GAME_OVER: 'dead',
  },
});
