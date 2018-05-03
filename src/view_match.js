
export default class ViewMatch {

  showMatch(k, d, a, nicknames, i1, i2, i3, i4, i5) {

    let champDetail = document.getElementById('champ-detail');

    let champTable = document.createElement('table');
    champTable.style.clear = 'both';
    champDetail.appendChild(champTable);

    let headerRow = document.createElement('tr');
    champTable.appendChild(headerRow);

    let playerHeader = document.createElement('th');
    playerHeader.innerHTML = 'Player';
    headerRow.appendChild(playerHeader);

    let killsHeader = document.createElement('th');
    killsHeader.innerHTML = 'K';
    headerRow.appendChild(killsHeader);

    let deathsHeader = document.createElement('th');
    deathsHeader.innerHTML = 'D';
    headerRow.appendChild(deathsHeader);

    let assistsHeader = document.createElement('th');
    assistsHeader.innerHTML = 'A';
    headerRow.appendChild(assistsHeader);

    let itemsHeader = document.createElement('th');
    itemsHeader.innerHTML = 'Items';
    headerRow.appendChild(itemsHeader);

    nicknames.forEach((nick, index) => {

      let row = document.createElement('tr');
      champTable.appendChild(row);

      let playerName = document.createElement('td');
      playerName.innerHTML = nick;
      row.appendChild(playerName);

      let kills = document.createElement('td');
      kills.innerHTML = k[index];
      row.appendChild(kills);

      let deaths = document.createElement('td');
      deaths.innerHTML = d[index];
      row.appendChild(deaths);

      let assists = document.createElement('td');
      assists.innerHTML = a[index];
      row.appendChild(assists);

      let items = document.createElement('td');
      items.id = 'items_' + index;
      row.appendChild(items);
    })


  }
}