(function () {
	var Blog = function(header, author, team, date, text) {
		this.header = header;
		this.author = author;
		this.team   = team;
		this.date   = date;	//should be a Date object, for different Date formats
		this.text   = text;
	}

	//TODO - Do we want to be American or international?
	Blog.prototype.getDatePlain = function() {
		var monthNames = [
			"January", "February", "March", "April", "May", "June"
		  , "July", "August", "September", "October", "November", "December"
		];

		var month = monthNames[this.date.getMonth()]
		var day   = this.date.getDate();
		var year  = this.date.getFullYear();

		return month + " " + day + ", " + year;
	}

	var module = angular.module("ironBlog", []);

	module.directive("isoTime", function() {
		return {
			link: function (scope, element, attrs) {
				var time = attrs.myIsoTime;
				attrs.$set('timedate', time);
				//fill in the datetime with the correct time format
			}
		}
	});

	readText("#/text-content/blogs.json");

	module.controller("BlogController", ["$scope", function($scope) {
		$scope.blogs = [];
		$scope.blogs.push(new Blog(
				"Header"
			  , "Author"
			  , "Team"
			  , new Date(2014, 6, 1)
			  , "Text"
			)
		);
		$scope.blogs.push(new Blog(
				"Header2"
			  , "Author2"
			  , "Team2"
			  , new Date(2014, 5, 30)
			  , "Text2"
			)
		);

	}]);
})();

function parseBlogs() {

}

function readText(filename) {
	var xhr = new XMLHttpRequest();
	xhr.onload = function() {
		console.log(this.responseText);
	}
	xhr.open("get", filename, true);
	xhr.send();
}
