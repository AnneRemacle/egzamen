/* RIA/egzamen
 *
 * /static/modules/components/resto-details.js - Restos details vue component
 *
 * coded by Anne
 * started at 24/01/2017
 */

import Vue from "vue";
import reqwest from "reqwest";

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
                <h2>Détails d'un Quick</h2>
                <p>{{ resto.name }}</p>
                <address>{{ resto.address }}</address>
            </div>
            <router-link to="/">&lsaquo; retour</router-link>
        </div>
    `,
    mounted() {
        console.log( "Détails d'un quick:", this.$route.params.id );
        reqwest( {
            "url": `/restos/${ this.$route.params.is }`,
            "method": "get",
            "data": {},
            "error": ( oError ) => {
                this.loaded = true;
                this.error = oError.message;
            },
            "success": ( oResponse ) => {
                console.log( oResponse );
                this.loaded = true;
                this.terminal = oResponse.data;
            }
        } );
    }
} );

export default oRestoDetails;
