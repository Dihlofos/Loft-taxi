export const AddressList = () =>
  fetch("https://loft-taxi.glitch.me/addressList").then(response =>
    response.json()
  );
