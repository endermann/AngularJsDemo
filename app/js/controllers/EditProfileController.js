'use strict';

eventsApp.controller('EditProfileController',
    function EditProfileController($scope, $location, userResource, authenticationService) {
        $scope.user = {};
        $scope.$watch(function () {
            return authenticationService.getCurrentUserName();
        }, function () {
            $scope.user = authenticationService.getCurrentUser();
        });

        $scope.isAuthenticated = function () {
            return authenticationService.isAuthenticated();
        };

        $scope.registerUser = function (user, form) {
            if (!form.$valid) {
                return;
            }
            userResource.save(user);
            authenticationService.setCurrentUser(user);
            $location.url('/viewProfile/' + user.userName);
        };

        $scope.updateProfile = function (user, form) {
            if (!form.$valid) {
                return;
            }
            userResource.save(user);
            authenticationService.setCurrentUser(user);
            $location.url('/viewProfile/' + user.userName);
        };
    }
);