var $ = require('jquery');
var Backbone = require('backbone');
var listCarsTemplate = require('../templates/list-cars.hbs');

// App

var App = require('../app');

// View: List Users

var ListCars = Backbone.View.extend({
  el: $('.panel > div'),

  collection: App.Collections.car,

  render: function () {
    var _this = this;
    var carCollection = this.collection;

    // Fetch Collection from Server
    carCollection.fetch().done(function (cars) {
      _this.$el.html(listCarsTemplate(cars));
    });
  }
});

module.exports = ListCars;
