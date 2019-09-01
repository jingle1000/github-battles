var app = angular.module('main', ["ngRoute", "ui.grid"]);

app.controller('mainController', function ($rootScope, $http) {
    $rootScope.navIndex = "home";
});

app.controller("navController", function ($rootScope) {

});

app.controller("playersController", function ($rootScope, $http) {
    $rootScope.navIndex = "players";
    
    var init = function() {
        console.log("Players Controller Active");
        if (!$rootScope.users) {
            console.log("Adding Users");
            $rootScope.users = [];
            var initialUsers = [
                "https://api.github.com/users/mblayman",
                "https://api.github.com/users/jingle1000",
                "https://api.github.com/users/mostafa",
                "https://api.github.com/users/ErikEJ",
                "https://api.github.com/users/patoman007",
                "https://api.github.com/users/kunstmusik"
            ];
            initialUsers.forEach(url => {
                $http.get(url)
                    .then(function (res) {
                        addUser(res);
                    });
            });
        }
    };
    init();
    var addUser = function (res) {
        res.data.team = "unknown";
        res.data.changingTeamModal = false;
        $rootScope.users.push(res.data);
        console.log(res);
    };
    var showTeamChangeModal = function (index) {
        var curval = $rootScope.users[index].showTeamChangeModal;
        $rootScope.users[index].showTeamChangeModal = !curval;
    };
});

app.controller("teamsController", function ($rootScope) {
    $rootScope.navIndex = "teams";
});

app.controller("leaderboardController", function ($rootScope) {
    $rootScope.navIndex = "leaderboard";
});

app.directive("navbar", function () {
    return {
        templateUrl: "./directives/navbar.html",
        controller: "navController"
    };
});

app.directive("addUserAlert", function () {
    return {
        templateUrl: "./directives/add-user-alert.html"
    }
});

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "./routes/home.html",
            controller: "mainController"
        })
        .when("/players", {
            templateUrl: "./routes/players.html",
            controller: "playersController"
        })
        .when("/teams", {
            templateUrl: "./routes/teams.html",
            controller: "teamsController"
        })
        .when("/leaderboard", {
            templateUrl: "./routes/leaderboard.html",
            controller: "leaderboardController"
        })
        .otherwise({
            redirectTo: "/"
        });
});