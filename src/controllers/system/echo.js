/* RIA/egzamen
 *
 * /src/controllers/system/echo.js
 *
 * coded by Anne
 * started at 21/01/2017
 */

import { send } from "../../core/utils/api";

export default function( oRequest, oResponse ) {
     let sEcho = oRequest.query.echo || "coucou!";

     send( oRequest, oResponse, sEcho );
 }
