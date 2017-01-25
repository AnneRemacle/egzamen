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
 import distance from "jeyo-distans";
 import checkPosition from "../../core/utils/position";

 export default function( oRequest, oResponse ) {
     console.log(oRequest.params);
    let sRestoID = ( oRequest.params.id || "" ).trim(),
        oCurrentPosition;

    if ( !sRestoID ) {
        error( oRequest, oResponse, "Invalid ID", 400 );
    }

    oCurrentPosition = checkPosition( +oRequest.query.latitude, +oRequest.query.longitude );

    getRestos()
        .findOne( {
            "_id": new ObjectID( sRestoID ),
            "deleted_at": null,
        } )
        .then( ( oResto ) => {
            if ( !oResto ) {
                return error( oRequest, oResponse, "Unknown Restaurant", 404 );
            }

            let { _id, name, latitude, longitude, address, hours } = oResto,
                oCleanResto,
                iCurrentDay = new Date().getDay(),
                iCurrentHour = new Date().getHours() + ( new Date().getMinutes() / 60 );

            oCleanResto = {
                "id" : _id,
                "state": (iCurrentHour >= hours[ iCurrentDay ][0] && iCurrentHour <= hours[ iCurrentDay ][1]),
                name, latitude, longitude, address, hours,
            };

            if ( oCurrentPosition ) {
                oCleanResto.distance = distance( oCurrentPosition, oCleanResto ) * 1000
            }

            send( oRequest, oResponse, oCleanResto )
        } )
        .catch( ( oError ) => error( oRequest, oResponse, oError ) );
 }
