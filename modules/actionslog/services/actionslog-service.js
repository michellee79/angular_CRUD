angular.module('actionslog.services', [])

    .factory("ActionsLogService", ['$http', '$localstorage',
        function($http, SITE_CONFIGS, $localstorage){
         
        var actionslogService = {};  

        actionslogService.getActionsLogs = function(){            
            return $http.get('api/actionslog');
        }
        
        actionslogService.getActionsLog = function(id){            
            return $http.get('api/actionslog/show/'+id);
        }
        
        actionslogService.canView = function(actionslog){            
            return $http.get('api/role-permission/has-permission/actionslogView');
        }     
        
          
        return actionslogService;
    }])