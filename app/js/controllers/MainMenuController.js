'use strict';

eventsApp.controller('MainMenuController',
    function MainMenuController($scope, authenticationService) {
        $scope.user = {};
        $scope.$watch(authenticationService.getCurrentUserName, function () {
            $scope.user = authenticationService.getCurrentUser();
        });

        $scope.isAuthenticated = function () {
            return authenticationService.isAuthenticated();
        };

        $scope.logout = function () {
            authenticationService.setCurrentUser({});
        };
    }
);