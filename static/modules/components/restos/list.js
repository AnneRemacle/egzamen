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
                 <p>Chargement…</p>
             </div>
             <div class="error" v-if="loaded && error">
                 <p>
                     <strong>Erreur: </strong>
                     {{ error }}
                 </p>
             </div>
             <div v-if=loaded class="content">
                <h2 class="content__title">Les Quicks proches de vous</h2>
                 <ul class="list">
                     <li v-for="elt in restos" class="list__item item">
                         <router-link :to="'/'+ elt.id">
                             <strong class="item__name">{{ elt.name }}</strong>
                             <address class="item__address">{{ elt.address }}</address>
                             <p class="item__statut">
                                Ce Quick est actuellement&nbsp:
                                 <span v-if="!elt.state" class="item__statut--open">fermé</span>
                                 <span v-if="elt.state" class="item__statut--close">ouvert</span>
                             </p>
                             <span class="item__distance">Il se trouve à {{ elt.distance }}m de vous</span>
                         </router-link>
                     </li>
                 </ul>
            </div>
            <div class="map" id="gmap">
            </div>
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
