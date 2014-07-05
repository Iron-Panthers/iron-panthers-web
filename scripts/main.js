(function () {
	var module = angular.module("ironBlog", []);
	module.controller("BlogController", ["$scope", function($scope) {
		$scope.header = "robot revitalized with tape";
		$scope.author = "bobby joe";
		$scope.date = "oh god date parsing"
		$scope.text = "test text";
		console.log($scope.text);
	}]);
})();