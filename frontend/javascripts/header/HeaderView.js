define(['marionette', './userbar/UserbarView','./searchbar/SearchbarModel', 
		'./searchbar/SearchbarView', './notification/NotificationIconModel',
		'./notification/NotificationIconView', './hotkeysbar/HotkeysbarView',
		'../app/context'],

function(Marionette, UserbarView, SearchbarModel, SearchbarView, 
			NotificationIconModel, NotificationIconView, HotkeysbarView,
			context){

	HeaderView = Marionette.ItemView.extend({

		template: 	'#header-template',

		childViews:{
			userbar: new UserbarView({
				model: context.currentUserModel
			}),

			searchbar: new SearchbarView({
				model: new SearchbarModel()
			}),

			notificationIcon: new NotificationIconView({
				model: new NotificationIconModel({unread: window._injectedData.user.alerts.length})
			}),

			hotkeysbar: new HotkeysbarView()
		},

		ui: {
			hurriLogo 			: '#hurri-logo',
			userbar	   			: '#userbar',
			searchbar	  		: '#searchbar',
			notificationIcon  	: '#notificationbar',
			hotkeysbar 			: '#hotkeysbar'
		},

		events: {
			//'click @ui.hurriLogo'		: ''
			//'blur @ui.searchbar' : 'alert'
		},

		onRender: function(){
			this.renderChildViews();
		},

		renderChildViews: function(){
			_.each(this.childViews, function(view, el){
				view.render();
				this.ui[el].html(view.$el);
			}, this);
		}

	});
	return HeaderView;
});
