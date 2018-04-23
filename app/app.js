var app = angular.module("app", ["ngRoute"]);

app.config(function($routeProvider){
    $routeProvider
    .when("/",{
        templateUrl:"app/persons/personsView.html",
        controller: "personsCtrl"
    })
    .otherwise({
        redirectTo :"/"
    });
})