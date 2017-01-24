/* RIA/egzamen
 *
 * /src/models/restos.js - Model for restaurants
 *
 * coded by Anne
 * started at 21/01/2017
 */

import Promise from "bluebird";
import { db } from "../core/mongodb";
import { ObjectID } from "mongodb";

let fCheckResto;

fCheckResto = function( sRestoID ) {
    let oRestoID;

    if ( !sRestoID ) {
        return Promise.resolve( false );
    }

    try {
        oRestoID = new ObjectID( sRestoID );
    } catch( oError ) {
        return Promise.reject( new Error( "Invalid resto ID!" ) );
    }

    return db.collection( "restos" )
        .findOne( {
            "_id": oRestoID,
        } )
        .then( ( oResto ) => {
            if ( oResto ) {
                return Promise.resolve( true );
            }

            return Promise.reject( new Error( "Unknown Restaurant!" ) );
        } );
};

export default function() {
    return db.collection( "restos" );
};

export {
    fCheckResto as checkResto,
};
