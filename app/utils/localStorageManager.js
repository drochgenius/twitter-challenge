// This module manages local data storage for persistence
function supports_html5_storage() {
	try {
		return 'localStorage' in window && window.localStorage !== null;
	} catch (e) {
		return false;
	}
}

function localStorageInstance() {
	return window.localStorage;
}

module.exports = {
	get: function(key, isArray) {
		if (supports_html5_storage()) {
			if (isArray && localStorageInstance().getItem(key)) {
				return localStorageInstance().getItem(key).split(',');
			} else {
				return localStorageInstance().getItem(key);
			}
		} else {
			return false;
		}
	},

	set: function(key, value) {
		if (supports_html5_storage()) {

			localStorageInstance().setItem(key, value);
			return this;
		} else {
			return false;
		}
	}
};