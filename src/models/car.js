var Backbone = require('backbone');


/****************************************
  App
*****************************************/

var App = require('../app');

/****************************************
  Model: User
*****************************************/

App.Models.Car = Backbone.Model.extend({
  url: function() {
    var base = App.Settings.apiRoot + '/products';
    if (this.isNew()) return base;
    return base + '/' + this.id
  }
});

module.exports = App.Models.Car;