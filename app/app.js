var Backbone = require('backbone');
Backbone.$ = require('jquery');
var Router = require('./routers/router.js');

new Router();

Backbone.$(function() {
	Backbone.history.start();
});