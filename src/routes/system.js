/* RIA/egzamen
 *
 * /src/routes/system.js - System routes
 *
 * coded by Anne
 * started at 21/10/2017
 */

 import { Router } from "express";

 import sysPingController from "../controllers/system/ping.js";

 let oRouter = new Router();

 oRouter.get( "/sys/ping", sysPingController );
 // oRouter.get( "/sys/echo" );
 // oRouter.get( "sys/error" );

 export default oRouter;
