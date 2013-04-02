'use strict';

eventsApp.controller('LoginController',
    function LoginController($scope, $location, userResource, authService) {
        $scope.user = {userName:"", password:""};
        $scope.login = function () {
            userResource.get({userName:$scope.user.userName}, function (user) {
                if (!!user && user.password === $scope.user.password) {
                    authService.setCurrentUser(user);
                    $location.url('/events');
                }
            });
        };
    }
);