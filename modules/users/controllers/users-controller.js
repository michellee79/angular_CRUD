angular.module('users.controllers', [])

.controller('UserController', ['$http', '$auth', '$rootScope', '$state', function($http, $auth, $rootScope, $state) {
	var self = this;	
        
        self.users;
        self.error;

        self.getUsers = function() {

            // This request will hit the index method in the AuthenticateController
            // on the Laravel side and will return the list of users
            $http.get('api/authenticate').success(function(users) {
                self.users = users;
            }).error(function(error) {
                self.error = error;
            });
        }
        
        self.logout = function(){
            
            $auth.logout().then(function() {
               
                // Remove the authenticated user from local storage
                localStorage.removeItem('user');

                // Flip authenticated to false so that we no longer
                // show UI elements dependant on the user being logged in
                $rootScope.authenticated = false;

                // Remove the current user info from rootscope
                $rootScope.currentUser = null;
                
                $state.go('/');
            });
        }
     
}]);