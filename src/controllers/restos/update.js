/* RIA/egzamen
 *
 * /src/controllers/restos/update.js - Controller for resto update
 *
 * coded by Anne
 * started at 24/01/2017
 */

import { ObjectID } from "mongodb";

import getRestos, { checkResto } from "../../models/restos";
import { send, error } from "../../core/utils/api";
import distance from "jeyo-distans";
import checkPosition from "../../core/utils/position";

const MAX_MOVE_DISTANCE = 0.1; // pour ne pas qu'on déplace un resto de plus de 0.1 km

export default function( oRequest, oResponse ) {
    // récupérer les valeurs
    const POST = oRequest.body;

    let oRestoID,
        sAddress = ( POST.address || "" ).trim(),
        aHours = [],
        iLatitude = +POST.latitude,
        iLongitude = +POST.longitude,
        oPosition,
        aModifications = [];

    while( POST.hours.length ){
        aHours.push(POST.hours.splice( 0, 2 ));
    }

    try {
        oRestoID = new ObjectID( oRequest.params.id );
    } catch( oError ) {
        return error( oRequest, oResponse, new Error( "Invalid ID!" ), 400 );
    }

    getRestos()
        .findOne( {
            "_id": oRestoID,
        } )
        .then( ( oResto ) => {
            if ( !oResto ) {
                return new Error( oRequest, oResponse, new Error("Unknown Restaurant!"), 404 );
            }

            if ( iLatitude != null && iLongitude != null ) {
                oPosition = checkPosition( +iLatitude, +iLongitude );

                if ( !oPosition ) {
                    return new Error( oRequest, oResponse, new Error("Invalid position"), 400 );
                }

                if ( oResto.latitude != oPosition.latitude || oResto.longitude != oPosition.longitude ) {
                    if ( distance( oPosition, oResto ) > MAX_MOVE_DISTANCE ) {
                        return error( oRequest, oResponse, new Error("Movement is too big!"), 400 );
                    }
                    oResto.latitude = oPosition.latitude;
                    oResto.longitude = oPosition.longitude;
                    aModifications.push( "latitude", "longitude" );
                }
            }

            if ( sAddress ) {
                oResto.address = sAddress;
                aModifications.push( "address" );
            }

            if ( aHours ) {
                oResto.hours = aHours;
                aModifications.push( "hours" );
            }

            return checkResto( oRestoID )
                .then( () => {
                    let oModificationsToApply = {};

                    if ( aModifications.length === 0 ) {
                        return error( oRequest, oResponse, new Error( "No changes, why did you do that?" ), 400 );
                    }

                    aModifications.forEach( ( sPropertyName ) => {
                        oModificationsToApply[ sPropertyName ] = oResto[ sPropertyName ];
                    } );

                    oModificationsToApply.updated_at = new Date();

                    return getRestos()
                        .updateOne( {
                            "_id": oResto._id,
                        }, {
                            "$set": oModificationsToApply,
                        } )
                        .then( ( { matchedCount, modifiedCount } ) => {
                            if ( matchedCount !== 1 || modifiedCount !== 1 ) {
                                return error( oRequest, oResponse, new Error( "Unknown save error" ), 500 );
                            }

                            return send( oRequest, oResponse, null, 204 );
                        } );
                } );
        } )
        .catch( ( oError ) => error( oRequest, oResponse, oError ) );



}
