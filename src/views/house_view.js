const PubSub = require('../helpers/pub_sub.js');
// const CharacterView = require('./views/character_view.js');

const HouseView = function (){};

HouseView.prototype.getHouseDetails = function(house){
  const houseDetail = document.createElement('div');
  houseDetail.classList.add('house-detail');

  const name = document.createElement('h3');
  name.textContent = house.name;
  houseDetail.appendChild(name);

  const detailsList = document.createElement('ul');
  const coatOfArms = this.createDetailListItem('Coat of Arms', house.coatOfArms);
  detailsList.appendChild(coatOfArms);

  const words = this.createDetailListItem('Words', house.words);
  detailsList.appendChild(words);

  const charactersButton = document.createElement('button');
  charactersButton.textContent = 'View sworn members';
  detailsList.appendChild(charactersButton);
  charactersButton.addEventListener('click', this.createCharacterListItem(house.swornMembers))

  houseDetail.appendChild(detailsList);
  return houseDetail;
};

HouseView.prototype.createCharacterListItem = function(characters) {
  PubSub.publish('House-view:button-clicked', characters)
  PubSub.subscribe('Character-view:characters-ready')
};

HouseView.prototype.createDetailListItem = function (label, property) {
  const element = document.createElement('li');
  element.textContent = `${label}: ${property}`;
  return element;
};


HouseView.prototype.createElement = function(type, text) {
  const element = document.createElement(type);
  element.textContent = text;
  return element;
};

module.exports = HouseView;
