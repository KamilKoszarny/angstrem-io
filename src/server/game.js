const Constants = require('../shared/constants');
const Player = require('./player');
const applyCollisions = require('./collisions');
const ParticlesCreator = require('./particlesCreator');

class Game {
  constructor() {
    this.sockets = {};
    this.players = {};
    this.electrons = [];
    this.protons = [];
    this.lastUpdateTime = Date.now();
    this.shouldSendUpdate = false;
    setInterval(this.update.bind(this), 1000 / 60);
  }

  addPlayer(socket, username) {
    this.sockets[socket.id] = socket;

    // Generate a position to start this player at.
    const x = Constants.MAP_SIZE * (0.25 + Math.random() * 0.5);
    const y = Constants.MAP_SIZE * (0.25 + Math.random() * 0.5);
    this.players[socket.id] = new Player(socket.id, username, x, y);
  }

  removePlayer(socket) {
    delete this.sockets[socket.id];
    delete this.players[socket.id];
  }

  handleInput(socket, dir) {
    if (this.players[socket.id]) {
      this.players[socket.id].setDirection(dir);
    }
  }

  update() {
    // Calculate time elapsed
    const now = Date.now();
    const dt = (now - this.lastUpdateTime) / 1000;
    this.lastUpdateTime = now;

    this.electrons = this.updateParticles(dt, this.electrons, 'electrons');
    this.protons = this.updateParticles(dt, this.protons, 'protons');

    // Update each player
    Object.keys(this.sockets).forEach(playerID => {
      const player = this.players[playerID];
      player.update(dt);
    });

    // Apply collisions, give players score for catching electrons
    const caughtElectrons = applyCollisions(Object.values(this.players), this.electrons);
    this.electrons = this.electrons.filter(electron => !caughtElectrons.includes(electron));

    // Check if any players are dead
    Object.keys(this.sockets).forEach(playerID => {
      const socket = this.sockets[playerID];
      const player = this.players[playerID];
      if (player.mass <= 0) {
        socket.emit(Constants.MSG_TYPES.GAME_OVER);
        this.removePlayer(socket);
      }
    });

    // Send a game update to each player every other time
    if (this.shouldSendUpdate) {
      const leaderboard = this.getLeaderboard();
      Object.keys(this.sockets).forEach(playerID => {
        const socket = this.sockets[playerID];
        const player = this.players[playerID];
        socket.emit(Constants.MSG_TYPES.GAME_UPDATE, this.createUpdate(player, leaderboard));
      });
      this.shouldSendUpdate = false;
    } else {
      this.shouldSendUpdate = true;
    }
  }

  updateParticles(dt, particles, type) {
    const particlesToRemove = [];
    particles.forEach(particle => {
      if (particle.update(dt)) {
        // Destroy this electron
        particlesToRemove.push(particle);
      }
    });
    const updatedParticles = particles.filter(particle => !particlesToRemove.includes(particle));
    if (Object.keys(this.players).length > 0) {
      const newParticle = ParticlesCreator.createParticle(updatedParticles, type);
      if (newParticle) {
        updatedParticles.push(newParticle);
      }
    }
    return updatedParticles;
  }

  getLeaderboard() {
    return Object.values(this.players)
      .sort((p1, p2) => p2.score - p1.score)
      .slice(0, 5)
      .map(p => ({ username: p.username, score: Math.round(p.score) }));
  }

  createUpdate(player, leaderboard) {
    const nearbyPlayers = Object.values(this.players).filter(
      p => p !== player && p.distanceTo(player) <= Constants.MAP_SIZE / 2,
    );
    const nearbyElectrons = this.electrons.filter(
      b => b.distanceTo(player) <= Constants.MAP_SIZE / 2,
    );

    return {
      t: Date.now(),
      me: player.serializeForUpdate(),
      others: nearbyPlayers.map(p => p.serializeForUpdate()),
      electrons: nearbyElectrons.map(b => b.serializeForUpdate()),
      leaderboard,
    };
  }
}

module.exports = Game;
