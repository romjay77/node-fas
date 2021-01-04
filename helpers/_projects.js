const path = require('path');
const fs = require('fs');
const rimraf = require("rimraf");

class Project {
	constructor(name, text, description, alt, images) {
		this.name = name;
		this.text = text;
		this.description = description;
		this.alt = alt;
		this.images = images;
	}
}

const projects = GetProjects();

exports.projectSection = () => {
	let result = '';
	for(let j = 0; j < projects.length; j++) {
		result += `<div class="project"><div class="title">Смотреть альбом</div><a id="${projects[j].name}" 
		class="link"><img class="img" src="${projects[j].images[0]}" alt="${projects[j].description}"></a></div>`;
	};

	return result;
}

exports.projects = projects;

exports.removeProject = (nameProject) => {
	let name = nameProject.replace(/\s/g, '');
	rimraf.sync(path.resolve(`public/area/projects/${ name }`));
}

exports.addProject = (body, files) => {
	let nameDir = body.name.replace(/\s/g, '');
	let lPath = `public/area/projects/${ nameDir }`;

	if (!fs.existsSync(lPath)){
		fs.mkdirSync(lPath);
		let result = addProject(lPath, body, files);
		fs.writeFileSync(path.resolve(`${lPath}/project.json`), JSON.stringify(result));
		console.log("The file was save!");
	}
}

function addProject(path, body, files) {
	let result = new Object();
	result['header'] = body.name;
	result['description'] = body.description;
	result['alt'] = body.alt;
	let namePhotos = [];
	if(Array.isArray(files.photo)) {
		files.photo.forEach(element => {
			let pathtoImg = `${path}/${element.name}`;
			namePhotos.push(pathtoImg.replace('public/', ''));
			if(!fs.existsSync(pathtoImg)) {
				element.mv(pathtoImg, (err) => {
					if(err) console.log(err);
					else console.log('photo saved!');
				});
			}
		});
	} else {
		let pathtoImg = `${path}/${files.photo.name}`;
		namePhotos.push(pathtoImg.replace('public/', ''));
		if(!fs.existsSync(pathtoImg)) {
			files.photo.mv(pathtoImg, (err) => {
				if(err) console.log(err);
				else console.log('photo saved!');
			});
		}
	}

	result['imgs'] = namePhotos;
	return result;
}

function GetProjects() {
	let projects = [];
	fs.readdirSync(path.resolve('public/area/projects'))
	.forEach(dir => {
		projects.push(GetProject(dir));
	});
	return projects;
}

function GetProject(dir) {
	let locPath = `area/projects/${dir}/`;
	let = prj = JSON.parse(fs.readFileSync(path.resolve(`public/${locPath}project.json`)));
	return new Project(prj.header, dir, prj.description, prj.alt, prj.imgs);
}