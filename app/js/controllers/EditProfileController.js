'use strict';

eventsApp.controller('EditProfileController',
    function EditProfileController($scope, $location, userResource, authService) {
        $scope.user = {};
        $scope.$watch(function () {
            return authService.getCurrentUserName();
        }, function () {
            $scope.user = authService.getCurrentUser();
        });

        $scope.isAuthenticated = function () {
            return authService.isAuthenticated();
        };

        $scope.registerUser = function (user, form) {
            if (!form.$valid) {
                return;
            }
            userResource.save(user);
            authService.setCurrentUser(user);
            $location.url('/viewProfile/' + user.userName);
        };

        $scope.updateProfile = function (user, form) {
            if (!form.$valid) {
                return;
            }
            userResource.save(user);
            authService.setCurrentUser(user);
            $location.url('/viewProfile/' + user.userName);
        };
    }
);