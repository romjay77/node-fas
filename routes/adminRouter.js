const express = require("express");
const adminController = require("../controllers/adminController");
const helperProvider = require('../helpers/_helperProvider.js');

const adminRouter = express.Router();

var session;

adminRouter.get("/", (req, res) => {
    session = req.session;
    if(session.login){
        return adminController.index(req, res);
    } else {
        return adminController.login(req, res);
    }
});

adminRouter.post("/", (req, res) => {
    session = req.session;
    session.login = helperProvider.logins().logIn(req.body.login, req.body.pass);
    res.redirect('/admin');
});
adminRouter.post("/changeLogin", adminController.changeLogin);
adminRouter.post("/removeProject", adminController.removeProject);
adminRouter.post("/addProject", adminController.addProject);
adminRouter.post("/updateModel", adminController.updateModel);
adminRouter.post("/removeService", adminController.removeService);
adminRouter.post("/addService", adminController.addService);
adminRouter.post("/removeQestion", adminController.removeQestion);
adminRouter.post("/addQestion", adminController.addQestion);
adminRouter.post("/removeAdvantage", adminController.removeAdvantage);
adminRouter.post("/addAdvantage", adminController.addAdvantage);
adminRouter.post("/logOut", adminController.logOut); 

module.exports = adminRouter;