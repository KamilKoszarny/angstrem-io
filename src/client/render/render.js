// Learn more about this file at:
// https://victorzhou.com/blog/build-an-io-game-part-1/#5-client-rendering
import { debounce } from 'throttle-debounce';
import { getAsset } from '../assets';
import { getCurrentState } from '../state';

const Constants = require('../../shared/constants');
const RenderUtils = require('./renderUtils');

const { PLAYER_BASE_RADIUS, ELECTRON_RADIUS, PROTON_RADIUS, NEUTRON_RADIUS, MAP_SIZE } = Constants;

// Get the canvas graphics context
const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');
setCanvasDimensions();

function setCanvasDimensions() {
  // On small screens (e.g. phones), we want to "zoom out" so players can still see at least
  // 800 in-game units of width.
  const scaleRatio = Math.max(1, 800 / window.innerWidth);
  canvas.width = scaleRatio * window.innerWidth;
  canvas.height = scaleRatio * window.innerHeight;
}

window.addEventListener('resize', debounce(40, setCanvasDimensions));

function render() {
  const { me, others, electrons, protons, neutrons } = getCurrentState();
  if (!me) {
    return;
  }

  // Draw background
  renderBackground(me.x, me.y);

  // Draw boundaries
  context.save();
  context.strokeStyle = 'black';
  context.lineWidth = 2;
  context.strokeRect(canvas.width / 2 - me.x, canvas.height / 2 - me.y, MAP_SIZE, MAP_SIZE);

  // Draw grid
  context.lineWidth = 0.5;
  context.setLineDash([10, 10]);
  context.beginPath();
  const gridDensity = 10;
  const gridSize = MAP_SIZE / gridDensity;
  context.moveTo(canvas.width / 2 - me.x, canvas.height / 2 - me.y + gridSize);
  for (let i = 1; i < gridDensity; i++) {
    context.lineTo(canvas.width / 2 - me.x + MAP_SIZE, canvas.height / 2 - me.y + i * gridSize);
    context.moveTo(canvas.width / 2 - me.x + i * gridSize, canvas.height / 2 - me.y);
    context.lineTo(canvas.width / 2 - me.x + i * gridSize, canvas.height / 2 - me.y + MAP_SIZE);
    context.moveTo(canvas.width / 2 - me.x, canvas.height / 2 - me.y + (i + 1) * gridSize);
  }
  context.stroke();
  context.restore();

  // Draw all particles
  electrons.forEach(renderParticle.bind(null, me, ELECTRON_RADIUS, 'electron.svg'));
  protons.forEach(renderParticle.bind(null, me, PROTON_RADIUS, 'proton.svg'));
  neutrons.forEach(renderParticle.bind(null, me, NEUTRON_RADIUS, 'neutron.svg'));

  // Draw all players
  renderPlayer(me, me);
  others.forEach(renderPlayer.bind(null, me));
}

function renderBackground(x, y) {
  const backgroundX = MAP_SIZE / 2 - x + canvas.width / 2;
  const backgroundY = MAP_SIZE / 2 - y + canvas.height / 2;
  const backgroundGradient = context.createRadialGradient(
    backgroundX,
    backgroundY,
    MAP_SIZE / 10,
    backgroundX,
    backgroundY,
    MAP_SIZE / 2,
  );
  backgroundGradient.addColorStop(0, 'orange');
  backgroundGradient.addColorStop(1, 'purple');
  context.fillStyle = backgroundGradient;
  context.fillRect(0, 0, canvas.width, canvas.height);
}

// Renders players atoms at the given coordinates
function renderPlayer(me, player) {
  const { x, y, direction } = player;
  const canvasX = canvas.width / 2 + x - me.x;
  const canvasY = canvas.height / 2 + y - me.y;

  // Draw player atom
  const playerRadius = PLAYER_BASE_RADIUS * (player.mass ** 0.33);
  context.save();
  context.translate(canvasX, canvasY);
  context.lineWidth = 3;
  context.fillStyle = player.element.color;
  context.beginPath();
  context.arc(0, 0,
    playerRadius,
    0, 2 * Math.PI);
  context.stroke();
  context.fill();

  context.font = `${playerRadius}px Arial`;
  context.fillStyle = RenderUtils.invertColor(player.element.color, true);
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(player.element.symbol, 0, 0);

  // Draw player direction
  context.rotate(direction);
  const ARROW_DIST = 6;
  const ARROW_SIZE = playerRadius / 2;
  context.drawImage(
    getAsset('arrow.svg'),
    -1 * ARROW_SIZE / 2,
    -1 * (playerRadius + ARROW_DIST) - ARROW_SIZE / 2,
    ARROW_SIZE,
    ARROW_SIZE,
  );

  context.restore();
}

function renderParticle(me, radius, asset, particle) {
  const { x, y } = particle;
  context.drawImage(
    getAsset(asset),
    canvas.width / 2 + x - me.x - radius,
    canvas.height / 2 + y - me.y - radius,
    radius * 2,
    radius * 2,
  );
}

function renderMainMenu() {
  const t = Date.now() / 7500;
  const x = MAP_SIZE / 2 + 800 * Math.cos(t);
  const y = MAP_SIZE / 2 + 800 * Math.sin(t);
  renderBackground(x, y);
}

let renderInterval = setInterval(renderMainMenu, 1000 / 60);

// Replaces main menu rendering with game rendering.
export function startRendering() {
  clearInterval(renderInterval);
  renderInterval = setInterval(render, 1000 / 60);
}

// Replaces game rendering with main menu rendering.
export function stopRendering() {
  clearInterval(renderInterval);
  renderInterval = setInterval(renderMainMenu, 1000 / 60);
}
