/* RIA/egzamen
 *
 * /static/modules/components/cats-list.js - cats list Vue component
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
