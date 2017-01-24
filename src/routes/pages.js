/* RIA/egzamen
 *
 * /src/routes/pages.js - Pages routes
 *
 * coded by Anne
 * started at 24/01/2017
 */

import { Router } from "express";

import homepageController from "../controllers/pages/home";

let oRouter = new Router();

oRouter.get( "/", homepageController );

export default oRouter;
