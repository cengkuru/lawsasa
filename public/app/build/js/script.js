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
        'lawareaModule',

        'app.userService',
        'app.termService',
        'app.lawareaService'

    ])
// Constants
    .constant('myConfig', {
        BASE_API: window.location.origin + "/"
    })

    // loading defaults
    .run(['$rootScope', '$state', '$location', '$stateParams','userService',  function ($rootScope, $state, $location, $stateParams,userService) {

        $rootScope.previousState = '';
        $rootScope.currentState = '';
         $rootScope.isAuthenticated = userService.checkIfLoggedIn();

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
            $rootScope.previousState = from.name;
            $rootScope.currentState = to.name;
            $rootScope.returnToStateParams = fromParams.id;
            $rootScope.hasHeader = to.hasHeader;
            $rootScope.hasSidebar = to.hasSidebar;
            $rootScope.hasFooter = to.hasFooter;
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
                hasFooter:true,
                controller: 'homeCtrl'
            })
            // Dashboard
            .state({
                name: 'main.dashboard',
                title: 'Dashboard',
                url: '/dashboard',
                templateUrl: 'app/src/components/dashboard/views/dashboard.html',
                hasHeader:true,
                hasFooter:true,
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
                hasFooter:false,
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
                hasFooter:true,
                hasSidebar:true,
                controller: 'termsCtrl'
            })

            // New Term
            .state({
                name: 'main.newTerm',
                title: 'New Term',
                url: '/manage/terms/add-new',
                templateUrl: 'app/src/components/terms/views/addTerm.html',
                hasHeader:true,
                hasFooter:true,
                hasSidebar:true,
                controller: 'termsCtrl'
            })

            // Edit Term
            .state({
                name: 'main.editTerm',
                title: 'Edit Term',
                url: '/manage/term/:id/edit',
                templateUrl: 'app/src/components/terms/views/addTerm.html',
                hasHeader:true,
                hasFooter:true,
                hasSidebar:true,
                controller: 'termsCtrl'
            })

            // Term
            .state({
                name: 'main.lawareas',
                title: 'Manage lawareas',
                url: '/manage/lawareas',
                templateUrl: 'app/src/components/lawareas/views/manageLawareas.html',
                hasHeader:true,
                hasFooter:true,
                hasSidebar:true,
                controller: 'lawareasCtrl'
            })

            // New Lawarea
            .state({
                name: 'main.newLawarea',
                title: 'New Lawarea',
                url: '/manage/lawareas/add-lawarea',
                templateUrl: 'app/src/components/lawareas/views/addLawarea.html',
                hasHeader:true,
                hasFooter:true,
                hasSidebar:true,
                controller: 'lawareasCtrl'
            })

            // Edit Lawarea
            .state({
                name: 'main.editLawarea',
                title: 'Edit Lawarea',
                url: '/manage/lawarea/:id/edit',
                templateUrl: 'app/src/components/lawareas/views/addLawarea.html',
                hasHeader:true,
                hasFooter:true,
                hasSidebar:true,
                controller: 'lawareasCtrl'
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
        $scope.lockedLeft = true;

        $scope.toggleLeft = function() {
            $scope.lockedLeft = !$scope.lockedLeft;
        };



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





        // Menu items
        $scope.menu = [
            {
                link: 'main.dashboard',
                title: 'Dashboard',
                icon: 'dashboard'
            },
            {
                link: 'main.terms',
                title: 'Terms',
                icon: 'person'
            },
            {
                link: 'main.lawareas',
                title: 'Law Areas',
                icon: 'person'
            },
            {
                link: 'main.constitutionals',
                title: 'Constitutionals',
                icon: 'person'
            },
            {
                link: 'main.interprovisions',
                title: 'International Provisions',
                icon: 'person'
            },
            {
                link: 'main.caselaws',
                title: 'Case Laws',
                icon: 'person'
            },
            {
                link: 'main.books',
                title: 'Books',
                icon: 'person'
            },
            {
                link: 'main.blogs',
                title: 'Blogs',
                icon: 'person'
            },
            {
                link: 'main.country',
                title: 'Countries',
                icon: 'person'
            },
            {
                link: 'main.Interarticles',
                title: 'International Articles',
                icon: 'person'
            },
            {
                link: 'main.statutes',
                title: 'Statutes',
                icon: 'person'
            }
        ];
    }
})();

(function () {
    angular
        .module('homeModule',[])
        .controller('homeCtrl',homeCtrl);


    function homeCtrl($scope,termService,$rootScope) {

        $scope.doSearch = function (term) {
            termService.searchForTerm(term,function (response) {
                console.log(response.data);
            },function (errors) {
                console.log(errors);
            });


        };
    }
})();

