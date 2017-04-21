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
                hasSidebar:true,
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


            // 404
            .state({
                name: 'main.404',
                title: '404',
                url: '/404',
                templateUrl: 'build/views/404.html'
            });


    }]);

(function () {
    angular
        .module('mainModule', [])
        .controller('mainCtrl', mainCtrl);

    // mainCtrl.js
    function mainCtrl ($scope,$state, $rootScope, $mdSidenav,$mdComponentRegistry ) {



        $scope.logout = function () {
            // userService.logout();
            // $rootScope.isAuthenticated=null;
            $state.go('main.login');
        };
        $scope.refresh = function () {
            // $scope.currentToken = userService.getCurrentToken();
        };
        $scope.posts = [];
        $scope.currentToken='';
        //$scope.refresh();

        // Sidenav toggle
        $rootScope.toggleSidenav = function(menuId) {


            $mdSidenav(menuId).toggle();
            if(menuId === 'left')
                $scope.openInfo = !$scope.openInfo;

        };



        // Menu items
        $scope.menu = [
            {
                link: 'main.dashboard',
                title: 'Dashboard',
                icon: 'dashboard'
            },
            {
                link: 'main.reports',
                title: 'reports',
                icon: 'person'
            }
        ];
    }
})();

(function () {
    angular
        .module('homeModule',[])
        .controller('homeCtrl',homeCtrl);
    function homeCtrl($scope,termService) {

        $scope.doSearch = function (term) {
            termService.searchForTerm(term,function (response) {
                console.log(response.data);
            },function (errors) {
                console.log(errors);
            });


        };
    }
})();

(function () {
    angular
        .module('loginModule', [])
        .controller('loginCtrl', loginCtrl);
    function loginCtrl() {
        console.log('login page');
    }
})();
angular.module('usersModule',[])
    .controller('usersCtrl',[]);
(function () {
    angular
        .module('dashboardModule',[])
        .controller('dashboardCtrl',dashboardCtrl);
    function dashboardCtrl($rootScope) {

        console.log('we are at dashboard');
    }

})();

angular.module('app.userService', [])
    .factory('userService', [ 'localStorageService', '$rootScope', 'Restangular', function (localStorageService, $rootScope, Restangular) {
        function checkIfLoggedIn() {
            return localStorageService.get('token');
        }

        function signup(name, email, password, onSuccess, onError) {

            $http.post('/api/auth/signup',
                {
                    name: name,
                    email: email,
                    password: password
                }).
            then(function (response) {

                localStorageService.set('token', response.data.token);
                onSuccess(response);

            }, function (response) {

                onError(response);

            });

        }

        function login(email, password, onSuccess, onError) {

            Restangular.all('authenticate')
                .post(
                    {
                        email: email,
                        password: password
                    })
                .then(
                    function (response) {
                        localStorageService.set('token', response.token);
                        onSuccess(response);
                    }, function (response) {

                        onError(response);

                    });

        }

        function logout() {

            localStorageService.remove('token');

        }

        function getCurrentToken() {
            return localStorageService.get('token');
        }

        function getAuthenticatedUser(onSuccess, onError){

            Restangular.one('authenticated_user').get().then(function(response){

                onSuccess(response.user);

            }, function(response){

                onError(response);

            });

        }

        function getAll(onSuccess, onError){
            Restangular.all('users').getList().then(function(response){
                onSuccess(response);
            }, function(){
                onError(response);

            });
        }

        function getById(userId, onSuccess, onError){

            Restangular.one('users', userId).get().then(function(response){

                onSuccess(response);

            }, function(response){

                onError(response);

            });

        }

        function create(data, onSuccess, onError){

            Restangular.all('users').post(data).then(function(response){

                onSuccess(response);

            }, function(response){

                onError(response);

            });

        }

        function update(userId, data, onSuccess, onError){

            Restangular.one('users').customPUT(data, userId).then(function(response) {

                    onSuccess(response);

                }, function(response){

                    onError(response);

                }
            );

        }

        function remove(userId, onSuccess, onError){
            Restangular.one('users/', userId).remove().then(function(){

                onSuccess();

            }, function(response){

                onError(response);

            });
        }

        Restangular.setDefaultHeaders({ 'Authorization' : 'Bearer ' + getCurrentToken() });

        return {
            checkIfLoggedIn: checkIfLoggedIn,
            signup: signup,
            login: login,
            logout: logout,
            getCurrentToken: getCurrentToken,
            getAuthenticatedUser:getAuthenticatedUser,
            getAll: getAll,
            getById: getById,
            create: create,
            update: update,
            remove: remove
        };

    }]);
(function () {
    angular
        .module('app.termService', [])
        .factory('termService', termService);

    function termService(Restangular,userService) {

        function getAll(onSuccess, onError){
            Restangular.all('terms').getList().then(function(response){
                onSuccess(response);
            }, function(){
                onError(response);

            });
        }

        function getById(termId, onSuccess, onError){

            Restangular.one('terms', termId).get().then(function(response){

                onSuccess(response);

            }, function(response){

                onError(response);

            });

        }

        function create(data, onSuccess, onError){

            Restangular.all('terms').post(data).then(function(response){

                onSuccess(response);

            }, function(response){

                onError(response);

            });

        }

        function update(termId, data, onSuccess, onError){

            Restangular.one("terms").customPUT(data, termId).then(function(response) {

                    onSuccess(response);

                }, function(response){

                    onError(response);

                }
            );

        }

        function remove(termId, onSuccess, onError){
            Restangular.one('terms/', termId).remove().then(function(){

                onSuccess();

            }, function(response){

                onError(response);

            });
        }

        function searchForTerm(term, onSuccess, onError){
            Restangular.oneUrl('terms/search/'+term).get().then(function(response){

                onSuccess(response);

            }, function(response){

                onError(response);
            });
        }

        Restangular.setDefaultRequestParams({token: userService.getCurrentToken()});


        return {
            getAll: getAll,
            getById: getById,
            searchForTerm: searchForTerm,
            create: create,
            update: update,
            remove: remove
        };
    }
})();
