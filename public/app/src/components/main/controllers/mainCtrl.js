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
