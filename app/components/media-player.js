import Ember from 'ember';

export default Ember.Component.extend({

	init: function() {
		this._super();
		SC.get('/tracks/fancy', {limit: 1}, function(song) {
			this.set('song', song);
			console.log(song);
		}.bind(this));
	}

});