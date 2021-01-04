const path = require('path');
const fs = require('fs');
const rimraf = require("rimraf");

const services = getServices();

exports.rawServices = services;

exports.services = () => {
	let section = '';
	for(let j = 0; j < services.length; j++) {
		section += `<div class="service"><div><img src="${ services[j].image }"
		alt="${ services[j].alt }"><div><h3>${ services[j].name }
		</h3><div>${ services[j].description }</div></div></div></div>`;
	};
	return section;
}

exports.removeService = serviceName => {
	let name = serviceName.replace(/\s/g, '');
	rimraf.sync(path.resolve(`public/area/services/${ name }`));
}

exports.addService = (body, files) => {
	let nameDir = body.name.replace(/\s/g, '');
	let dir = `public/area/services/${ nameDir }`;

	let result = {
		name: body.name,
		description: body.description,
		alt: body.alt,
		image: `area/services/${ nameDir }/${ files.image.name }`
	};

	if (fs.existsSync(dir)) return;
	fs.mkdirSync(dir);
	
	files.image.mv(`public/${ result.image }`, (err) => {
		if(err) console.log(err);
		else console.log('the photo has been saved!');
	});
	
	fs.writeFileSync(path.resolve(`${dir}/service.json`), JSON.stringify(result));
	console.log("The file has been saved!");
}

function getServices() {
	let servises = [];
	fs.readdirSync(path.resolve('public/area/services'))
	.forEach(dir => {
		servises.push(getService(dir));
	});

	return servises;
}

 function getService(dir) {
	return JSON.parse(fs.readFileSync(path.resolve(`public/area/services/${dir}/service.json`)));
}