'use strict';

var app = angular.module("myNoteApp", ['ui.router', 'satellizer', 
                        'auth.controllers',     
                        'users.controllers',
                        'areas.controllers', 'areas.services',
                        'apartments.controllers', 'apartments.services',
                        'actionslog.controllers', 'actionslog.services',
                        'permissions.controllers', 'permissions.services',
                        'dashboard.controllers',
                        'angular-utils.services', 'angular-utils.filters', 
                        'modals.controllers', 'modals.config',
                        'ui.bootstrap']);

app.run(function ($rootScope, $state, $auth) {
    
    $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {       
        /*
        if ('data' in next && 'authorizedRoles' in next.data) {
            var authorizedRoles = next.data.authorizedRoles;
            if (!AuthService.isAuthorized(authorizedRoles)) {
                event.preventDefault();        
                $state.go('main.home', {}, {reload: true});
                $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
              }
        }
        */       
        
        if (!$auth.isAuthenticated()) {            
            if (next.name !== 'auth') {                
                    event.preventDefault();
                    $state.go('auth');              
            }
        }
    });
    
});

app.config(function($stateProvider, $urlRouterProvider, $authProvider, $provide, $httpProvider){
    
    function redirectWhenLoggedOut($q, $injector) {

        return {

            responseError: function(rejection) {

                // Need to use $injector.get to bring in $state or else we get
                // a circular dependency error
                var $state = $injector.get('$state');

                // Instead of checking for a status code of 400 which might be used
                // for other reasons in Laravel, we check for the specific rejection
                // reasons to tell us if we need to redirect to the login state
                var rejectionReasons = ['token_not_provided', 'token_expired', 'token_absent', 'token_invalid'];

                // Loop through each rejection reason and redirect to the login
                // state if one is encountered
                angular.forEach(rejectionReasons, function(value, key) {

                    if(rejection.data.error === value) {

                        // If we get a rejection corresponding to one of the reasons
                        // in our array, we know we need to authenticate the user so 
                        // we can remove the current user from local storage
                        localStorage.removeItem('user');

                        // Send the user to the auth state so they can login
                        $state.go('auth');
                    }
                });

                return $q.reject(rejection);
            }
        }
    }

    // Setup for the $httpInterceptor
    $provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);

    // Push the new factory onto the $http interceptor array
    $httpProvider.interceptors.push('redirectWhenLoggedOut');
    // Satellizer configuration that specifies which API
    // route the JWT should be retrieved from
    $authProvider.loginUrl = '/api/authenticate';

    // Redirect to the auth state if any other states
    // are requested other than users
            
    $urlRouterProvider.otherwise("/auth");
    
    $stateProvider
    
    .state('auth', {
        url: '/auth',
        templateUrl: 'modules/auth/templates/login-view.html',
        controller: 'AuthController as auth'
    })



    $stateProvider.state('main', {
        abstract: true,        
        templateUrl: 'modules/menu/menu-view.html'   
    })
    
    /**********************************************************/
    /****************** Dashboard *****************************/
    /**********************************************************/
    
    $stateProvider.state('main.dashboard', {    
        url: "/dashboard",   
        controller: 'DashboardController as dashboardCtrl',
        templateUrl: 'modules/dashboard/templates/dashboard-view.html'   
    })
    
    /**********************************************************/
    /****************** Users *****************************/
    /**********************************************************/
    
    $stateProvider.state('main.users', {    
        url: "/users",         
        controller: 'UserController as user',
        templateUrl: 'modules/users/templates/users-view.html'   
    })
    
    /**********************************************************/
    /****************** Areas *****************************/
    /**********************************************************/
    
    $stateProvider.state('main.areas', {    
        url: "/areas",         
        controller: 'AreasController as ctrlAreas',
        templateUrl: 'modules/areas/templates/areas-view.html'   
    })
    
    $stateProvider.state('main.area', {    
        url: "/area/{id}",         
        controller: 'AreaController as ctrlArea',
        templateUrl: 'modules/areas/templates/area-view.html'   
    })

    /**********************************************************/
    /****************** Apartments *****************************/
    /**********************************************************/
    $stateProvider.state('main.apartments', {
        url: "/apartments",
        controller: 'ApartmentsController as ctrlApartments',
        templateUrl: 'modules/apartments/templates/apartments-view.html'
    })

    $stateProvider.state('main.apartment', {
        url: "/apartment/{id}",
        controller: 'ApartmentController as ctrlApartment',
        templateUrl: 'modules/apartments/templates/apartment-view.html'
    })

    /**********************************************************/
    /****************** ActionsLog *****************************/
    /**********************************************************/
    
    $stateProvider.state('main.actionslogs', {    
        url: "/actionslogs",         
        controller: 'ActionsLogsController as ctrlActionsLogs',
        templateUrl: 'modules/actionslog/templates/actionslog-list-view.html'   
    })
    
    $stateProvider.state('main.actionslog', {    
        url: "/actionslog/{id}",         
        controller: 'ActionsLogController as ctrlActionsLog',
        templateUrl: 'modules/actionslog/templates/actionslog-item-view.html'   
    })    
    
    /**********************************************************/
    /****************** Permissions****************************/
    /**********************************************************/
    
    $stateProvider.state('main.permissions', {    
        url: "/permissions",         
        controller: 'PermissionsController as ctrlPermissions',
        templateUrl: 'modules/permissions/templates/permissions-view.html'   
    })
    
   
});





