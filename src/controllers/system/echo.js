/* RIA/egzamen
 *
 * /src/controllers/system/echo.js
 *
 * coded by Anne
 * started at 21/01/2017
 */

export default function( oRequest, oResponse ) {
     let sEcho = oRequest.query.echo || "coucou!";

     oResponse.send( {
         "url": oRequest.url,
         "timestamp": Date.now(),
         "data": sEcho,
         "error": false,
     } );
 }
