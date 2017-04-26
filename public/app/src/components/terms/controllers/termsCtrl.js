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
