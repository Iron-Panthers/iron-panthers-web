(function () {
    var Blog = function(header, author, team, date, paragraphs, imgLinks, index) {
        this.header = header;
        this.author = author;
        this.team   = team;
        this.date   = date; //should be a Date object, for different Date formats
        this.paragraphs = paragraphs;
        this.images  = imgLinks;
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

    var module = angular.module("ironBlog", ['ngRoute', 'ngSanitize']);

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

    module.service('ParseJSONService', function($http, $q) {
        this.getParsedJSON = function() {
            var deferred = $q.defer();
            /*var promise = $http.get("text-content/blogs.json")
                .then(function (response) {
                    return response.data;
            });*/
            $http.get("text-content/blogs.json").success(function (data, status) {
                deferred.resolve(data);
            }).error(function(data, status) {
                deferred.reject(data);
            });
            //return promise;
            return deferred.promise;
        }
    });
    
    module.controller("BlogController"
        , function($scope, ParseJSONService) {
            $scope.blogs = [];
            $scope.members = [];
            ParseJSONService.getParsedJSON().then(function (data) {
                var parsedJSON = data;

                var j = 0;
                for (var i = parsedJSON.blogs.length - 1; i >= 0; i--) {
                    var blog = parsedJSON.blogs[i];
                    $scope.blogs.push(new Blog(
                            blog.header
                          , blog.author
                          , blog.team
                          , new Date(blog.date[0], blog.date[1] - 1, blog.date[2])
                          , blog.paragraphs
                          , blog.images
                          , j++ //need to fix this logic, cannot permalink to a blog
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

                $scope.isMostRecent = function (index) {
                    return index === 0;  //this logic needs to be fixed, as well as in the for loop where Blog is constructed
                    //the most recent index should be the last index (blogs.length - 1)
                    //so we can permalink blogs
                }

                $scope.limitText = function(index) {
                    return $scope.isMostRecent(index) ? 400 : 200; 
                }
            });
        }
    );

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

    //scroll to top when click next/previous buttons
    module.directive("scrollOnClick", function() {
        return {
            restrict: 'A',
            link: function(scope, $elm) {
                $elm.on("click", function() {
                    $("body").animate({scrollTop: $elm.offset().top}, "slow");
                });
            }
        };
    });

    //pagination
    module.filter("startFrom", function () {
        return function (input, start) {
            start = +start; //parse to int
            return input.slice(start);
        }
    });
})();

function randomizeImage() {
    var totalBgImgs = 12;
    var img = Math.floor(Math.random() * totalBgImgs);
    var header = document.body.children[0];
    var path = "imgs/banners/banner" + img + ".jpg";
    header.style.backgroundImage = "url('" + path + "')";
}