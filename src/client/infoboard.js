const infoboard = document.getElementById('infoboard');

let username = '';

export function updateInfoboard(data, me) {
  infoboard.getElementsByClassName('name')[0].textContent = username;
  infoboard.getElementsByClassName('element')[0].textContent = me.element.name;
  infoboard.getElementsByClassName('molecule')[0].textContent =
    me.molecule ? me.molecule.name : '-';
  infoboard.getElementsByClassName('mass')[0].textContent = me.mass;
  infoboard.getElementsByClassName('charge')[0].textContent = me.charge;
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
