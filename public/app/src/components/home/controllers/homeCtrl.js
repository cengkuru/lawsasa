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
