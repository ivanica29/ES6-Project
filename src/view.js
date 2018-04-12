export default class View {
  static clearList() {
    let maindiv = document.getElementById('champ-items');
    maindiv.innerHTML = '';
  }

  static showView(list) {
    let maindiv = document.getElementById('champ-items');

    list.forEach((element) => {
      let champItem = document.createElement('div');
      champItem.className = 'champ-item';
      champItem.className += ' col-md-3';

      let listItem = document.createElement('div');
      listItem.className = 'col-md-3';
      listItem.className = 'champ-header';
      let champ = `${element.localized_name}`;
      listItem.innerHTML = champ;
      champItem.appendChild(listItem);

      let string_img = element.name.split('npc_dota_hero_')[1] + '_lg.png';

      let img = document.createElement('img');
      img.src = 'http://cdn.dota2.com/apps/dota2/images/heroes/' + string_img;
      img.className = 'champ-pic';
      champItem.appendChild(img);

      maindiv.appendChild(champItem);
    })
  }
}