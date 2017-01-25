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
                 <i class="fa fa-spinner fa-spin fa-3x fa-fw loading__icon"></i>
                 <p class="loading__text">Un instant, recherche en cours</p>
             </div>
             <div class="error" v-if="loaded && error">
                 <p class="error__text">
                     <strong class="error__strong">Erreur: </strong>
                     {{ error }}
                 </p>
             </div>
             <div v-if=loaded class="content">
                <h2 class="content__title">Les Quicks proches de vous</h2>
                 <ul class="list clearfix">
                     <li v-for="elt in restos" class="list__item item">
                        <span class="item__distance">{{ elt.distance }}m</span>
                         <router-link :to="'/'+ elt.id" class="item__link">
                             <strong class="item__name">{{ elt.name }}</strong>
                             <address class="item__address">{{ elt.address }}</address>
                             <p class="item__statut">
                                Ce Quick est actuellement&nbsp:
                                 <span v-if="!elt.state" class="item__statut--close">fermé</span>
                                 <span v-if="elt.state" class="item__statut--open">ouvert</span>
                             </p>
                             <p class="item__more">Voir les infos <i class="fa fa-arrow-right"></i></p>
                         </router-link>
                     </li>
                 </ul>

            </div>
            <div class="map" id="gmap"></div>

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
