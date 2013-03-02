'use strict';

function EventListController($scope, eventData) {
    $scope.events = eventData.events;
}
EventListController.$inject = ['$scope', 'eventData'];


function EventController($scope, $routeParams, eventData) {
    $scope.event = _.findWhere(eventData.events, {id: parseInt($routeParams.eventId)});
}
EventController.$inject = ['$scope', '$routeParams', 'eventData'];


function NewEventController($scope, eventData) {
    $scope.event = {};

    $scope.saveEvent = function(event) {
        eventData.events.push(event);
    }
}
NewEventController.$inject = ['$scope', 'eventData'];


function NewSessionController($scope, eventData, $routeParams) {
    $scope.event = _.findWhere(eventData.events, {id: parseInt($routeParams.eventId)});

    $scope.session = {}

    $scope.saveSession = function(session) {
        $scope.event.sessions.push(session);
    }
}
NewSessionController.$inject = ['$scope', 'eventData', '$routeParams'];
