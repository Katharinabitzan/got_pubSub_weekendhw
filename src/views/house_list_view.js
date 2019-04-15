const PubSub = require('../helpers/pub_sub.js');
const HouseView = require('./house_view.js');
const House = require('../models/house.js');

const HouseListView = function(container){
  this.container = container;
};

HouseListView.prototype.bindEvents = function () {
  PubSub.subscribe('House:Houses-by-region-ready', (event)=>{
    this.clearList();
    this.renderHouseDetailView(event.detail);
  });
};

HouseListView.prototype.renderHouseDetailView = function (houses){
  houses.forEach((house) => {
    const houseItem = this.createHouseListItem(house);
    this.container.appendChild(houseItem);
  });
};

HouseListView.prototype.createHouseListItem = function (house) {
  const houseDetailView = new HouseView();
  const houseInfo = houseDetailView.getHouseDetails(house);
  return houseInfo;
};

HouseListView.prototype.clearList = function () {
  this.container.innerHTML = '';
};

module.exports = HouseListView;
