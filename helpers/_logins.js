const path = require('path');
const fs = require('fs');
const cred = credentials();

exports.logIn = (login, pass) => {
	if (cred.login === login && cred.pass === pass) {
			return true;
		}
	return false;
}

exports.credentials = credentials();
function credentials() {
	return JSON.parse(fs.readFileSync(path.resolve('public/area/admin/admin.json')));
}

exports.changeLogin = (data) => {
	let result = cred;

	result.login = data.login;
	result.pass =  data.pass;

	let mail = data.mail;

	if(!Array.isArray(mail)) {
		mail = [data.mail];
	}

	result.mail = mail;
	fs.writeFileSync(path.resolve('public/area/admin/admin.json'), JSON.stringify(result));
	console.log("The file was save!");
}