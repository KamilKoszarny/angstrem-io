// Learn more about this file at:
// https://victorzhou.com/blog/build-an-io-game-part-1/#6-client-input-%EF%B8%8F
import { updateDirection } from './networking';

const Utils = require('../shared/utils');

function onMouseInput(e) {
  handleInput(e.clientX, e.clientY);
}

function onTouchInput(e) {
  const touch = e.touches[0];
  handleInput(touch.clientX, touch.clientY);
}

function handleInput(x, y) {
  const visibleRadius = Math.min(window.innerWidth, window.innerHeight) / 2;
  const xMouseDist = (x - window.innerWidth / 2);
  const yMouseDist = (y - window.innerHeight / 2);
  const mouseDistance = Utils.distanceD(xMouseDist, yMouseDist);
  let xMouseDistRatio = xMouseDist / visibleRadius;
  let yMouseDistRatio = yMouseDist / visibleRadius;
  if (mouseDistance > visibleRadius) {
    xMouseDistRatio *= visibleRadius / mouseDistance;
    yMouseDistRatio *= visibleRadius / mouseDistance;
  }
  updateDirection(xMouseDistRatio, yMouseDistRatio);
}

export function startCapturingInput() {
  window.addEventListener('mousemove', onMouseInput);
  window.addEventListener('click', onMouseInput);
  window.addEventListener('touchstart', onTouchInput);
  window.addEventListener('touchmove', onTouchInput);
}

export function stopCapturingInput() {
  window.removeEventListener('mousemove', onMouseInput);
  window.removeEventListener('click', onMouseInput);
  window.removeEventListener('touchstart', onTouchInput);
  window.removeEventListener('touchmove', onTouchInput);
}
