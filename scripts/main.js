(function () {
    var Blog = function(header, author, team, date, text, imgLinks, index) {
        this.header = header;
        this.author = author;
        this.team   = team;
        this.date   = date; //should be a Date object, for different Date formats
        this.text   = text;
        this.links  = imgLinks;
        this.index  = index;
    }

    var Member = function(name, grade, team, portrait) {
        this.name     = name;
        this.grade    = grade;
        this.team     = team;
        this.portrait = portrait;
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

    /* Navigation bar routing. */
    module.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'pages/blog.html'

        }).
        when('/posts/:blogId', {
            templateUrl: 'pages/blog-post.html',
            controller: 'BlogDetailCtrl'
        }).
        when('/roster', {
            templateUrl: 'pages/roster-table.html',
            controller: 'BlogController'
        }).
        when('/contact', {
            templateUrl: 'pages/contact.html',
        }).
        otherwise({
            redirectTo: '/'
        });
    }]);

    module.service('ParseJSONService', function($http) {
        this.getParsedJSON = function() {
            var promise = $http.get("text-content/blogs.json")
                .then(function (response) {
                    return response.data;
            });
            return promise;
        }
    });
    
    module.controller("BlogController", function($scope, ParseJSONService) {
        $scope.blogs = [];
        $scope.members = [];
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
                      , i   //blog index
                    )
                );
            }
            for (var i = 0; i < parsedJSON.members.length; i++) {
                var member = parsedJSON.members[i];
                $scope.members.push(new Member(
                      member.name
                    , member.grade
                    , member.team
                    , member.portrait)
                );
            }

            //pagination
            $scope.maxBlogs = 5;
            $scope.currentPage = 0;
            $scope.numPages = function () {
                return Math.ceil($scope.blogs.length / $scope.maxBlogs);
            }

        });
    });

    /* Makes the index of the clicked blog accessible so that the appropriate post is displayed. */
    module.controller("BlogDetailCtrl", ['$scope', '$routeParams',function($scope, $routeParams) {
        $scope.blog_id = $routeParams.blogId;
    }]);


    module.directive("isoTime", function() {
        return {
            link: function (scope, element, attrs) {
                var time = attrs.myIsoTime;
                attrs.$set('timedate', time);
            }
        }
    });

    //pagination
    module.filter("startFrom", function () {
        return function (input, start) {
            start = +start; //parse to int
            return input.slice(start);
        }
    });
})();

