/**
 * Created by sunnysmile on 1/30/2016.
 */
angular.module('apartments.services', [])

.factory("ApartmentsService", ['$http', '$localstorage',
    function($http, SITE_CONFIGS, $localstorage){

        var apartmentsService = {};

        apartmentsService.getApartments = function(){
            return $http.get('api/apartment');
        }

        apartmentsService.getApartment = function(id){
            return $http.get('api/apartment/'+id);
        }

        apartmentsService.postUpdate = function(id, area){
            return $http.put('api/apartment/'+id, area);
        }

        apartmentsService.postStore = function(data){
            return $http.post('api/apartment', data);
        }

        apartmentsService.getDelete = function(id){
            return $http.delete('api/apartment/'+id);
        }

        apartmentsService.canDelete = function(obj){
            return $http.get('api/role-permission/has-permission/apartmentDelete');
        }

        apartmentsService.canCreate = function(obj){
            return $http.get('api/role-permission/has-permission/apartmentCreate');
        }

        return apartmentsService;
    }]);



