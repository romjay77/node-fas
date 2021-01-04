const helperProvider = require('../helpers/_helperProvider.js');


exports.index = function(req, res) {
	res.render('admin', {
		admin: helperProvider.logins().credentials,
		projects: helperProvider.projects().projects,
		services: helperProvider.services().rawServices,
		model: helperProvider.content().model
	  });
};

exports.login = function(req, res) {
	res.render('login');
};

exports.changeLogin = function(req, res) {
	helperProvider.logins().changeLogin(req.body);
	helperProvider.reload('../helpers/_logins.js');
	res.redirect('/admin');
};

exports.removeProject = function(req, res) {
	helperProvider.projects().removeProject(req.body.projectName);
	helperProvider.reload('../helpers/_projects.js');
	res.redirect('/admin');
};

exports.addProject = function(req, res) {
	helperProvider.projects().addProject(req.body, req.files);
	helperProvider.reload('../helpers/_projects.js');
	res.redirect('/admin');
};

exports.updateModel = function(req, res) {
	helperProvider.content().updateModel(req.body);
	helperProvider.reload('../helpers/_content.js');
	res.redirect('/admin');
};

exports.removeService = function(req, res) {
	helperProvider.services().removeService(req.body.serviceName);
	helperProvider.reload('../helpers/_services.js');
	res.redirect('/admin');
};

exports.addService = function(req, res) {
	helperProvider.services().addService(req.body, req.files);
	helperProvider.reload('../helpers/_services.js');
	res.redirect('/admin');
};

exports.removeQestion = function(req, res) {
	helperProvider.content().removeQestion(req.body.question);
	helperProvider.reload('../helpers/_content.js');
	res.redirect('/admin');
};

exports.addQestion = function(req, res) {
	helperProvider.content().addQestion(req.body, req.files);
	helperProvider.reload('../helpers/_content.js');
	res.redirect('/admin');
};

exports.removeAdvantage = function(req, res) {
	helperProvider.content().removeAdvantage(req.body.name);
	helperProvider.reload('../helpers/_content.js');
	res.redirect('/admin');
};

exports.addAdvantage = function(req, res) {
	helperProvider.content().addAdvantage(req.body, req.files);
	helperProvider.reload('../helpers/_content.js');
	res.redirect('/admin');
};

exports.logOut = function(req, res) {
	session = req.session;
	session.login = false;
	res.redirect('/');
};