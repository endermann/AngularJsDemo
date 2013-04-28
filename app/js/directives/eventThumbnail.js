'use strict';

eventsApp .directive('eventThumbnail', function () {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "/partials/directives/eventThumbnail.html",
//        template: '<div class="replacement" ng-click="showDetails()">{{event.name}}</div>',
        scope: {
            event: '=',
            showDetails: '&'
        }
    }
});