'use strict';

eventsApp.controller('ViewProfileController',
    function ViewProfileController($scope, $routeParams, userResource) {
        userResource.get({userName:$routeParams.userName}, function (user) {
            $scope.user = user;
        });
    }
);