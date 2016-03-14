angular.module('modals.config', [])

.factory('MODAL_CONFIG',  [function(){
    var modalUpdateSuccess = function(){
        return {
                animation: true,        
                controller: 'modalController as modal',
                templateUrl: 'modules/modals/templates/modal-update-success.html'
            };
    }
    
    var modalUpdateFailure = function(){
        return {
                animation: true,        
                controller: 'modalController as modal',
                templateUrl: 'modules/modals/templates/modal-update-failure.html'
            };
    }
    
    var modalCreateSuccess = function(){
        return {
                animation: true,        
                controller: 'modalController as modal',
                templateUrl: 'modules/modals/templates/modal-create-success.html'
            };
    }
    
    var modalCreateFailure = function(){
        return {
                animation: true,        
                controller: 'modalController as modal',
                templateUrl: 'modules/modals/templates/modal-create-failure.html'
            };
    }
    
    var modalDeleteConfirm = function(){
        return {
                animation: true,        
                controller: 'modalControllerConfirm as modal',
                templateUrl: 'modules/modals/templates/modal-delete-confirm.html'
            };
    }
    
    var modalDeleteSuccess = function(){
        return {
                animation: true,        
                controller: 'modalController as modal',
                templateUrl: 'modules/modals/templates/modal-delete-success.html'
            };
    }
    
    var modalDeleteFailure = function(){
        return {
                animation: true,        
                controller: 'modalController as modal',
                templateUrl: 'modules/modals/templates/modal-delete-failure.html'
            };
    }
    
    return {
        modalUpdateSuccess: modalUpdateSuccess,
        modalUpdateFailure: modalUpdateFailure,
        modalCreateSuccess: modalCreateSuccess,
        modalCreateFailure: modalCreateFailure,
        modalDeleteConfirm: modalDeleteConfirm,
        modalDeleteSuccess: modalDeleteSuccess,
        modalDeleteFailure: modalDeleteFailure
    };
}])