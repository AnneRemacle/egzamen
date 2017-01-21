/* RIA - egzamen
 *
 * /gulpfile.js - gulp tasks
 *
 * coded by Anne
 * started at 18/01/2017
 */

 "use strict";

 var
     gulp = require( "gulp" ),
     gEslint = require( "gulp-eslint" ),
     gBabel = require( "gulp-babel" );

// La tâche lint: pour que le linter soit actif et nous signale nos erreurs dans le code
gulp.task( "lint", function() {
    return gulp
        .src( "src/**/*.js" )
        .pipe( gEslint() )
        .pipe( gEslint.format() );
} );

// La tâche build: parce qu'on est trop de bêêêtes en anglais, on sait que build ça veut dire construire. Du coup, cette tâche va être utilisée pour prendre les fichiers javascript du dossier src et les transpiler de ES2015 à ES5 dans le dossier bin/views
gulp.task( "build", function() {
    return gulp
        .src( "src/**/*.js" )
        .pipe( gBabel() )
        .pipe( gulp.dest( "bin/views" ) );
} );

// La tâche watch: pour que gulp "regarde" les fichiers listés dedans et suive les modifications
gulp.task( "watch", function() {
    gulp.watch( "src/**/*.js", [ "build" ] );
} );

// La tâche défault, on lui donne toutes les tâches qu'on veut qui soient effectuées quand on tape juste "gulp"
gulp.task( "default", [ "build" ] );

// La tâche work, on y liste les tâches qui doivent être réalisées quand on tape "gulp work"
gulp.task( "work", [ "build", "watch" ] );
