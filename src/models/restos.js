/* RIA/egzamen
 *
 * /src/models/restos.js - Model for restaurants
 *
 * coded by Anne
 * started at 21/01/2017
 */

 import { db } from "../core/mongodb";

export default function() {
    return db.collection( "restos" );
}
