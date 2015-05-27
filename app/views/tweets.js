var fs = require('fs');
var Backbone = require('backbone');
var Mustache = require('mustache'); // Use the Mustache templating engine
var $ = require('jquery');
var Storage = require('../utils/localStorageManager');
var TweetsCollection = require('../collections/tweets.js');
var template = fs.readFileSync(__dirname + '/templates/tweets.mu', {
  encoding: 'utf8'
});
var defaultTheme = 'primary';
var defaultTweetCount = 30;


module.exports = Backbone.View.extend({
  template: template,

  render: function() {
    console.log("Launching rendering", this.viewModel, this.$el[0].innerHTML);
    this.$el[0].innerHTML = Mustache.to_html(this.template, this.viewModel);
  },

  change: function(event) {
    var target = event.target;
  },
  
  initialize: function(options) {
    this.theme = refreshTheme();
    this.setupThemeControls();
    this.setupCountControls();

    this.model = new TweetsCollection();
    this.model.account = options.accountName;
    this.model.count = refreshCount();
    console.log("Creating the View", this.model.account);
    this.el = options.el;

    this.listenTo(this.model, 'reset', this.update, this);
    this.model.fetch({
      reset: true
    });
  },

  update: function() {
    this.viewModel = {
      user: this.model.account,
      theme: this.theme,
      items: this.model.toJSON()
    };

    console.log("update function", this);
    this.render();
  },

  onChangeTheme: function(newTheme) {
    $('#theme-' + this.theme).removeClass('button-selected');
    console.log('onChangeTheme', newTheme);
    Storage.set('theme', newTheme);
    this.theme = refreshTheme();
    this.update();
  },

  setupThemeControls: function() {
    $('#theme-primary').on('click', this.onChangeTheme.bind(this, 'primary'));
    $('#theme-info').on('click', this.onChangeTheme.bind(this, 'info'));
    $('#theme-danger').on('click', this.onChangeTheme.bind(this, 'danger'));
  },

  onChangeCount: function(newCount) {
    $('#count-' + this.model.count).removeClass('button-selected');
    console.log('onChangeCount', newCount);
    Storage.set('tweetCount', newCount);
    this.model.count = refreshCount();
    this.model.fetch({
      reset: true
    });
  },

  setupCountControls: function() {
    [1, 5, 10, 20, 30].forEach(function(i) {
      $('#count-' + i).on('click', this.onChangeCount.bind(this, i));
    }, this);
  }

});

function refreshTheme() {
  var theme = Storage.get('theme') || defaultTheme;
  $('#theme-' + theme).addClass('button-selected');
  return theme;
}

function refreshCount() {
  var count = Storage.get('tweetCount') || defaultTweetCount;
  $('#count-' + count).addClass('button-selected');
  return count;
}