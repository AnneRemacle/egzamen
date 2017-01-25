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
                 <i class="fa fa-spinner fa-spin fa-3x fa-fw loading__icon"></i>
                 <p class="loading__text">Chargement de la fiche du Quick</p>
             </div>

             <div class="error" v-if="loaded && error">
                 <p>
                     <strong>Erreur:</strong>
                     {{ error.message }}
                 </p>
             </div>
             <div v-if="loaded" class="content resto">
                 <h2 class="content__title">{{resto.name}}</h2>
                 <address class="resto__infos">
                    <strong class="resto__infos--strong">
                        Adresse&nbsp;:
                    </strong>
                    {{ resto.address }}
                </address>
                <p class="resto__infos">
                    <strong class="resto__infos--strong">
                        Actuellement&nbsp;:
                    </strong>
                    <span v-if="!resto.state" class="item__statut--close">fermé</span>
                    <span v-if="resto.state" class="item__statut--open">ouvert</span>
                </p>

                <div class="hours">
                    <h3 class="hours__title">Heures d'ouverture</h3>
                    <table>
                        <tbody>
                            <tr>
                                <th>Lundi</th>
                                <td>{{ parseFloat(resto.hours[0][0])%1 ? Math.floor(resto.hours[0][0])+":30" : Math.floor(resto.hours[0][0])+":00" }}</td>
                                 &nbsp;-&nbsp;
                                <td>{{ parseFloat(resto.hours[0][1])%1 ? Math.floor(resto.hours[0][1])+":30" : Math.floor(resto.hours[0][1])+":00" }}</td>
                            </tr>
                            <tr>
                                <th>Mardi</th>
                                <td>{{ parseFloat(resto.hours[1][0])%1 ? Math.floor(resto.hours[1][0])+":30" : Math.floor(resto.hours[1][0])+":00" }}</td>
                                 &nbsp;-&nbsp;
                                <td>{{ parseFloat(resto.hours[1][1])%1 ? Math.floor(resto.hours[1][1])+":30" : Math.floor(resto.hours[1][1])+":00" }}</td>
                            </tr>
                            <tr>
                                <th>Mercredi</th>
                                <td>{{ parseFloat(resto.hours[2][0])%1 ? Math.floor(resto.hours[2][0])+":30" : Math.floor(resto.hours[2][0])+":00" }}</td>
                                &nbsp;-&nbsp;
                                <td>{{ parseFloat(resto.hours[2][1])%1 ? Math.floor(resto.hours[2][1])+":30" : Math.floor(resto.hours[2][1])+":00" }}</td>
                            </tr>
                            <tr>
                                <th>Jeudi</th>
                                <td>{{ parseFloat(resto.hours[3][0])%1 ? Math.floor(resto.hours[3][0])+":30" : Math.floor(resto.hours[3][0])+":00" }}</td>
                                &nbsp;-&nbsp;
                                <td>{{ parseFloat(resto.hours[3][1])%1 ? Math.floor(resto.hours[3][1])+":30" : Math.floor(resto.hours[3][1])+":00" }}</td>
                            </tr>
                            <tr>
                                <th>Vendredi</th>
                                <td>{{ parseFloat(resto.hours[4][0])%1 ? Math.floor(resto.hours[4][0])+":30" : Math.floor(resto.hours[4][0])+":00" }}</td>
                                &nbsp;-&nbsp;
                                <td>{{ parseFloat(resto.hours[4][1])%1 ? Math.floor(resto.hours[4][1])+":30" : Math.floor(resto.hours[4][1])+":00" }}</td>
                            </tr>
                            <tr>
                                <th>Samedi</th>
                                <td>{{ parseFloat(resto.hours[5][0])%1 ? Math.floor(resto.hours[5][0])+":30" : Math.floor(resto.hours[5][0])+":00" }}</td>
                                &nbsp;-&nbsp;
                                <td>{{ parseFloat(resto.hours[5][1])%1 ? Math.floor(resto.hours[5][1])+":30" : Math.floor(resto.hours[5][1])+":00" }}</td>
                            </tr>
                            <tr>
                                <th>Dimanche</th>
                                <td>{{ parseFloat(resto.hours[6][0])%1 ? Math.floor(resto.hours[6][0])+":30" : Math.floor(resto.hours[6][0])+":00" }}</td>
                                &nbsp;-&nbsp;
                                <td>{{ parseFloat(resto.hours[6][1])%1 ? Math.floor(resto.hours[6][1])+":30" : Math.floor(resto.hours[6][1])+":00" }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <router-link to="/" class="button btn-left"><i class="fa fa-arrow-left button__left"></i> Retour à la liste</router-link>
             </div>

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
