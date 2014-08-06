define(['marionette', './AuthView'], function(Marionette, AuthView){
 	var HeaderRegion = Marionette.Region.extend({
  		template: '#auth-template',
  		el: '#header'
 	});
 
headerRegion = new HeaderRegion();
var authView = new AuthView();
headerRegion.show(authView);
});