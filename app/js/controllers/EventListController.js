'use strict';

eventsApp.controller('EventListController',
    function EventListController($scope, $location, eventData, $locale, dateFilter) {
        console.log($locale, dateFilter(new Date(), $locale.shortDate));
        $scope.events = eventData.getAllEvents();

        $scope.navigateToDetails = function (event) {
            $location.url('/event/' + event.id);
        };
    }

);