/* RIA/egzamen
 *
 * /static/modules/components/restos/list - Restos list Vue component
 *
 * coded by Anne
 * started at 24/01/2017
 */

 import Vue from "vue";
 import reqwest from "reqwest";
 import getLocation from "../../utils/location-manager.js";

 let oRestosList = Vue.component( "terminals-list", {
     "data": function() {
         return {
             "loaded": true,
             "restos": [],
             "error": null,
         };
     },
     "template": `
         <div class="restos-list">
             <div class="loading" if="!loaded">
                 <p>Loading…</p>
             </div>
             <div class="error" v-if="loaded && error">
                 <p>
                     <strong>Error: </strong>
                     {{ error.message }}
                 </p>
             </div>
             <ul v-if="loaded">
                 <li v-for="elt in restos">
                     <router-link:to"'/'+ elt.id">
                         <strong>{{ restos.name }}</strong>
                         <address>{{ elt.address }}</address>
                         <span class="distance">{{ elt.distance }}m</span>
                     </router-link>
                 </li>
             </ul>
         </div>
     `,
     "methods": {
         updateRestos() {
             return getLocation()
                .then( ( { coords } ) => {
                    return reqwest( {
                        "url": "/restos",
                        "method": "get",
                        "data": {
                            "latitude": coords.latitude,
                            "longitude": coords.longitude,
                        },
                    } );
                } )
                .then( () => {
                    this.loaded = true;
                } )
                .catch( this.showError );
         },
         showError( { message } ) {
             this.loaded = true;
             this.error = message;
         },

     },
 } );

 export default oRestosList;
