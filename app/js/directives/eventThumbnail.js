'use strict';

eventsApp .directive('eventThumbnail', function () {
    return {
        restrict: "E",
        templateUrl: "/partials/directives/eventThumbnail.html",
        scope: {
            event: '=',
            showDetails: '&'
        }
    }
});