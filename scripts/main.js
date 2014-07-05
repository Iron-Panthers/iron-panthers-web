(function () {
    var Blog = function(header, author, team, date, text) {
        this.header = header;
        this.author = author;
        this.team   = team;
        this.date   = date; //should be a Date object, for different Date formats
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

    var parsedBlogs = parseBlogs();

    module.controller("BlogController", ["$scope", function($scope) {
        $scope.blogs = [];

        for (var i = 0; i < parsedBlogs.blogs.length; i++)
        {
            var blog = parsedBlogs.blogs[i];

            $scope.blogs.push(new Blog(
                    blog.header
                  , blog.author
                  , blog.team
                  , new Date(blog.date[0], blog.date[1], blog.date[2])
                  , blog.text
                )
            );
        }
    }]);
})();

function parseBlogs() {
    var json = 
        readText("http://fsxfreak.github.io/iron-panthers-web/text-content/blogs.json");
    return JSON.parse(json);
}

function readText(filename) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", filename, true);
    xhr.send();
    return this.responseText;
}
