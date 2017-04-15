angular.module('lawsasa', [
    'ngMaterial',
    'ui.router',

    'app.MainCtrl',
    'app.HomeCtrl',
    'app.LoginCtrl',
    'app.SignupCtrl'



    // Services


    // Filters

])
// Constants
    .constant('myConfig', {
        BASE_API: window.location.origin + "/"
    })

    // loading defaults
    .run(['$rootScope', '$state', '$location', '$stateParams','$q', '$timeout',  function ($rootScope, $state, $location, $stateParams,  $q, $timeout) {

        $rootScope.previousState = '';
        $rootScope.currentState = '';

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        // When ever a page changes
        $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
            $rootScope.previousState = from.name;
            $rootScope.currentState = to.name;
            $rootScope.returnToStateParams = fromParams.id;
            console.log('current state: ' + $rootScope.currentState);

        });


        $rootScope.$on("$routeChangeError", function (event, next, previous, error) {
            // We can catch the error thrown when the $requireSignIn promise is rejected
            // and redirect the user back to the home page
            console.log(error);

        });


    }
    ])
    .config(['$stateProvider', '$urlMatcherFactoryProvider', '$urlRouterProvider',  '$locationProvider', 'myConfig',  function ( $stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider,  $locationProvider, myConfig) {


        // Case insensitive urls
        $urlMatcherFactoryProvider.caseInsensitive(true);

        // Remove the Hashbang from url
        $locationProvider.hashPrefix('');

        //configure default route
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state({
                name: 'main',
                abstract: true,
                templateUrl: 'app/templates/main.html',
                controller: 'MainCtrl'
            })
            // Welcome
            .state({
                name: 'main.home',
                title: 'Home',
                url: '/',
                templateUrl: 'app/templates/home.html',

                controller: 'HomeCtrl',
                hasHero: true
            })
            // Login
            .state({
                name: 'main.login',
                url: '/login',
                templateUrl: 'app/templates/login.html',
                controller: 'LoginCtrl'

            })
            // Signup
            .state({
                name: 'main.signup',
                url: '/signup',
                templateUrl: 'app/templates/signup.html',

                controller: 'SignupCtrl'
            })

    }]);
