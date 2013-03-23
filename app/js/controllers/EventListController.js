'use strict';

eventsApp.controller('EventListController',
    function EventListController($scope, $location, eventResource) {
        $scope.events = eventResource.queryAll();

        $scope.navigateToDetails = function (event) {
            $location.url('/event/' + event.id);
        };
    }

);