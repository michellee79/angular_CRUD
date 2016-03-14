angular.module('areas.services', [])

    .factory("AreasService", ['$http', '$localstorage',
        function($http, SITE_CONFIGS, $localstorage){
         
        var areasService = {};                  
        
        areasService.getAreas = function(){            
            return $http.get('api/area');
        }
        
        areasService.getArea = function(id){            
            return $http.get('api/area/show/'+id);
        }
        
        areasService.postUpdate = function(id, area){            
            return $http.post('api/area/update/'+id, area);
        }
        
        areasService.postStore = function(area){            
            return $http.post('api/area/store', area);
        }     
        
        areasService.getDelete = function(id){            
            return $http.get('api/area/destroy/'+id);
        }
        
        areasService.canDelete = function(area){            
            return $http.get('api/role-permission/has-permission/areaDelete');
        }     
        
        areasService.canCreate = function(area){            
            return $http.get('api/role-permission/has-permission/areaCreate');
        }     
                
        return areasService;
    }])



