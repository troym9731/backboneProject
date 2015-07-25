var Backbone = require('backbone');

// App
var App = require('./app');
var userCollection = require('./collections/user');

// View: User Form
var UserFormView = require('./views/user-form');
App.Views.UserForm = new UserFormView;

// View: List Users
var ListUsersView = require('./views/list-users');
App.Views.ListUsers  = new ListUsersView;

// View: Car Form
var CarFormView = require('./views/car-form');
App.Views.CarForm = new CarFormView;

// View: List Car
var ListCarsView = require('./views/list-cars');
App.Views.ListCars  = new ListCarsView;

// App Router
App.Router = Backbone.Router.extend({

  // Route definitions
  routes: {
    '': 'index',
    'user/add(/)': 'addUser',
    'user/:id/edit(/)': 'addUser',
    'user/:id/delete(/)': 'deleteUser',
    'car/add(/)': 'addCar',
    'car/:id/edit(/)': 'addCar',
    'car/:id/delete(/)': 'deleteCar',
    '*actions': 'defaultRoute'
  },

  // Route handlers

  index: function() {
    App.Views.ListUsers.render();
  },

  addUser: function(id) {
    App.Views.UserForm.render(id);
  },

  deleteUser: function(id) {
    var user = userCollection.get(id);

    user.destroy().done(function (user) {
      App.router.navigate('/', { trigger: true })
    });
  },

  addCar: function(id) {
    App.Views.CarForm.render(id);
  },

  deleteCar: function(id) {
    var car = carCollection.get(id);

    user.destroy().done(function (car) {
      App.router.navigate('/', { trigger: true })
    });
  },

  defaultRoute: function(actions) {
    console.log('404');
  }
});

// Initiate the router
App.router = new App.Router;

Backbone.history.start();
