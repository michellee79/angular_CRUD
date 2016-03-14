angular.module('angular-utils.services', [])
    .factory('$localstorage', ['$window', function($window) {
        return {
            set: function(key, value) {
              $window.localStorage[key] = value;
            },
            get: function(key, defaultValue) {
              return $window.localStorage[key] || defaultValue;
            },
            setObject: function(key, value) {
              $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function(key) {
              return JSON.parse($window.localStorage[key] || '{}');
            }
        }
    }])

    .factory('UtilService', [function() {
	
	var utilService = {};

        utilService.include = function(arr, obj){
		for(var i=0; i<arr.length; i++) {
			if (arr[i] == obj) return true;
		}
        };        
        
        return utilService;
	
	
    }])
