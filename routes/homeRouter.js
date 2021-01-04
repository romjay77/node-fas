const express = require("express");
const homeController = require("../controllers/homeController");
const homeRouter = express.Router();

 

homeRouter.get("/", homeController.index);
homeRouter.get("/ajaxGallery", homeController.ajaxGallery);

module.exports = homeRouter;