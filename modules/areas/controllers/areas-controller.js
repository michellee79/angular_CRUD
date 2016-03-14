angular.module('areas.controllers', [])

.controller('AreasController', ['$state', 'AreasService', '$scope', '$filter', function($state, AreasService, $scope, $filter) {
    var self = this;	
        
    self.areas = [];
    self.filteredAreas = [];
    self.areasFilteredSearch = [];
    self.currentPage = 1;
    self.numPerPage = 10
    self.maxSize = 5;
    self.search;
    self.sortCriteria = {'field': 'none', 'reverse': false };
    self.canCreate = false;
    
    AreasService.canCreate().then(function(success){        
        self.canCreate=success.data;
    }, function(error){
        console.log(error);
    }); 
    
    AreasService.getAreas().then(function(success){        
        self.areas = success.data;
        self.filteredAreas = success.data;
    }, function(error){
        console.log(error);
    }); 
  
    self.go = function(id){
        $state.go('main.area', {'id': id}, {reload: true});
    }
   /*
    self.makeAreas = function() {       
        for (i=1;i<=1000;i++) {
            self.areas.push({id:i, area:"todo "+i, code:i});            
        }
    };
    self.makeAreas(); 
    */
      
        
    function FilterAndShowItems(){
        
        var heading = self.sortCriteria.field;
        var reverse = self.sortCriteria.reverse;              
        self.areasFilteredSearch = $filter('filter')(self.areas, self.search); 
        if('heading' !='none'){
            self.areasFilteredSearch = $filter('orderObjectBy')(self.areasFilteredSearch, heading, reverse);
        }
        
        var begin = ((self.currentPage - 1) * self.numPerPage), end = begin + self.numPerPage;    
        self.filteredAreas = self.areasFilteredSearch.slice(begin, end);
    }
    
    self.sortTable = function(heading){        
        self.sortCriteria = {'field': heading, 'reverse': !self.sortCriteria.reverse };
        FilterAndShowItems();       
    }
    
    $scope.$watch(function () {
       return self.currentPage;
    },function(value){        
        FilterAndShowItems();
    });
    
    $scope.$watch(function () {
       return self.search;
    },function(value){        
        FilterAndShowItems();
    });
}])

.controller('AreaController', ['AreasService', '$stateParams', '$uibModal', '$state', 'MODAL_CONFIG',
        function(AreasService,$stateParams, $uibModal, $state, MODAL_CONFIG) {
    var self = this;	
    self.title;
    self.area;
    var id = $stateParams.id;
    self.isNew = (id=='add-new');
    self.canDelete=false;
    
    AreasService.canDelete().then(function(success){        
        self.canDelete=success.data;
    }, function(error){
        console.log(error);
    }); 
   
    function getArea(){
        AreasService.getArea(id).then(function(success){     
            self.title = success.data.area;
            self.area = success.data;
        }, function(error){
            console.log(error);
        }); 
    }
    
    if( !self.isNew ){ getArea() };
    
    self.saveRecord = function(){
        if( self.isNew ){
            AreasService.postStore(self.area).then(function(success){
                var modalInstance = $uibModal.open( MODAL_CONFIG.modalCreateSuccess() );
                setTimeout(function(){
                    modalInstance.close('cancel');
                    $state.go('main.area', {'id': success.data}, {reload: true});
                }, 1000);
                
            }, function(error){
                console.log(error);
                $uibModal.open( MODAL_CONFIG.modalCreateFailure() );
            });
        } else {
            AreasService.postUpdate(id, self.area).then(function(success){
                var modalInstance = $uibModal.open( MODAL_CONFIG.modalUpdateSuccess() );
                setTimeout(function(){
                    modalInstance.close('cancel');
                }, 1000);
            }, function(error){
                console.log(error);
                $uibModal.open( MODAL_CONFIG.modalUpdateFailure() );
            });
        }
    }
    
    self.deleteRecord = function(){
        if( self.isNew ){
            return;
        }
        
        var modalInstance = $uibModal.open( MODAL_CONFIG.modalDeleteConfirm() );
        
        modalInstance.result.then(function (msg) {
            AreasService.getDelete(id).then(function(success){
                var modalInstance1 = $uibModal.open( MODAL_CONFIG.modalDeleteSuccess() );
                setTimeout(function(){
                    modalInstance1.close('cancel');
                    $state.go('main.areas', {}, {reload: true});
                }, 1000);                
            }, function(error){
                console.log(error);
                $uibModal.open( MODAL_CONFIG.modalDeleteFailure() );
            });
        });
      
    }
    
     
}])
