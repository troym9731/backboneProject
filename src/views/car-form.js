var $ = require('jquery');
var Backbone = require('backbone');
var formTemplate = require('../templates/car-form.hbs');


/****************************************
  App
*****************************************/

var App = require('../app');
var Car = require('../models/car.js');

/****************************************
  View: Car Form
*****************************************/

var CarFormView = Backbone.View.extend({
  el: $(".panel > div"),
  editMode: false,

  render: function (carId) {
    var _this = this;
    this.editMode = !!carId;

    // Display form in Create Mode
    if (!this.editMode) {
      var output = formTemplate();
      this.$el.html(output);

    // Display form in Update Mode
    } else {
      var car = this.car = new Car({ id: carId });

      car.fetch().done(function () {
        var output = formTemplate(car.toJSON());
        _this.$el.html(output);
      });
    }
  },

  events: {
    "submit form.car": "submitForm"
  },

  submitForm: function () {
    // Collect Form Data
    var formData = {
      make: $('form.car input[name="make"]').val(),
      model: $('form.car input[name="model"]').val(),
      img: $('form.car input[name="image"]').val(),
      price: $('form.car input[name="price"]').val(),
      horsepower: $('form.car input[name="horsepower"]').val()
    };
    
    console.log("I clicked the button")
     
    // Add Mode (Create User)
    if (!this.editMode) {

      // Only set the image on add mode
      // formData.img = 'http://robohash.org/'+ Date.now().toString(16) + '.png'

      App.Collections.car.create(formData, {
        success: function () {
          App.router.navigate('view/products', { trigger: true });
        }
      });

    // Edit Mode (Update car)
    } else {
      this.car.set(formData);
      this.car.save().done(function () {
        App.router.navigate('view/products', { trigger: true });
      });
    }

    // Prevent Default
    return false;

  }
});

module.exports = CarFormView;
