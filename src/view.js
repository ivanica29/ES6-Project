export default class View {
  static clearList() {
    let maindiv = document.getElementById('asd');
    maindiv.innerHTML = '';
  }

  static showView(list) {
    let maindiv = document.getElementById('asd');

    list.forEach((element) => {
      let listItem = document.createElement('div');
      let champ = `${element.localized_name}`;
      listItem.innerHTML = champ;
      maindiv.appendChild(listItem);
    })
  }
}