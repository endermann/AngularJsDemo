'use strict';

eventsApp.controller('EditEventController',
    function EditEventController($scope, $location, $routeParams) {

        $scope.event = {};

        $scope.saveEvent = function (event, form) {
            if(form.$valid) {
                window.alert('event saved!');
            }
        };

        $scope.cancelEdit = function () {
            $location.url("/EventDetails.html");
        };

    }
);