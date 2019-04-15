const Request = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const House = function () {
  this.data = [];
  this.regions = [];
};

House.prototype.getData = function () {
  const url = 'https://anapioficeandfire.com/api/houses?page=1&pageSize=50';
  const request = new Request(url);
  request.get()
    .then( (data)=>{
      this.data = data;
      PubSub.publish('House:house-data-ready', this.data);
    });
};

House.prototype.bindEvents = function() {
  PubSub.subscribe('SelectView:region-selected', (event) => {
    const regionIndex = event.detail;
    const regionHouses = this.findHousesByRegion(regionIndex);
    PubSub.publish('House:Houses-by-region-ready', regionHouses)
  });
};

House.prototype.findHousesByRegion = function (index){
  this.regions = this.filterDataToRegion();
  const selectedRegion = this.regions[index];
  return this.data.filter((house) => {
    return house.region === selectedRegion;
  });

};

House.prototype.filterDataToRegion = function () {
  return this.data.map(house => house.region)
  .filter((region, index, regions) => regions.indexOf(region) === index);
};

module.exports = House;
