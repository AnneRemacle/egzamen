/* RIE/egzamen
 *
 * /src/core/mongodb.js - Connector for mongodb
 *
 * coded by Anne
 * started at 21/01/2017
 */

 import { MongoClient } from "mongodb";
 import Promise from "bluebird";
 import zouti from "zouti";

 const MONGO_URL = "mongodb://127.0.0.1:27017/egzamen";

 let oDB,
    fInit;

fInit = function() {
    return new Promise( ( fResolve, fReject ) => {
        MongoClient.connect( MONGO_URL, ( oError, oLinkedDB ) => {
            if ( oError ) {
                return fReject( oError );
            }
            zouti.success( "Connected to DB youpii", "egzamen" );
            fResolve( oDB = oLinkedDB );
        } );
    } );
};

export {
    fInit as init,
    oDB as db,
};
