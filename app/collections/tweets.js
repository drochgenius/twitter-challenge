var Backbone = require('backbone');
var Tweet = require('../models/tweet.js');
var moment = require('moment');
var linkify = require('linkifyjs/string');

module.exports = Backbone.Collection.extend({
	model: Tweet,
	proxyRoot: 'twitter-proxy.php',

	endpoint: function() {
		return encodeURIComponent('statuses/user_timeline.json?screen_name=' + this.account + '&count=' + this.count);
	},
	
	url: function() {
		return this.proxyRoot + '?url=' + this.endpoint();
	},
	
	parse: function(response) {
		return response.map(mapTweets);
	}
});

function mapTweets(item) {
	return {
		user: item.user.name,
		date: moment(item.created_at).format('LLLL'),
		url: "https://twitter.com/" + item.user.screen_name + "/status/" + item.id_str,
		text: formatTweetContent(item.text)
	};
}

function formatTweetContent(content) {
	return linkify(content, {
		defaultProtocol: 'https',
		target: "_blank"
	}).replace('&amp;', '&');
}