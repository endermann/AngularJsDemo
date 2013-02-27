'use strict';

function EventListController($scope, eventData) {
    $scope.events = eventData.events;
}
EventListController.$inject = ['$scope', 'eventData'];


function EventController($scope, $routeParams, eventData) {
    $scope.event = _.findWhere(eventData.events, {id: parseInt($routeParams.eventId)});
}
EventController.$inject = ['$scope', '$routeParams', 'eventData'];
