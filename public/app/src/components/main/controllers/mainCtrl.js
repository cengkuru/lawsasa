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
