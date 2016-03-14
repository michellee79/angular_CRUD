angular.module('actionslog.controllers', [])

.controller('ActionsLogsController', ['$state', 'ActionsLogService', '$scope', '$filter', function($state, ActionsLogService, $scope, $filter) {
    var self = this;	
    console.log('ActionsLogsController loaded');
  
    self.logs = [];
    self.filteredLogs = [];
    self.logsFilteredSearch = [];
    self.currentPage = 1;
    self.numPerPage = 10
    self.maxSize = 5;
    self.search;
    self.sortCriteria = {'field': 'none', 'reverse': false };
    self.canView = false;
    
    ActionsLogService.canView().then(function(success){        
        self.canView=success.data;
    }, function(error){
        console.log(error);
    }); 
    
//     ActionsLogService.getActionsLogs().then(function(success){        
//         self.logs         = success.data;
//         self.filteredLogs = success.data;
//     }, function(error){
//         console.log(error);
//     }); 
  
    self.listing = function(){
      ActionsLogService.getActionsLogs().then(function(success){        
          self.logs         = success.data;
          self.filteredLogs = success.data;
      }, function(error){
          console.log(error);
      });       
    }
    
    self.listing();
  
    self.go = function(id){
        $state.go('main.actionslog', {'id': id}, {reload: true});
    }
  
        
    function FilterAndShowItems(){
        
        var heading = self.sortCriteria.field;
        var reverse = self.sortCriteria.reverse;              
        self.logsFilteredSearch = $filter('filter')(self.logs, self.search); 
        if('heading' !='none'){
            self.logsFilteredSearch = $filter('orderObjectBy')(self.logsFilteredSearch, heading, reverse);
        }
        
        var begin = ((self.currentPage - 1) * self.numPerPage), end = begin + self.numPerPage;    
        self.filteredLogs = self.logsFilteredSearch.slice(begin, end);
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

.controller('ActionsLogController', ['ActionsLogService', '$stateParams', '$uibModal', '$state', 'MODAL_CONFIG',
    function(ActionsLogService,$stateParams, $uibModal, $state, MODAL_CONFIG) {
    var self = this;      
    
      
    self.log;
    var id = $stateParams.id;
    self.isNew = (id=='add-new');

      console.log('ActionsLogController loaded, id: ' + id);
   
    function getActionsLog(){
      console.log("getActionsLog");
        ActionsLogService.getActionsLog(id).then(function(success){     
            self.log = success.data;
            console.log(self.log);
        }, function(error){
            console.log(error);
        }); 
    }   
      
     if( !self.isNew ){ getActionsLog() };
          
}])          