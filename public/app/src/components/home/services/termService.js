(function () {
    angular
        .module('app.termService', [])
        .factory('termService', termService);

    function termService(Restangular,userService) {

        function getAll(onSuccess, onError){
            Restangular.all('terms').getList().then(function(response){
                onSuccess(response);
            }, function(){
                onError(response);

            });
        }

        function getById(termId, onSuccess, onError){

            Restangular.one('terms', termId).get().then(function(response){

                onSuccess(response);

            }, function(response){

                onError(response);

            });

        }

        function create(data, onSuccess, onError){

            Restangular.all('terms').post(data).then(function(response){

                onSuccess(response);

            }, function(response){

                onError(response);

            });

        }

        function update(termId, data, onSuccess, onError){

            Restangular.one("terms").customPUT(data, termId).then(function(response) {

                    onSuccess(response);

                }, function(response){

                    onError(response);

                }
            );

        }

        function remove(termId, onSuccess, onError){
            Restangular.one('terms/', termId).remove().then(function(){

                onSuccess();

            }, function(response){

                onError(response);

            });
        }

        function searchForTerm(term, onSuccess, onError){
            Restangular.oneUrl('terms/search/'+term).get().then(function(response){

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
