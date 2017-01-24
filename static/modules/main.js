/* RIA/egzamen
 *
 * /static/modules/main.js - Maint entry file
 *
 * coded by Anne
 * started at 24/01/2017
 */

import Vue from "vue";

import "./components/cats-list";
import "./components/secret";


let oApp = new Vue( {
    "template": `
    <div class="box">
            <p>{{ message }}</p>
            <cats-list v-bind:elements="cats"></cats-list>
            <secret v-bind:content="secret"></secret>
        </div>
    `,
    "data": {
        "message": "Coucou les gens!",
        "secret": "I don't like dogs",
        "cats": [
            { "name":"Argus", "age": "4" },
            { "name": "Mickey", "age": "8" }
        ],
    },
} );

oApp.$mount( "#app" );
