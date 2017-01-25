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
            <header class="header">
                <h1 class="header__title">
                    Egzamen
                    <span class="header__title--small">
                        Une app pour trouver des Quick
                    </span>
                </h1>
            </header>
            <main>
                <router-view></router-view>
            </main>
            <footer class="footer">
                <small class="footer__text">
                    Codé par Anne
                    <a class="footer__link" href="https://www.github.com/AnneRemacle/egzamen">
                        Voir le repo Github <i class="fa fa-github fa-2x footer__link--github"></i>
                    </a>
                </small>
            </footer>
        </div>
    `,
    "router": oRouter,
} );

oApp.$mount( "#app" );
