'use strict';

eventsApp.controller('LoginController',
    function LoginController($scope, $location, userResource, authenticationService) {
        $scope.user = {userName:"", password:""};
        $scope.login = function () {
            userResource.get({userName:$scope.user.userName}, function (user) {
                if (!!user && user.password === $scope.user.password) {
                    authenticationService.setCurrentUser(user);
                    $location.url('/events');
                }
            });
        };
    }
);