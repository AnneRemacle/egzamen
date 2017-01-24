/* RIA/egzamen
 *
 * /static/modules/components/restos-list.js - Restos list Vue component
 *
 * coded by Anne
 * started at 24/01/2017
 */

 import Vue from "vue";
 import reqwest from "reqwest";

 const GEOLOCATION_OPTIONS = { "enableHighAccuracy": true };

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
             navigator.geolocation.getCurrentPosition( this.geoSuccess, this.showError, GEOLOCATION_OPTIONS );
         },
         geoSuccess( { coords } ) {
             console.log( "posisiton:", coords );
             reqwest( {
                 "url": "/restos",
                 "method": "get",
                 "data": {
                     "latitude": coords.latitude,
                     "longitude": coords.longitude,
                 },
                 "success": this.ajaxSuccess,
                 "error": this.showError,
             } );
         },
         ajaxSuccess( oResponse ) {
             console.log( "response:", oResponse );
             thid.loaded = true;
             this.restos = oResponse.data;
         },
         showError( oError ) {
             this.loaded = true;
             this.error = oError;
         },
     },
 } );

export default oRestosList;
