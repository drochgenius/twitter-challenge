var Backbone = require('backbone');
var ColumnView = require('../views/columns.js');

module.exports = Backbone.Router.extend({
	routes: {
		'': 'root'
	},
	
	root: function() {
		new ColumnView();
	}
});