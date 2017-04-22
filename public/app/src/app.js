angular.module('gpp',
    [
        'ui.router',
        'ngMaterial',
        'angular-loading-bar',
        'restangular',
        'ngMdIcons',
        'toastr',
        'ngAnimate',
        'angular.filter',
        'md.data.table',
        'LocalStorageModule',

        'mainModule',
        'homeModule',
        'dashboardModule',
        'loginModule',
        'usersModule',
        'termModule',


        'app.userService',
        'app.termService'

    ])
// Constants
    .constant('myConfig', {
        BASE_API: window.location.origin + "/"
    })

    // loading defaults
    .run(['$rootScope', '$state', '$location', '$stateParams',  function ($rootScope, $state, $location, $stateParams) {

        $rootScope.previousState = '';
        $rootScope.currentState = '';

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
            $rootScope.previousState = from.name;
            $rootScope.currentState = to.name;
            $rootScope.returnToStateParams = fromParams.id;
            $rootScope.hasHeader = to.hasHeader;
            $rootScope.hasSidebar = to.hasSidebar;
            $rootScope.title = to.title;
            console.log('current state: ' + $rootScope.currentState);

        });


        $rootScope.$on("$routeChangeError", function (event, next, previous, error) {
            // We can catch the error thrown when the $requireSignIn promise is rejected
            // and redirect the user back to the home page
            console.log(error);

        });
    }
    ])
    .config(['cfpLoadingBarProvider', '$stateProvider', '$urlMatcherFactoryProvider', '$urlRouterProvider', 'RestangularProvider', 'toastrConfig', '$locationProvider', 'myConfig', function (cfpLoadingBarProvider, $stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider, RestangularProvider, toastrConfig, $locationProvider, myConfig) {


        // Default Toast configs
        angular.extend(toastrConfig, {
            autoDismiss: false,
            containerId: 'toast-container',
            maxOpened: 0,
            newestOnTop: true,
            positionClass: 'toast-top-right',
            preventDuplicates: false,
            preventOpenDuplicates: false,
            target: 'body'
        });


        // Remove loading bar spinner
        cfpLoadingBarProvider.includeSpinner = false;
        // Case insensitive urls
        $urlMatcherFactoryProvider.caseInsensitive(true);
        // Set app BASEURL
        RestangularProvider.setBaseUrl(myConfig.BASE_API + '/api');
        RestangularProvider.addResponseInterceptor(function (data, operation) {
            var extractedData;

            if (operation === "getList") {
                extractedData = data.data;
            } else {
                extractedData = data;
            }
            return extractedData;
        });

        // Remove the Hashbang from url
        $locationProvider.hashPrefix('');

        //configure default route
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state({
                name: 'main',
                abstract: true,
                views: {

                    main_view:  {
                        templateUrl: 'app/src/components/main/views/main.html',
                        controller: 'mainCtrl'
                    }
                }
            })

            // Welcome
            .state({
                name: 'main.home',
                title: 'Home',
                url: '/',
                templateUrl: 'app/src/components/home/views/home.html',
                hasHeader:true,
                hasSidebar:false,
                controller: 'homeCtrl'
            })
            // Dashboard
            .state({
                name: 'main.dashboard',
                title: 'Dashboard',
                url: '/dashboard',
                templateUrl: 'app/src/components/dashboard/views/dashboard.html',
                hasHeader:true,
                hasSidebar:true,
                controller: 'dashboardCtrl'
            })
            // Login
            .state({
                name: 'main.login',
                title: 'Login',
                url: '/login',
                templateUrl: 'app/src/components/login/views/login.html',
                hasHeader:false,
                hasSidebar:false,
                controller: 'loginCtrl'
            })

            // Term
            .state({
                name: 'main.terms',
                title: 'Manage Terms',
                url: '/manage/terms',
                templateUrl: 'app/src/components/terms/views/manageTerms.html',
                hasHeader:true,
                hasSidebar:true,
                controller: 'termsCtrl'
            })

            // Term
            .state({
                name: 'main.newTerm',
                title: 'New Term',
                url: '/manage/terms/add-new',
                templateUrl: 'app/src/components/terms/views/addTerm.html',
                hasHeader:true,
                hasSidebar:true,
                controller: 'termsCtrl'
            })


            // 404
            .state({
                name: 'main.404',
                title: '404',
                url: '/404',
                templateUrl: 'build/views/404.html'
            });


    }]);
