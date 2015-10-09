/* global requirejs */
// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.

console.log("app.js: starting");

requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../app'
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
console.log("app.js: requirejs app/main");
requirejs(['app/main']);
