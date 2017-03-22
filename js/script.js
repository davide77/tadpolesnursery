var app = angular.module('App', []);

//Controlador ↓↓↓
app.controller('MainController', ['$scope', 'forecast', function($scope, forecast) {
  forecast.success(function(data) {
		$scope.fiveDay = data;
  });
}]);


// Crear un servicio en Angular ↓↓↓↓
app.factory('forecast', ['$http', function($http) { 
  return $http.get('http://api.openweathermap.org/data/2.5/forecast/daily?id=2643743&lang=GB&APPID=70af07427d73a583c4083ec4fba8c181&units=metric&cnt=5') 
		.success(function(data) { 
		  return data; 
		}) 
		.error(function(err) { 
		  return err; 
		}); 
}]);

