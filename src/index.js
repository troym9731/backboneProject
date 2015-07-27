var Backbone = require('backbone');

// App
var App = require('./app');
var userCollection = require('./collections/user');
var carCollection = require('./collections/car');

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

// View: Log In
var LogInView = require('./views/login');
App.Views.LogIn = new LogInView;

// App Router
App.Router = Backbone.Router.extend({

  // Route definitions
  routes: {
    'view/users(/)': 'listUsers',
    'view/products(/)': 'listProducts',
    'user/add(/)': 'addUser',
    'user/:id/edit(/)': 'addUser',
    'user/:id/delete(/)': 'deleteUser',
    'car/add(/)': 'addCar',
    'car/:id/edit(/)': 'addCar',
    'car/:id/delete(/)': 'deleteCar',
    'view/login(/)': 'logIn',
    '*actions': 'defaultRoute'
  },

  // Route handlers

  listUsers: function() {
    App.Views.ListUsers.render();
  },

  listProducts: function() {
    console.log('products');
    App.Views.ListCars.render();
  },

  addUser: function(id) {
    App.Views.UserForm.render(id);
  },

  deleteUser: function(id) {
    var user = userCollection.get(id);

    user.destroy().done(function (user) {
      App.router.navigate('view/users', { trigger: true })
    });
  },

  addCar: function(id) {
    App.Views.CarForm.render(id);
  },

  deleteCar: function(id) {
    var car = carCollection.get(id);
    console.log(car);

    car.destroy().done(function (car) {
      App.router.navigate('view/products', { trigger: true })
    });
  },

  logIn: function() {
    App.Views.LogIn.render();
  }
});

// Initiate the router
App.router = new App.Router;

Backbone.history.start();
