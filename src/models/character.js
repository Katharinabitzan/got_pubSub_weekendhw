const Request = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Character = function () {
  this.data = [];
};

Character.prototype.getData = function (arrayOfURLs) {
  console.log(arrayOfURLs);
  arrayOfURLs.forEach((url)=>{

    const request = new Request(url);
    request.get()
      .then( (data)=>{
        this.data.push(data);
      });
  });
  PubSub.publish('Character:character-data-ready', this.data);
};


module.exports = Character;
