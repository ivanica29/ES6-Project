export default class ViewItems {

  static showItem(list) {
    let maindiv = document.getElementById('items');

    list.forEach((element) => {
      let item = document.createElement('div');
      item.className = 'item';
      item.className += ' col-md-3';

      let listItem = document.createElement('div');
      listItem.className = 'col-md-3';
      listItem.className = 'champ-header';
      let itemName = `${element.localizedName}`;
      listItem.innerHTML = itemName;
      item.appendChild(listItem);

      let string_img = element.name.split('item_')[1] + '_lg.png';

      let img = document.createElement('img');
      img.src = 'http://cdn.dota2.com/apps/dota2/images/items/' + string_img;
      img.className = 'item-pic';
      item.appendChild(img);

      maindiv.appendChild(item);
    })
    }

  static clearList() {
    let maindiv = document.getElementById('champ-items');
    maindiv.innerHTML = '';
  }
}