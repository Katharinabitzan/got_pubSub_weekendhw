const PubSub = require('../helpers/pub_sub.js');

const SelectView = function(container) {
  this.container = container;
};

SelectView.prototype.bindEvents = function () {
  PubSub.subscribe('House:house-data-ready', (event) => {
    const data = event.detail;
    const filteredData = this.filterData(data);
    this.populate(filteredData);
  });

  this.container.addEventListener('change',(event) =>{
    const selectedIndex = event.target.value;
    PubSub.publish('SelectView:region-selected', selectedIndex);
    });
};

SelectView.prototype.filterData = function (allData) {
  return allData.map(house => house.region)
  .filter((region, index, regions) => regions.indexOf(region) === index);
};

SelectView.prototype.populate = function (filteredData) {
  filteredData.forEach((region, index) => {
    const option = document.createElement('option');
    option.textContent = region;
    option.value = index;
    this.container.appendChild(option);
  });
};

module.exports = SelectView;
