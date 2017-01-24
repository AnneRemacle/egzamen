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

 let oRestosList = Vue.component( "restos-list", {
     "data": function() {
         return {
             "loaded": false,
             "restos": [],
             "error": null,
         };
     },
     "template": `
         <div class="restos-list">
             <div class="loading" v-if="!loaded">
                 <p>Loading…</p>
             </div>
             <div class="error" v-if="loaded && error">
                 <p>
                     <strong>Error: </strong>
                     {{ error }}
                 </p>
             </div>
             <ul v-if="loaded">
                 <li v-for="elt in restos">
                     <router-link :to="'/'+ elt.id">
                         <strong>{{ restos.name }}</strong>
                         <address>{{ elt.address }}</address>
                         <span v-if="!elt.state">fermé</span>
                         <span v-if="elt.state">ouvert</span>
                         <span class="distance">{{ elt.distance }}m</span>
                     </router-link>
                 </li>
             </ul>
         </div>
     `,
     mounted() {
        this.updateRestos();
     },
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
                .then( ( oResponse ) => {
                    let oResto = oResponse.data;

                    this.loaded = true;
                    this.restos = oResto;
                } )
                .catch( this.showError );
         },
         showError( { message } ) {
             console.log(message);
             this.loaded = true;
             this.error = message;
         },

     },
 } );

 export default oRestosList;
