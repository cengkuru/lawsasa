(function () {
    angular
        .module('app.lawareaService', [])
        .factory('lawareaService', lawareaService);

    function lawareaService(Restangular,userService) {

        function getAll(onSuccess, onError){
            Restangular.all('lawareas').getList().then(function(response){
                onSuccess(response);
            }, function(response){
                onError(response);

            });
        }

        function getById(lawareaId, onSuccess, onError){

            Restangular.one('lawareas', lawareaId).get().then(function(response){

                onSuccess(response);

            }, function(response){

                onError(response);

            });

        }

        function create(data, onSuccess, onError){

            Restangular.all('lawareas').post(data).then(function(response){

                onSuccess(response);

            }, function(response){

                onError(response);

            });

        }

        function update(lawareaId, data, onSuccess, onError){

            Restangular.one("lawareas").customPUT(data, lawareaId).then(function(response) {

                    onSuccess(response);

                }, function(response){

                    onError(response);

                }
            );

        }

        function remove(lawareaId, onSuccess, onError){
            Restangular.one('lawareas/', lawareaId).remove().then(function(){

                onSuccess();

            }, function(response){

                onError(response);

            });
        }

        function searchForTerm(lawarea, onSuccess, onError){
            Restangular.oneUrl('lawareas/search/'+lawarea).get().then(function(response){

                onSuccess(response);

            }, function(response){

                onError(response);
            });
        }

        Restangular.setDefaultRequestParams({token: userService.getCurrentToken()});


        return {
            getAll: getAll,
            getById: getById,
            searchForTerm: searchForTerm,
            create: create,
            update: update,
            remove: remove
        };
    }
})();
