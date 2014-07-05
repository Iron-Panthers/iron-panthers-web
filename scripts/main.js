(function () {
	var module = angular.module("ironBlog", []);
	module.controller("BlogController", ["$scope", function($scope) {
		var Blog = function(header, author, team, date, text) {
			this.header = header;
			this.author = author;
			this.team   = team;
			this.date   = date;	//should be a Date object, for different Date formats
			this.text   = text;
		}

		$scope.blogs = [];
		$scope.blogs.push(new Blog(
				"Header"
			  , "Author"
			  , "Team"
			  , "Date"
			  , "Text"
			)
		);
		$scope.blogs.push(new Blog(
				"Header2"
			  , "Author2"
			  , "Team2"
			  , "Date2"
			  , "Text2"
			)
		);

	}]);
})();