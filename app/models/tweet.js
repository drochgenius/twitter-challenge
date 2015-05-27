var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
	defaults: {
		"user": "",
		"date": null,
		"url": "",
		"content": ""
	}
});

