(function () {
    var Blog = function(header, author, team, date, text, imgLinks) {
        this.header = header;
        this.author = author;
        this.team   = team;
        this.date   = date; //should be a Date object, for different Date formats
        this.text   = text;
        this.links  = imgLinks
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

    module.service('ParseJSONService', function($http) {
        this.getParsedJSON = function() {
            var promise = $http.get("/text-content/blogs.json")
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

            for (var i = 0; i < parsedJSON.blogs.length; i++)
            {
                var blog = parsedJSON.blogs[i];

                $scope.blogs.push(new Blog(
                        blog.header
                      , blog.author
                      , blog.team
                      , new Date(blog.date[0], blog.date[1], blog.date[2])
                      , blog.text
                      , blog.links
                    )
                );
            }
        });
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
