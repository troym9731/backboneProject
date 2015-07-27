var $ = require('jquery');
var Backbone = require('backbone');
var formTemplate = require('../templates/login.hbs');
var userFormTemplate = require('../templates/user-form.hbs');


/****************************************
  App
*****************************************/

var App = require('../app');

/****************************************
  View: Login Form
*****************************************/

var LogInView = Backbone.View.extend({
  el: $('main'),

  render: function() {
    var output = formTemplate();
    this.$el.html(output);
  },

  events: {
    "submit form.login": "submitForm"
  },

  submitForm: function() {
    var _this = this;
    var formData = {
      name: $('form.login input[name="name"]').val()
    }

    App.Collections.user.fetch().done(function(users) {
      console.log(users);
      users.forEach(function(user) {
        
        if (user.name === formData.name) {
          console.log(user.name);
          console.log(formData.name);
          App.router.navigate('/user/' + user.id + '/edit', { trigger: true });
          return false;
        }

        _this.$el.find('h1').html('User Does Not Exist');

      });
    });

    return false;

  }

});

module.exports = LogInView;