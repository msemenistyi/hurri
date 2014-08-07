var groupRepository = require('../repositories/groupRepository');
var _ = require('underscore');

module.exports = function(app){
	app.get('/api/group/:id/members', function(req, res, next){
		groupRepository.getMembers(req.params.id, function(data){
			var status = _.isEmpty(data) ? 400 : 200;
			res.status(status).json(data);
		});
	});

	app.get('/api/group/:id/tracks', function(req, res, next){
		groupRepository.getTracks(req.params.id, function(data){
			var status = _.isEmpty(data) ? 400 : 200;
			res.status(status).json(data);
		});
	});

	app.post('/api/group', function(req, res, next){
		groupRepository.add(req.body, function(err, data){
			var status = err ? 400 : 201;
			res.status(status).json(data);
		});
	});

	app.put('/api/group/:id', function(req, res, next){
		groupRepository.update(req.params.id, req.body, function(err, data){
			var status = err ? 400 : 200;
			res.status(status).json(data);
		});
	});

	app.put('/api/group/:id/listeners', function(req, res, next){
		groupRepository.updateListeners(req.params.id, req.body, function(err, data){
			var status = err ? 400 : 200;
			res.status(status).json(data);
		});
	});
	
	app.delete('/api/group/:id', function(req, res, next){
		groupRepository.delete(req.params.id, function(err, data){
			var status = err ? 400 : 200;
			res.status(status).json(data);
		});
	});
};