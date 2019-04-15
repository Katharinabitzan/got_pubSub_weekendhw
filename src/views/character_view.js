const Request = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');
const Character = require('../models/character.js');

const CharacterView = function (){};

CharacterView.prototype.bindEvents = function(){
  PubSub.subscribe('House-view:button-clicked', (event) => {
    characterURLs = event.detail;
    console.log(event.detail);
    newCharacters = new Character();
    newCharacters.getData(characterURLs);
  });
}


// CharacterView.prototype.getCharacterDetails = function(characterUrl){
//
//
//
//   // const characterDetail = document.createElement('div');
//   // characterDetail.classList.add('character-detail');
//   //
//   // const name = document.createElement('h4');
//   // name.textContent = character.name;
//   // characterDetail.appendChild(name);
// };



module.exports = CharacterView;
