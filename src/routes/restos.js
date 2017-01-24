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
// import createRestosController from "../controllers/restos/create";
// import updateRestosController from "../controllers/restos/update";
// import destroyRestosController from "../controllers/restos/destroy";

let oRouter = new Router();

oRouter.get( "/restos", listRestosController );
oRouter.get( "/restos/:slug", detailsRestosController );
// oRouter.post( "/restos", createRestosController );
// oRouter.patch( "/restos", updateRestosController );
// oRouter.delete( "/restos", destroyRestosController );


export default oRouter;
