/* RIA/egzamen
 *
 * /src/routes/system.js - System routes
 *
 * coded by Anne
 * started at 21/10/2017
 */

import { Router } from "express";

import sysPingController from "../controllers/system/ping.js";
import sysEchoController from "../controllers/system/echo.js";
import sysErrorController from "../controllers/system/error.js";

let oRouter = new Router();

oRouter.get( "/sys/ping", sysPingController );
oRouter.get( "/sys/echo", sysEchoController );
oRouter.get( "sys/error", sysErrorController );

export default oRouter;
