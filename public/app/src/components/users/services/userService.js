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