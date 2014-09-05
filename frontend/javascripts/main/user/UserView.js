define(['marionette'], function(Marionette){

	UserView = Marionette.ItemView.extend({

		template: 	'#user-template',
		
		ui: {
   			avatar	: '#avatar',
   			name	: '#name',
   			age		: '#age',
   			email	: '#email',
   			country	: '#country',
   			addVk	: '#addVk',
   			addTw	: '#addTw',
   			addFb	: '#addFb'

  		},

		events: {
			'click @ui.addVk': 'addVkUser',
			'click @ui.addTw': 'addTwUser',
			'click @ui.addFb': 'addFbUser'
		},
		onRender: function(){
			if (window._injectedData.user.fbToken) {
				this.ui.addFb.addClass('disabled');
			}
			if (window._injectedData.user.vkToken) {
				this.ui.addVk.addClass('disabled');
			}
			if (window._injectedData.user.twToken) {
				this.ui.addTw.addClass('disabled');
			}
		},
		addVkUser: function(){
			this.render();
		},
		addTwUser: function(){
			this.render();
		},
		addFbUser: function(){
			this.render();
		}
	});
	return UserView;
});