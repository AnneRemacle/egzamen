/* RIA/egzamen
 *
 * /static/modules/components/secret.js - Secret Vue component
 *
 * coded by Anne
 * started at 24/01/2017
 */

import Vue from "vue";

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
