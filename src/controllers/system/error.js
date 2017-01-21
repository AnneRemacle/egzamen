/* RIA/egzamen
 *
 * /src/controllers/system/error.js - Controller for system errors
 *
 * coded by Anne
 * started at 21/01/2017
 */

import { error } from "../../core/utils/api";

export default function( oRequest, oResponse ) {
     error( oRequest, oResponse, { "message": "There's an error here!" } );
}
