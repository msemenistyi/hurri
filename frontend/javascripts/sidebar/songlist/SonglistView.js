define(['marionette', '../../app/context', '../../shared/playlist/PlaylistModel', '../../app/routes'], 
	function(Marionette, context, playlistModel, router){
	var SonglistView = Marionette.ItemView.extend({
		className: 'song-item',
  		template : '#song-item-template',

		events : {
		 	'click .delete-song-from-list'  : 'deleteSong',
			'click .add-song-to-queue' : 'addSongToQueue',
			'dblclick .sidebar-song-cover' : 'playSong',
			'click a[href^="/"]' : 'showAuthor'
		 },
		
		modelEvents : {
		 	'change:current' : 'changeCurrent',
		 	'change:queuepos' : 'render'
		},

		ui : {
			song : '.sidebar-song-wrap'
		},

		bindListeners: function(){
		},

		playSong: function(){
			

			for (var i = 0; i < this.model.collection.length; i++){
				if (this.model.cid === context.currentSongCollection.models[i].cid){
					Backbone.trigger('songlist-view:play-song', i);
					if (context.radio.playing)
						Backbone.trigger('sidebar:play-track', {id:this.model.attributes._id, radio: context.radio.id});
					break;
				}
			}	
		},
		showAuthor: function(event){
			event.preventDefault();
    		router.navigate(event.currentTarget.attributes.href.value, true);
		},

		deleteSong: function(){
		 	context.currentSongCollection.remove(this.model);
		 	Backbone.trigger('admin:delete-track-from-list', {radio:context.radio.id, id: this.model.get('_id')});
		 },

		addSongToQueue: function(){
			if(this.model.get('queuepos') === ''){		
				this.model.set({queuepos : this.setQueuepos()});
			} else {
				Backbone.trigger('queue-recount', this.model.get('queuepos'));
			}
		},

		setQueuepos : function (){
			if(playlistModel.get('queueNum') === 0){
				for (var i = 0; i < this.model.collection.length; i++){
					if (context.currentSongCollection.models[i].get('_id') == context.currentSongModel.get('_id')){
						context.queueSavedSong = i;
						break;
					}
				}			
			}
			var queue = playlistModel.get('queueNum') + 1;
			playlistModel.set({queueNum : queue});
			return queue;
		},

		addSongToCollection: function(){

		},

		changeCurrent: function(){
			var current = this.model.get('current');
		 	this.ui.song.toggleClass('activesong', current);	
		 	if (current) {
		 		this.trigger('change-current', {top: this.$('.activesong').position().top});
		 	}	
		},

		onRender: function(){
  			this.changeCurrent();
  			this.bindListeners();
  		}
	});
	return SonglistView;
});
