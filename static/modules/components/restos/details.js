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
                 <p>Heures d'ouverture</p>
                 <ul>
                    <li>Lundi&nbsp;: {{ parseFloat(resto.hours[0][0])%1 ? Math.floor(resto.hours[0][0])+":30" : Math.floor(resto.hours[0][0])+":00" }} - {{ parseFloat(resto.hours[0][1])%1 ? Math.floor(resto.hours[0][1])+":30" : Math.floor(resto.hours[0][1])+":00" }}</li>
                    <li>Mardi&nbsp;: {{ parseFloat(resto.hours[1][0])%1 ? Math.floor(resto.hours[1][0])+":30" : Math.floor(resto.hours[1][0])+":00" }} - {{ parseFloat(resto.hours[1][1])%1 ? Math.floor(resto.hours[1][1])+":30" : Math.floor(resto.hours[1][1])+":00" }}</li>
                    <li>Mercredi&nbsp;: {{ parseFloat(resto.hours[2][0])%1 ? Math.floor(resto.hours[2][0])+":30" : Math.floor(resto.hours[2][0])+":00" }} - {{ parseFloat(resto.hours[2][1])%1 ? Math.floor(resto.hours[2][1])+":30" : Math.floor(resto.hours[2][1])+":00" }}</li>
                    <li>Jeudi&nbsp;: {{ parseFloat(resto.hours[3][0])%1 ? Math.floor(resto.hours[3][0])+":30" : Math.floor(resto.hours[3][0])+":00" }} - {{ parseFloat(resto.hours[3][1])%1 ? Math.floor(resto.hours[3][1])+":30" : Math.floor(resto.hours[3][1])+":00" }}</li>
                    <li>Vendredi&nbsp;: {{ parseFloat(resto.hours[4][0])%1 ? Math.floor(resto.hours[4][0])+":30" : Math.floor(resto.hours[4][0])+":00" }} - {{ parseFloat(resto.hours[4][1])%1 ? Math.floor(resto.hours[4][1])+":30" : Math.floor(resto.hours[4][1])+":00" }}</li>
                    <li>Samedi&nbsp;: {{ parseFloat(resto.hours[5][0])%1 ? Math.floor(resto.hours[5][0])+":30" : Math.floor(resto.hours[5][0])+":00" }} - {{ parseFloat(resto.hours[5][1])%1 ? Math.floor(resto.hours[5][1])+":30" : Math.floor(resto.hours[5][1])+":00" }}</li>
                    <li>Dimanche&nbsp;: {{ parseFloat(resto.hours[6][0])%1 ? Math.floor(resto.hours[6][0])+":30" : Math.floor(resto.hours[6][0])+":00" }} - {{ parseFloat(resto.hours[6][1])%1 ? Math.floor(resto.hours[6][1])+":30" : Math.floor(resto.hours[6][1])+":00" }}</li>
                 </ul>
             </div>
             <router-link to="/">&lsaquo; retour</router-link>
         </div>
     `,
     mounted() {
        this.fetchInfos( this.$route.params.id );
     },
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
                .then( ( oResponse ) => {
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
