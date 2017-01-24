/* RIA/egzamen
 *
 * /src/controllers/restos/create.js - Create restaurant controller
 *
 * coded by Anne
 * started at 24/01/2017
 */

import Promise from "bluebird";
import { ObjectID } from "mongodb";

import getRestos from "../../models/restos";
import { send, error } from "../../core/utils/api";
import checkPosition from "../../core/utils/position";

export default function( oRequest, oResponse ) {

    const POST = oRequest.body;

    let iLatitude = +POST.latitude,
        iLongitude = +POST.longitude,
        sName = ( POST.name || "" ).trim(),
        sAddress = ( POST.address || "" ).trim(),
        oPosition = checkPosition( iLatitude, iLongitude ),
        sSlug = ( POST.name || "" ).trim()
                .replace( " ", "-" )
                .toLowerCase(),
        aHours = [],
        oResto;

    while( POST.hours.length ){
        aHours.push(POST.hours.splice( 0, 2 ));
    }

    if ( !oPosition ) {
        return error( oRequest, oResponse, "Invalid position!", 400 );
    }

    oResto = {
        "latitude": oPosition.latitude,
        "longitude": oPosition.longitude,
        "created_at": new Date(),
        "updated_at": new Date(),
    }

    sName && ( oResto.name = sName );
    sSlug && ( oResto.slug = sSlug );
    sAddress && ( oResto.address = sAddress );
    aHours && ( oResto.hours = aHours );

    getRestos()
        .insertOne( oResto )
        .then( () => {
            send( oRequest, oResponse, oResto, 201 );
        } )
        .catch( ( oError ) => error( oRequest, oResponse, oError ) );

}
