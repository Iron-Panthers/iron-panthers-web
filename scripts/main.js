(function () {
    var Blog = function(header, author, team, date, text, imgLinks, index) {
        this.header = header;
        this.author = author;
        this.team   = team;
        this.date   = date; //should be a Date object, for different Date formats
        this.text   = text;
        this.links  = imgLinks
        this.index  = index;
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

    var module = angular.module("ironBlog", ['ngRoute']);

    module.service('ParseJSONService', function($http) {
        this.getParsedJSON = function() {
            var promise = $http.get("http://jpdstan.github.io/iron-panthers-web/text-content/blogs.json")
                .then(function (response) {
                    return response.data;
            });
            return promise;
        }
    });
    module.controller("BlogController", function($scope, ParseJSONService) {
        $scope.blogs = [];
        ParseJSONService.getParsedJSON().then(function (data) {
            var parsedJSON = data;

            for (var i = 0; i < parsedJSON.blogs.length; i++) {
                var blog = parsedJSON.blogs[i];

                $scope.blogs.push(new Blog(
                        blog.header
                      , blog.author
                      , blog.team
                      , new Date(blog.date[0], blog.date[1], blog.date[2])
                      , blog.text
                      , blog.links
                      , blog.index
                    )
                );
            }
        });
    });

    /* Navigation bar routing. */
    module.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'pages/blog.html',
            controller: 'BlogController'
        }).
        when('/posts/:blogId', {
            templateUrl: 'pages/blog-post.html',
            controller: 'BlogDetailCtrl'
        }).
        when('/roster', {
            templateUrl: 'pages/roster-table.html',
            controller: 'RosterController'
        }).
        when('/contact', {
            templateUrl: 'pages/contact.html',
        }).
        otherwise({
            redirectTo: '/'
        });
    }]);

    /* Makes the index of the clicked blog accessible so that the appropriate post is displayed. */
    module.controller("BlogDetailCtrl", ['$scope', '$routeParams',function($scope, $routeParams) {
        $scope.blog_id = $routeParams.blogId;
    }]);

    module.controller("RosterController", function($scope, ParseJSONService) {
        $scope.names = [];
         ParseJSONService.getParsedJSON().then(function (data) {
            var parsedJSON = data;

            for (var i = 0; i < parsedJSON.names.length; i++) {
                var name = parsedJSON.names[i];
                $scope.names.push(name);
            }
        });
    });

    module.controller("NavigationController", function() {
        this.page = 1;

        this.isPage = function(checkPage) {
            return this.page === checkPage;
        };

        this.setPage = function(selectedPage) {
            this.page = selectedPage;
        }; 
    });

    module.directive("isoTime", function() {
        return {
            link: function (scope, element, attrs) {
                var time = attrs.myIsoTime;
                attrs.$set('timedate', time);
            }
        }
    });
})();
