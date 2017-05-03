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
