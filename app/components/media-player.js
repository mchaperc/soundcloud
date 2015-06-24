import Ember from 'ember';

export default Ember.Component.extend({

	init: function() {
		this._super();
		SC.get('/tracks/fancy', {limit: 1}, function(song) {
			this.set('song', song);
			this.set('id', song.id);
			console.log(song);
		}.bind(this));
		this.set('current_time', '0:00');
		this.set('time_left', '0:00');
	},

	haveSong: false,

	actions: {
		playSong: function() {
			if (!this.haveSong) {
				SC.stream(("/tracks/" + this.get('id')), function(sound){
					this.sound = sound;
				  	this.sound.play();
				  	this.set('current_time', this.sound._player._currentPosition);
				  	this.set('time_left', this.sound._player._duration - this.sound._player._currentPosition);
				}.bind(this));
				$('.play-logo > .fa-play-circle-o').hide();
				$('.play-logo > .fa-pause').show();
				this.haveSong = true;
			} else {
				this.get('sound').play();
				$('.play-logo > .fa-play-circle-o').hide();
				$('.play-logo > .fa-pause').show();
			}
		},
		pauseSong: function() {
			this.get('sound').pause();
			$('.play-logo > .fa-pause').hide();	
			$('.play-logo > .fa-play-circle-o').show();
		}
	}

});