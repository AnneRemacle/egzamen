/* RIA/egzamen
 *
 * /src/controllers/restos/destroy.js - Delete resto controllers
 *
 * coded by Anne
 * started at 24/01/2017
 */

import { ObjectID } from "mongodb";
import { send, error } from "../../core/utils/api";
import getRestos from "../../models/restos";

export default function( oRequest, oResponse ) {
    let oRestoID;

    try {
        oRestoID = new ObjectID( oRequest.params.id );
    } catch ( oError ) {
        return error( oRequest, oResponse, new Error( "Invalid ID!", 400 ) )
    }

    getRestos()
        .deleteOne( {
            "_id": oRestoID,
        } )
        .then( ( { deletedCount } ) => {
            if ( deletedCount === 1 ) {
                return send( oRequest, oResponse, null, 204 );
            }

            return error( oRequest, oResponse, "Unknown deleteion error", 500 );
        } )
        .catch( ( oError ) => error( oRequest, oResponse, oError ) );
}
