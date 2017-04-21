(function () {
    angular
        .module('dashboardModule',[])
        .controller('dashboardCtrl',dashboardCtrl);
    function dashboardCtrl($rootScope) {

        console.log('we are at dashboard');
    }

})();
