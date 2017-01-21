/* RIA/egzamen
 *
 * /src/controllers/system/ping.js
 *
 * coded by Anne
 * started at 21/01/2017
 */

import { send } from "../../core/utils/api";

export default function( oRequest, oResponse ) {
     send( oRequest, oResponse, true );
}
