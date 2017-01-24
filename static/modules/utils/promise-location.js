/* RIA/egzamen
 *
 * /static/modules/utils/promise-location.js - Promised geolocation
 *
 * coded by Anne
 * started at 24/01/2017
 */

 import Promise from "bluebird";

 const DEFAULT_OPTIONS = { "enableHighAccuracy": true };x

export default function( oOptions = {} ) {
    return new Promise( ( fResolve, fError ) => {
        navigator.geolocation.getCurrentPosition( fResolve, fError, Object.assign( {}, DEFAULT_OPTIONS, oOptions ) );
    } );
}
