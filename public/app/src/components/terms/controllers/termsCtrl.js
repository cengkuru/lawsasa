(function () {
    angular
        .module('termModule',[])
        .controller('termsCtrl',termCtrl);
    function termCtrl($scope,termService,$mdToast) {
        $scope.term = {};

        // Search for terms
        $scope.doSearch = function (term) {
            termService.searchForTerm(term,function (response) {
                console.log(response.data);
            },function (errors) {
                console.log(errors);
            });


        };

        $scope.term.descriptions = [];
        // Add new description
        $scope.addDescription = function(){
            $scope.term.descriptions.push({});
        };

        // Remove description
        $scope.removeDescription = function(description) {
            var index = $scope.term.descriptions.indexOf(description);
            if (index > -1) {
                $scope.term.descriptions.splice(index, 1);
            }
        };

        // Add term
        $scope.addTerm = function () {

            termService.create($scope.term,function () {

                $mdToast.show(
                    $mdToast.simple()
                        .textContent($scope.term.title +' successfully added')
                        .position('top right' )
                        .hideDelay(3000)
                );

                $scope.term = {};

            },function (errors) {
                $scope.errors = errors.data.errors;
            })

        };
    }
})();
