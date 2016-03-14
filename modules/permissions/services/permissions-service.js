angular.module('permissions.services', [])

    .factory("PermissionsService", ['$http',
        function($http){
         
        var permissionsService = {};                  
        
        permissionsService.getPermissions = function(){            
            return $http.get('api/permission');
        }   
                
        return permissionsService;
    }])