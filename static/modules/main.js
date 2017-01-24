/* RIA/egzamen
 *
 * /static/modules/main.js - Maint entry file
 *
 * coded by Anne
 * started at 24/01/2017
 */

import Vue from "vue";
import VueRouter from "vue-router";

Vue.use( VueRouter );

import RestosList from "./components/restos/list";
import RestoDetails from "./components/restos/details";

let oRouter = new VueRouter( {
    "routes": [
        { "path": "/", "component": RestosList },
        { "path": "/:id", "component": RestoDetails },
    ],
} );

let oApp = new Vue( {
    "template": `
        <div class="wrapper">
            <header>
                <h1>Egzamen</h1>
            </header>
            <main>
                <router-view></router-view>
            </main>
            <footer>
                <small>Codé par Anne <a href="https://www.github.com/AnneRemacle/egzamen">Voir le code</a></small>
            </footer>
        </div>
    `,
    "router": oRouter,
} );

oApp.$mount( "#app" );
