angular.module('modals.controllers', [])

.controller('modalController', function($uibModalInstance) {
    this.modalText = 'Unable to save record.'
    
    this.cancel = function() {
       $uibModalInstance.dismiss();
    }
})

.controller('modalControllerConfirm', function($uibModalInstance) {
    this.modalText = 'Confirm.'
    
    this.ok = function () {
         $uibModalInstance.close('this is ok');
    };
    
    this.cancel = function() {
       $uibModalInstance.dismiss();
    }
})