/**
 * Created by Sunnysmile on 1/29/2016.
 */
angular.module('apartments.controllers', [])

    .controller('ApartmentsController', ['$state', 'ApartmentsService', '$scope', '$filter', function($state, ApartmentsService, $scope, $filter) {
        var self = this;

        self.apartments = [];
        self.filteredApartments = [];
        self.apartmentsFilteredSearch = [];
        self.currentPage = 1;
        self.numPerPage = 5
        self.maxSize = 5;
        self.search;
        self.sortCriteria = {'field': 'none', 'reverse': false };
        self.canCreate = true;

        //ApartmentsService.canCreate().then(function(success){
        //    self.canCreate=success.data;
        //}, function(error){
        //    console.log(error);
        //});

        ApartmentsService.getApartments().then(function(success){
            self.apartments = success.data;
            FilterAndShowItems();
        }, function(error){
            console.log(error);
        });

        self.go = function(id){
            $state.go('main.apartment', {'id': id}, {reload: true});
        }

        function FilterAndShowItems(){

            var heading = self.sortCriteria.field;
            var reverse = self.sortCriteria.reverse;
            self.apartmentsFilteredSearch = $filter('filter')(self.apartments, self.search);
            if('heading' !='none'){
                self.apartmentsFilteredSearch = $filter('orderObjectBy')(self.apartmentsFilteredSearch, heading, reverse);
            }

            var begin = ((self.currentPage - 1) * self.numPerPage), end = begin + self.numPerPage;
            self.filteredApartments = self.apartmentsFilteredSearch.slice(begin, end);
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

    .controller('ApartmentController', ['ApartmentsService', '$stateParams', '$uibModal', '$state', 'MODAL_CONFIG',
        function(ApartmentsService,$stateParams, $uibModal, $state, MODAL_CONFIG) {
            var self = this;
            var id = $stateParams.id;
            self.isNew = (id=='add-new');
            self.canDelete=true;

            //ApartmentsService.canDelete().then(function(success){
            //    self.canDelete=success.data;
            //}, function(error){
            //    console.log(error);
            //});

            function getApartment(){
                ApartmentsService.getApartment(id).then(function(success){
                    self.title = success.data.apartment;
                    self.apartment = success.data;
                }, function(error){
                    console.log(error);
                });
            }

            if( !self.isNew ){ getApartment(); };

            self.saveRecord = function(){
                if( self.isNew ){
                    ApartmentsService.postStore(self.apartment).then(function(success){
                        var modalInstance = $uibModal.open( MODAL_CONFIG.modalCreateSuccess() );
                        setTimeout(function(){
                            modalInstance.close('cancel');
                            $state.go('main.apartment', {'id': success.data}, {reload: true});
                        }, 1000);

                    }, function(error){
                        console.log(error);
                        $uibModal.open( MODAL_CONFIG.modalCreateFailure() );
                    });
                } else {
                    ApartmentsService.postUpdate(id, self.apartment).then(function(success){
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

            self.deleteRecord = function() {
                if (self.isNew) {
                    return;
                }

                var modalInstance = $uibModal.open(MODAL_CONFIG.modalDeleteConfirm());

                modalInstance.result.then(function (msg) {
                    ApartmentsService.getDelete(id).then(function (success) {
                        var modalInstance1 = $uibModal.open(MODAL_CONFIG.modalDeleteSuccess());
                        setTimeout(function () {
                            modalInstance1.close('cancel');
                            $state.go('main.apartments', {}, {reload: true});
                        }, 1000);
                    }, function (error) {
                        console.log(error);
                        $uibModal.open(MODAL_CONFIG.modalDeleteFailure());
                    });
                });
            }
        }])
