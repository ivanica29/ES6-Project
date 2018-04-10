export default function () {
  return fetch("https://api.opendota.com/api/heroes")
    .then((res) => res.json())
    .then((res) => Object.values(res));
}