/* RIA/egzamen
 *
 * /src/controllers/system/error.js - Controller for system errors
 *
 * coded by Anne
 * started at 21/01/2017
 */

export default function( oRequest, oResponse ) {
     oResponse.status( 500 ).json( {
         "url": oRequest.url,
         "timestamp": Date.now(),
         "data": false,
         "error": {
             "message": "There's an error here!",
         },
     } );
}
