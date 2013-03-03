'use strict';

function EventListController($scope, eventData, $location) {
    $scope.events = eventData.events;

    $scope.navigateToDetails = function(event) {
        $location.url('/event/' + event.id);
    }
}
EventListController.$inject = ['$scope', 'eventData', '$location'];


function EventController($scope, $routeParams, eventData, $location, durations) {
    $scope.event = _.findWhere(eventData.events, {id: parseInt($routeParams.eventId)});
    $scope.getDuration = function(duration) {
        return durations.getDuration(duration);
    }
    //$scope.eventTrack = getDuration(event.duration);

    $scope.createNewSession = function(eventId) {
        console.log('making new session');
        $location.url("/events/" + eventId + "/sessions/new")
    }
}
EventController.$inject = ['$scope', '$routeParams', 'eventData', '$location', 'durations'];


function NewEventController($scope, eventData, $location) {
    $scope.event = {};

    $scope.saveEvent = function(event, form) {
        if(form.$valid) {
            console.log(event);
            eventData.events.push(event);
        }
    }

    $scope.cancelEvent = function() {
        $location.url("/events");
    }
}
NewEventController.$inject = ['$scope', 'eventData', '$location'];


function NewSessionController($scope, eventData, $routeParams) {
    $scope.event = _.findWhere(eventData.events, {id: parseInt($routeParams.eventId)});

    $scope.session = {}

    $scope.saveSession = function(session) {
        $scope.event.sessions.push(session);
    }
}
NewSessionController.$inject = ['$scope', 'eventData', '$routeParams'];

function EditProfileController($scope) {

}
EditProfileController.$inject = ['$scope'];