(function() {
    loginCtrl.$inject = ['$scope', '$state', 'userService', '$mdToast', '$rootScope'];
    angular
        .module('loginModule', [])
        .controller('loginCtrl', loginCtrl);

    function loginCtrl($scope, $state, userService, $mdToast, $rootScope) {
        $scope.loginData = {};

        // Perform the login action when the user submits the login form
        $scope.doLogin = function() {
            userService.login(
                $scope.loginData.email, $scope.loginData.password,
                function(response) {
                    $rootScope.isAuthenticated = true;
                    $state.go('main.home');
                }
            );
        };


        if (userService.checkIfLoggedIn()) {
            //$state.go('main.home');
        }
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

(function () {
    angular
        .module('termModule',[])
        .controller('termsCtrl',termCtrl);
    function termCtrl($scope,termService,$mdToast,$rootScope,$stateParams) {
        // New term object
        $scope.term = {};
        // Ner term descriptions object
        $scope.term.descriptions = [];

        // When editing
        switch ($rootScope.currentState){
            case 'main.editTerm':

                termService.getById($stateParams.id,function (response) {
                    $scope.term.title = response.data.title;
                    $scope.term.description=[];
                    angular.forEach(response.data.definitions.data,function (key,value) {
                        $scope.term.descriptions.push(key);
                        $scope.term.description.push(key.definition);

                    });
                    // console.log($scope.term);

                });
                break;

        }


        // Get all current terms
        termService.getAll(function (response) {
            // On success

            $scope.terms = response;
        },function (error) {
            // On error
            console.log(error);
        });

        // Search for terms
        $scope.doSearch = function (term) {
            termService.searchForTerm(term,function (response) {
                console.log(response.data);
            },function (errors) {
                console.log(errors);
            });


        };



        // Add new description
        $scope.addDescription = function(){
            $scope.term.descriptions.push({});
        };

        // Remove description
        $scope.removeDescription = function(description) {
            var index = $scope.term.descriptions.indexOf(description);
            if (index > -1) {
                $scope.term.descriptions.splice(index, 1);
                $scope.term.description.splice(index, 1);
            }
        };

        // Add term / edit
        $scope.submit = function () {

            switch ($rootScope.currentState){
                case 'main.newTerm':
                    termService.create($scope.term,function () {

                        $mdToast.show(
                            $mdToast.simple()
                                .textContent($scope.term.title +' successfully added')
                                .position('bottom right' )
                                .hideDelay(3000)
                        );

                        $scope.term = {};

                    },function (errors) {
                        $scope.errors = errors.data.errors;
                    });
                    break;
                case 'main.editTerm':
                    termService.update($stateParams.id,$scope.term,function () {

                        $mdToast.show(
                            $mdToast.simple()
                                .textContent($scope.term.title +' successfully Updated')
                                .position('bottom right' )
                                .hideDelay(3000)
                        );

                    },function (errors) {
                        $scope.errors = errors.data.errors;
                    });
                    break;

            }

        };
        
        // Delete term
        $scope.deleteTerm = function (term) {
            termService.remove(term.secureId,function (response) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent($scope.term.title +' successfully deleted')
                        .position('bottom right' )
                        .hideDelay(3000)
                );
            });

            var index = $scope.terms.indexOf(term);
            if (index > -1) {
                $scope.terms.splice(index, 1);
            }
            
        };

    }
})();

(function () {
    angular
        .module('lawareaModule',[])
        .controller('lawareasCtrl',lawareasCtrl);
    function lawareasCtrl($scope,lawareaService,$mdToast,$rootScope,$stateParams) {
        // New lawarea object
        $scope.lawarea = {};

        // When editing
        switch ($rootScope.currentState){
            case 'main.editLawarea':

                lawareaService.getById($stateParams.id,function (response) {
                    $scope.lawarea = response.data;

                    // console.log($scope.lawarea);

                });
                break;
        }
        // Get all current lawareas
        lawareaService.getAll(function (response) {
            // On success
            $scope.lawareas = response;
        },function (error) {
            // On error
            console.log(error);
        });


        // Add lawarea / edit
        $scope.submit = function () {

            switch ($rootScope.currentState){
                case 'main.newLawarea':
                    lawareaService.create($scope.lawarea,function () {

                        $mdToast.show(
                            $mdToast.simple()
                                .textContent($scope.lawarea.title +' successfully added')
                                .position('bottom right' )
                                .hideDelay(3000)
                        );

                        $scope.lawarea = {};

                    },function (errors) {
                        $scope.errors = errors.data.errors;
                    });
                    break;
                case 'main.editLawarea':
                    lawareaService.update($stateParams.id,$scope.lawarea,function () {

                        $mdToast.show(
                            $mdToast.simple()
                                .textContent($scope.lawarea.title +' successfully Updated')
                                .position('bottom right' )
                                .hideDelay(3000)
                        );

                    },function (errors) {
                        $scope.errors = errors.data.errors;
                    });
                    break;

            }

        };
        
        // Delete lawarea
        $scope.deleteLawarea = function (lawarea) {

            console.log(lawarea);
            lawareaService.remove(lawarea.secureId,function (response) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent($scope.lawarea.title +' successfully deleted')
                        .position('bottom right' )
                        .hideDelay(3000)
                );
            });

            var index = $scope.lawareas.indexOf(lawarea);
            if (index > -1) {
                $scope.lawareas.splice(index, 1);
            }
            
        };

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
            }, function(response){
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

(function () {
    angular
        .module('app.lawareaService', [])
        .factory('lawareaService', lawareaService);

    function lawareaService(Restangular,userService) {

        function getAll(onSuccess, onError){
            Restangular.all('lawareas').getList().then(function(response){
                onSuccess(response);
            }, function(response){
                onError(response);

            });
        }

        function getById(lawareaId, onSuccess, onError){

            Restangular.one('lawareas', lawareaId).get().then(function(response){

                onSuccess(response);

            }, function(response){

                onError(response);

            });

        }

        function create(data, onSuccess, onError){

            Restangular.all('lawareas').post(data).then(function(response){

                onSuccess(response);

            }, function(response){

                onError(response);

            });

        }

        function update(lawareaId, data, onSuccess, onError){

            Restangular.one("lawareas").customPUT(data, lawareaId).then(function(response) {

                    onSuccess(response);

                }, function(response){

                    onError(response);

                }
            );

        }

        function remove(lawareaId, onSuccess, onError){
            Restangular.one('lawareas/', lawareaId).remove().then(function(){

                onSuccess();

            }, function(response){

                onError(response);

            });
        }

        function searchForTerm(lawarea, onSuccess, onError){
            Restangular.oneUrl('lawareas/search/'+lawarea).get().then(function(response){

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
