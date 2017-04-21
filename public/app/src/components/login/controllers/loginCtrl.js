(function () {
    angular
        .module('loginModule', [])
        .controller('loginCtrl', loginCtrl);
    function loginCtrl() {
        console.log('login page');
    }
})();