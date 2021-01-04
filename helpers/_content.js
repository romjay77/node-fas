const path = require('path');
const fs = require('fs');

exports.updateModel = body => {
	let model = getModel();
	let result = body;
	result.faq = model.faq;
	result.advantages = model.advantages;

	setModel(result);
}

exports.model = getModel();

function getModel() {
	return JSON.parse(fs.readFileSync(path.resolve(`public/area/site.json`)));
}

function setModel(model) {
	fs.writeFileSync(`public/area/site.json`, JSON.stringify(model));
	console.log("The file has been saved!");
}

exports.removeQestion = question => {
	let model = getModel();
	model.faq = model.faq.filter(x => x.question !== question);

	setModel(model);
}

exports.addQestion = body => {
	let model = getModel();
	model.faq.push({
		question: body.question,
		answer: body.answer
	});

	setModel(model);
}

exports.removeAdvantage = name => {
	let model = getModel();
	model.advantages = model.advantages.filter(x => x.name !== name);

	setModel(model);
}

exports.addAdvantage = (body, files) => {
	let imagePath = `area/advantages/${ files.image.name }`;

	if (!fs.existsSync(`public/${ imagePath }`)) {
		files.image.mv(`public/${ imagePath }`, (err) => {
			if(err) console.log(err);
			else console.log('the photo has been saved!');
		});
	}

	let adnatage = {
		name: body.name,
		image: imagePath,
		alt: body.alt
	}
	let model = getModel();	
	model.advantages.push(adnatage);

	setModel(model);
}