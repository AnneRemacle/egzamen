/* RIA/egzamen
 *
 * /src/models/restos.js - Model for restaurants
 *
 * coded by Anne
 * started at 21/01/2017
 */

 import { db } from "../core/mongodb";

 let oRestos = db.collection( "restos" );

 export default oRestos;
