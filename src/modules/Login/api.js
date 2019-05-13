export const Auth = (login, password) =>
  fetch(
    `https://loft-taxi.glitch.me/auth?username=${login}&password=${password}`
  ).then(response => response.json());
