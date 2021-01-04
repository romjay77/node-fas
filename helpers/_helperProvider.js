const projects = '../helpers/_projects.js';
const services = '../helpers/_services.js';
const logins = '../helpers/_logins.js';
const sender = '../helpers/_sender.js';
const content = '../helpers/_content.js';

require(projects);
require(services);
require(logins);
require(sender);
require(content);

exports.projects = () => {
    let result = require.cache[require.resolve(projects)];
    if(result === undefined) {
        result = require(projects);
        return result;
    } else {
        return result.exports;
    }
}

exports.services = () => {
    let result = require.cache[require.resolve(services)];
    if(result === undefined) {
        result = require(services);
        return result;
    } else {
        return result.exports;
    }
}

exports.logins = () => {
    let result = require.cache[require.resolve(logins)];
    
    if(result === undefined) {
        result = require(logins);
        return result;
    } else {
        return result.exports;
    }
}

exports.sender = () => {
    let result = require.cache[require.resolve(sender)];

    if(result === undefined) {
        result = require(sender);
        return result;
    } else {
        return result.exports;
    }
}

exports.content = () => {
    let result = require.cache[require.resolve(content)];

    if(result === undefined) {
        result = require(content);
        return result;
    } else {
        return result.exports;
    }
}

exports.reload = (module) => {
    delete require.cache[require.resolve(module)];
    require(module);
}