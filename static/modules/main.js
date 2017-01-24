/* RIA/egzamen
 *
 * /static/modules/main.js - Maint entry file
 *
 * coded by Anne
 * started at 24/01/2017
 */

import Vue from "vue";

let oApp = new Vue( {
    "template": `
    <div class="box">
            <p>{{ message }}</p>
            <ul>
                <li v-for="cat in cats">
                    <strong>{{ cat.name }}</strong>
                    <span>( {{ cat.age }} )</span>
                </li>
            </ul>
            <p v-if="secret">I'm a cat person!</p>
            <button v-on:click="revealSecret">{{ reveal.value }}</button>
        </div>
    `,
    "data": {
        "message": "Coucou les gens!",
        "secret": false,
        "cats": [
            { "name":"Argus", "age": "4" },
            { "name": "Mickey", "age": "8" }
        ],
        "reveal": {
            "show": "Reveal my secret!",
            "hide": "Hide my secret!",
            "value": "Reveal my secret",
        },
    },
    "methods": {
        "revealSecret": function() {
            this.secret = !this.secret;
            this.reveal.value = this.secret ? this.reveal.hide : this.reveal.show;
        },
    },
} );

oApp.$mount( "#app" );
