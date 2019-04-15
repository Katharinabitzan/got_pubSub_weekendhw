const House = require('./models/house.js');
const Character = require('./models/character.js');
const HouseListView = require('./views/house_list_view.js');
const HouseView = require('./views/house_view.js');
const CharacterView = require('./views/character_view.js');
const SelectView = require('./views/select_view.js');


document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');

  const houseSelectContainer = document.querySelector('select#select-house');
  const selectView = new SelectView(houseSelectContainer);
  selectView.bindEvents();

  const houseListContainer = document.querySelector('section#list-of-houses');
  const houseListView = new HouseListView(houseListContainer);
  houseListView.bindEvents();

  const characterView = new CharacterView();
  characterView.bindEvents();

  const house = new House();
  house.bindEvents();
  house.getData();




});
