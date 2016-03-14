angular.module('auth.controllers', [])

.controller('AuthController', ['$auth', '$state', '$rootScope', '$http', function($auth, $state, $rootScope, $http) {
	var self = this;
	
        self.loginError = false;
        self.loginErrorText;
            
        self.login = function() {

            var credentials = {
                email: self.email,
                password: self.password
            }            
            
            // Use Satellizer's $auth service to login
            $auth.login(credentials).then(function() {
               return $http.get('api/authenticate/user');
            }, function(error) {
                self.loginError = true;
                self.loginErrorText = error.data.error;
                console.log(error);
            // Because we returned the $http.get request in the $auth.login
            // promise, we can chain the next promise to the end here
            }).then(function(response) {
                console.log(response);
                // Stringify the returned data to prepare it
                // to go into local storage
                var user = JSON.stringify(response.data.user);

                // Set the stringified user data into local storage
                localStorage.setItem('user', user);

                // The user's authenticated state gets flipped to
                // true so we can now show parts of the UI that rely
                // on the user being logged in
                $rootScope.authenticated = true;

                // Putting the user's data on $rootScope allows
                // us to access it anywhere across the app
                $rootScope.currentUser = response.data.user;

                // Everything worked out so we can now redirect to
                // the users state to view the data
                $state.go('main.dashboard');
            });
        }
     
}]);