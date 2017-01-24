/* RIA/egzamen
 *
 * /src/controllers/restos/list.js - Controllers for restaurants' list
 *
 * coded by Anne
 * started at 21/01/2017
 */

import getRestos from "../../models/restos";
import { send, error } from "../../core/utils/api";
import distance from "jeyo-distans";
import checkPosition from "../../core/utils/position";

const ARC_KILOMETER = 0.009259,
    DEFAULT_RADIUS = 5,
    MAX_RADIUS = 20;

export default function( oRequest, oResponse ) {

    let oCurrentPosition = checkPosition( +oRequest.query.latitude, +oRequest.query.longitude ),
        iSearchRadius = +oRequest.query.radius;

    if ( !oCurrentPosition ) {
        return error( oRequest, oResponse, "Invalid Position!", 400 );
    }

    if ( isNaN( iSearchRadius ) ) {
        iSearchRadius = DEFAULT_RADIUS;
    }
    if ( iSearchRadius < DEFAULT_RADIUS ) {
        iSearchRadius = DEFAULT_RADIUS;
    }
    if ( iSearchRadius > MAX_RADIUS ) {
        iSearchRadius = MAX_RADIUS;
    }

    iSearchRadius *= ARC_KILOMETER;

    getRestos()
        .find( {
            "latitude": {
                "$gt": oCurrentPosition.latitude - iSearchRadius,
                "$lt": oCurrentPosition.latitude + iSearchRadius,
            },
            "longitude": {
                "$gt": oCurrentPosition.longitude - iSearchRadius,
                "$lt": oCurrentPosition.longitude + iSearchRadius,
            },
            "deleted_at": null,
        })
        .toArray()
        .then( ( aRestos = [] ) => {
             let aCleanRestos,
                 iCurrentDay = new Date().getDay(),
                 iCurrentHour = new Date().getHours() + ( new Date().getMinutes() / 60 );

             aCleanRestos = aRestos.map( ( { _id, name, slug, latitude, longitude, address, hours } ) => {
                 return {
                    "id": _id,
                    "state": (iCurrentHour >= hours[ iCurrentDay ][0] && iCurrentHour <= hours[ iCurrentDay ][1]),
                    "distance": distance( oCurrentPosition, { latitude, longitude } ) * 1000,
                    name, latitude, longitude, address, hours
                 }
             } );

            // On trie les restos selon la distance à laquelle ils se trouvent
             aCleanRestos.sort( ( oRestoOne, oRestoTwo ) => oRestoOne.distance - oRestoTwo.distance );
             send( oRequest, oResponse, aCleanRestos );
        } )
        .catch( ( oError ) => error( oRequest, oResponse, oError ) );
}
