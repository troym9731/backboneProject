var Backbone = require('backbone');


/****************************************
  App
*****************************************/

var App = require('../app');
var Car = require('../models/car');

/****************************************
  Collection: User
*****************************************/

var CarCollection = Backbone.Collection.extend({
  url: App.Settings.apiRoot + '/products',
  model: Car
});

App.Collections.car = new CarCollection;

module.exports = App.Collections.car;