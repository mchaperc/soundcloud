import Ember from 'ember';

export default Ember.Component.extend({

	init: function() {
		this._super();
		SC.get('/tracks/word', {limit: 1}, function(song) {
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
					this.set('sound', sound);
				  	this.sound.play();
				  	var ms = this.sound._player._currentPosition,
					   min = Math.floor(ms/1000/60),
					   sec = ('0' +(ms/1000) % 60).slice(-2);
				  	this.set('current_time', ''+min + ':' + sec);
				  	var ms = this.sound._player._duration - this.sound._player._currentPosition,
					   min = Math.floor(ms/1000/60),
					   sec = Math.floor(('0' +(ms/1000) % 60).slice(-2));
				  	this.set('time_left', ''+min + ':' + sec);
				}.bind(this));
				$('.play-logo > .fa-play-circle-o').hide();
				$('.play-logo > .fa-pause').show();
				this.set('haveSong', true);
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
		},
		volumeUp: function() {
			if (volume === 1) {
				return false;
			} else {
				var volume = this.sound.getVolume();
				this.sound.setVolume(volume + .1);
				console.log(this.sound.getVolume());
			}
		},
		volumeDown: function() {
			if (volume < 0.1) {
				return false;
			} else {
				var volume = this.sound.getVolume();
				this.sound.setVolume(volume-.1);
				console.log(this.sound.getVolume());
			}
		},
		replay: function() {
			this.get('sound').stop();
			SC.stream(("/tracks/" + this.get('id')), function(sound){
				this.set('sound', sound);
			  	this.sound.play();
			  	var ms = this.sound._player._currentPosition,
					   min = Math.floor(ms/1000/60),
					   sec = ('0' +(ms/1000) % 60).slice(-2);
				  	this.set('current_time', ''+min + ':' + sec);
				  	var ms = this.sound._player._duration - this.sound._player._currentPosition,
					   min = Math.floor(ms/1000/60),
					   sec = Math.floor(('0' +(ms/1000) % 60).slice(-2));
				  	this.set('time_left', ''+min + ':' + sec);
			}.bind(this));
			$('.play-logo > .fa-play-circle-o').hide();
			$('.play-logo > .fa-pause').show();
			this.set('haveSong', true);
		}
	}

});