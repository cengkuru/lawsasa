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
