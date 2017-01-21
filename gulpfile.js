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
     gBabel = require( "gulp-babel" ),
     gUtil = require( "gulp-util" ),
     Mongo = require( "mongodb" ),
     ObjectID = Mongo.ObjectID,
     MongoClient = Mongo.MongoClient;

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
        .pipe( gulp.dest( "bin" ) );
} );

gulp.task( "reset-db", function( fNext ){
     // 1. Check if INSIDE vagrant
    if ( process.env.USER !== "vagrant" ) {
        gUtil.beep();
        gUtil.log( gUtil.color.pink( "This task must be runned from INSIDE the vagrant box!" ) );
        return fNext();
    }
    // Connect to the MongoDB
    MongoClient.connect( "mongodb://127.0.0.1:27017/egzamen", function( oError, oDB ){

        if ( oError ) {
            gUtil.beep();
            return fNext( oError );
        }

    } );

     // 2. drop database
    oDB.dropDatabase()
      .then( function(){
          // 3. parse & fill export.json
          var aRestos = require( __dirname + "/data/export.json" );

          return oDB.collection( "restos" ).insertMany( aRestos );
      } )
      .then( function(){
          oDB.close();
          gUtil.log( gUtil.colors.green( "Database has been reset Mouahaha!" ) );
          fNext();
      } )
      .catch( function( oError ){
         //If error => desconnect the DB
         oDB.close();
         fNext( oError );
      } )
} );

// La tâche watch: pour que gulp "regarde" les fichiers listés dedans et suive les modifications
gulp.task( "watch", function() {
    gulp.watch( "src/**/*.js", [ "build" ] );
} );

// La tâche défault, on lui donne toutes les tâches qu'on veut qui soient effectuées quand on tape juste "gulp"
gulp.task( "default", [ "build" ] );

// La tâche work, on y liste les tâches qui doivent être réalisées quand on tape "gulp work"
gulp.task( "work", [ "build", "watch" ] );
