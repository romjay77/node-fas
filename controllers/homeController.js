const helperProvider = require('../helpers/_helperProvider.js');

exports.index = (req, res) => {
	let services = helperProvider.services().services(); 
	let projects = helperProvider.projects().projectSection();
	let model = helperProvider.content().model;
	model.services = services;
	model.projects = projects;

	res.render('index', { model: model });
};

exports.ajaxGallery = (req, res) => {
	let name = req.query.i;
	let project = helperProvider.projects().projects 
	.filter(el => el.name === name)[0];
	res.render('gallery', {
		images: project.images,
		title: name,
		alt: project.alt,
		description: project.description
	});
}