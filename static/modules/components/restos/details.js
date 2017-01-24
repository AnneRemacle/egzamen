/* RIA/egzamen
 *
 * /static/modules/components/restos/details - Restos details Vue component
 *
 * coded by Anne
 * started at 24/01/2017
 */

 import Vue from "vue";
 import reqwest from "reqwest";
 import getLocation from "../../utils/location-manager.js";

 let oRestoDetails = Vue.component( "restos-details", {
     "data": function() {
         return {
             "loaded": false,
             "resto": {},
             "error": null,
         };
     },
     "template": `
         <div class="resto-details">
             <div class="loading" v-if="!loaded">
                 <p>Loading…</p>
             </div>

             <div class="error" v-if="loaded && error">
                 <p>
                     <strong>Error:</strong>
                     {{ error.message }}
                 </p>
             </div>
             <div v-if="loaded">
                 <h2>{{resto.name}}</h2>
                 <address>{{ resto.address }}</address>
                 <p>{{ resto.hours }}</p>
             </div>
             <router-link to="/">&lsaquo; retour</router-link>
         </div>
     `,
     "methods": {
         fetchInfos( sRestoID ) {
             return getLocation()
                .then( ( { coords } ) => {
                    return reqwest( {
                        "url": `/restos/${ sRestoID }`,
                        "method": "get",
                        "data": {
                            "latitude": coords.latitude,
                            "longitude": coords.longitude,
                        },
                    } );
                } )
                then( ( oResponse ) => {
                    let oResto = oResponse.data;

                    this.loaded = true;
                    this.resto = oResto;
                } )
                .catch( this.showError );
         },
         showError( { message } ) {
             this.loaded = true;
             this.error = message;
         },
     },
} );

export default oRestoDetails;
