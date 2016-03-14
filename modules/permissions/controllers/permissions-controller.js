angular.module('permissions.controllers', [])

.controller('PermissionsController', ['$state', 'PermissionsService', 'UtilService', function($state, PermissionsService, UtilService) {
    var self = this;
    self.permissions = []; 
    self.selection = {};
    
    self.roles = ['director','office_manager','guest_service_manager','user'];
    
    self.include = function(obj, role){
        var role_exists = false
        for (var i=0; i < obj.length; i++) {
            if (obj[i].name === role) {
                role_exists = true;
            }
        }
        return role_exists;
    }
    
    function setModel(){
        angular.forEach(self.permissions, function(valuePermission, keyPermission) {
            angular.forEach(self.roles, function(valueRole, keyRole) {                
                self.selection[valuePermission.name+'_'+valueRole] = self.include(valuePermission.roles, valueRole)
            });
        });
    }
     
    PermissionsService.getPermissions().then(function(success){        
        self.permissions = success.data;
        setModel();
        
        //ng-checked="ctrlPermissions.include(item.roles, 'director')"
        //console.log(self.permissions);
    }, function(error){
        console.log(error);
    }); 
    
    self.save = function(){
        console.log(self.selection);
    }
  

}])