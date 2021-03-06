/* RIE/egzamen
 *
 * /src/routes/restos.js - API Routes for restaurants
 *
 * coded by Anne
 * started at 21/01/2017
 */

import Router from "express";
import listRestosController from "../controllers/restos/list";
import detailsRestosController from "../controllers/restos/details";
import createRestosController from "../controllers/restos/create";
import updateRestosController from "../controllers/restos/update";
import destroyRestosController from "../controllers/restos/destroy";

let oRouter = new Router();

oRouter.get( "/restos", listRestosController );
oRouter.get( "/restos/:id", detailsRestosController );
oRouter.post( "/restos", createRestosController );
oRouter.patch( "/restos/:id", updateRestosController );
oRouter.delete( "/restos/:id", destroyRestosController );


export default oRouter;
