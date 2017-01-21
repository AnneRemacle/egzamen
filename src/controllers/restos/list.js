/* RIA/egzamen
 *
 * /src/controllers/restos/list.js - Controllers for restaurants' list
 *
 * coded by Anne
 * started at 21/01/2017
 */

import getRestos from "../../models/restos";
import { send, error } from "../../core/utils/api";

export default function( oRequest, oResponse ) {

 getRestos()
    .find()
    .toArray()
    .then( ( aRestos ) => {
         send( oRequest, oResponse, aRestos );
    } )
    .catch( ( oError ) => error( oRequest, oResponse, oError ) );
}
