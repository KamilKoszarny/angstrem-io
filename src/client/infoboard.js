const infoboard = document.getElementById('infoboard');

let username = '';

export function updateInfoboard(data, me) {
  infoboard.getElementsByClassName('playerName')[0].textContent = username;
}

export function setInfoboardHidden(hidden) {
  if (hidden) {
    infoboard.classList.add('hidden');
  } else {
    infoboard.classList.remove('hidden');
  }
}

export function setUsername(newUsername) {
  username = newUsername;
}
