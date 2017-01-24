/* RIA/egzamen
 *
 * /src/controllers/restos/details.js - Controller for restaurants details
 *
 * coded by Anne
 * started at 24/01/2017
 */

 import getRestos from "../../models/restos";
 import { send, error } from "../../core/utils/api";
 import { ObjectID } from "mongodb";

 export default function( oRequest, oResponse ) {
     console.log(oRequest.params);
    let sRestoID = ( oRequest.params.id || "" ).trim(),
        oCurrentPosition;

    if ( !sRestoID ) {
        error( oRequest, oResponse, "Invalid ID", 400 );
    }

    getRestos()
        .findOne( {
            "_id": new ObjectID( sRestoID ),
            "deleted_at": null,
        } )
        .then( ( { _id, name, latitude, longitude, address, hours } ) => {
            let oCleanResto;

            if ( !_id ) {
                return error( oRequest, oResponse, "Unknown Restaurant", 404 );
            }

            oCleanResto = {
                "id" : _id,
                name, latitude, longitude, address, hours,
            };

            send( oRequest, oResponse, oCleanResto )
        } )
        .catch( ( oError ) => error( oRequest, oResponse, oError ) );
 }
