define(['backbone'], function(Backbone){
	var SongModel = Backbone.Model.extend({
		defaults:{
			_id: undefined,
			id: undefined,
			title : 'Song isn\'t playing',
			duration : undefined,
			position : 0,
			release_date : new Date(1),
			kbps : 320,
			lyrics : 'No lyrics for this song. Sorry.',
			albumTitle : 'AlbumName',
			albumCover: '/images/default/cover.png',
			album: {cover : '/images/default/cover.png'},
			singer: { name : 'Artist'},
			url: undefined,
			comments : [''],
			queuepos : '',
			liked: false,
			likedId: [],
			current : false,
			modelType : 'song'
		},
		initialize: function(){
			var singer = this.get('singer');
			if (singer === null){
				this.set('singer', {name : ''});
			}
			
			this.on('change:liked', function(){
				var type = this.get('liked') ? 'PUT' : 'DELETE';
				$.ajax({
					type: type,
					dataType: "json", 
					url:'/api/like/' + this.get('_id') + '/' + window._injectedData.user._id
				});
			});
		},

		likeState : function(){
			if (!this.get('liked')){
				this.set({liked: true});
			} else {
				this.set({liked: false});
			}
			return this.get('liked');
		},

		getStream: function(){
			var self = this;
			var url = this.get('url');
				if (!url){
					$.getJSON('/getStream',{query: self.get('title') + ' ' + self.get('singer')}, function(data){
						self.set({url: data.url, duration: data.duration});
					});
		 		}

			return self.get('url');
		}
	});
	return SongModel;
});