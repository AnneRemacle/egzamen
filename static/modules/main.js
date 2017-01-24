/* RIA/egzamen
 *
 * /static/modules/main.js - Maint entry file
 *
 * coded by Anne
 * started at 24/01/2017
 */

import Vue from "vue";

Vue.component( "cats-list", {
    "props": [ "elements" ],
    "template": `
        <ul>
            <li v-for="elt in elements">
                <strong>{{ elt.name }}</strong>
                <span>( {{ elt.age }} )</span>
            </li>
        </ul>
    `,
} );

Vue.component( "secret", {
    "props": [ "content" ],
    "data": function() {
        return {
            "reveal": {
                "show": "Reveal my secret!",
                "hide": "Hide my secret!",
                "value": "Reveal my secret",
            },
            "state": false,
        };
    },
    "template": `
        <div>
            <button v-on:click="revealSecret">{{ reveal.value }}</button>
            <p v-if="state">{{ content }}</p>
        </div>
    `,
    "methods": {
        "revealSecret": function() {
            this.state = !this.state;
            this.reveal.value = this.state ? this.reveal.hide : this.reveal.show;
        },
    },
} );

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
