var Backbone = require('backbone');
var $ = require('jquery');
var TweetList = require('./tweets.js');
var Storage = require('../utils/localStorageManager.js');
var DnD = require('../utils/dnd.js');
var defaultAccounts = 'AppDirect,laughingsquid,techcrunch'.split(',');


module.exports = Backbone.View.extend({
	el: '.row',
	editSettings: false,

	initialize: function() {
		this.accounts = refreshAccounts();

		$('.toggle-settings').click(this.toggleSettings.bind(this));

		this.viewModel = this.accounts.map(function(item, index) {
			return new TweetList({
				el: '#col' + index,
				accountName: item
			});
		});

		DnD.init('.row .col-sm-4', this.onDragAndDropEnd.bind(this));
	},

	render: function() {
		this.viewModel.forEach(function(view) {
			view.update();
		});
	},

	toggleSettings: function() {
		this.editSettings = !this.editSettings;
		console.log("toggleSettings", this.editSettings);

		if (this.editSettings) {
			$('.settings').show();
		} else {
			$('.settings').hide();
		}
	},

	onDragAndDropEnd: function() {
		console.log("Calling onDragAndDropEnd");

		// Compute the new column order and store in localStorage
		var nodes = document.querySelectorAll('.row .col-sm-4 .twitter-user');
		var accounts = [].map.call(nodes, function(node) {
			return node.innerHTML.replace('@', '');
		});

		console.log("ACCOUNTS", accounts);

		// Persist the column order in localStorage
		Storage.set('accounts', accounts);

		// Refresh the current ordering state from localStorage
		this.accounts = refreshAccounts();
	}

});

function refreshAccounts() {
	return Storage.get('accounts', true) || defaultAccounts;
}