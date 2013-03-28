'use strict';

eventsApp.controller('EventController',
    function EventController($scope, $routeParams, userData, $location, durations, authenticationService, eventResource) {
        $scope.event = eventResource.get({id:parseInt($routeParams.eventId)});

        $scope.getDuration = function (duration) {
            return durations.getDuration(duration);
        };

        $scope.editEvent = function () {
            $location.url('/events/edit/' + $scope.event.id);
        };

        $scope.editSession = function (session) {
            $location.url('/events/' + $scope.event.id + '/sessions/edit/' + session.id);
        };

        $scope.createNewSession = function (eventId) {
            $location.url("/events/" + eventId + "/sessions/new")
        };

        $scope.allowUserToEditEvent = function () {
            return authenticationService.getCurrentUserName() === $scope.event.creator
        };

        $scope.allowUserToEditSession = function (session) {
            return authenticationService.getCurrentUserName() === session.creator
        };


        $scope.getSessionCreatorName = function (userName) {
            if (!userName) {
                return "";
            }
            return _.findWhere(userData.users, {userName:userName}).name;
        };

        $scope.upVoteSession = function(session) {
            if (!authenticationService.isAuthenticated()) {
                $location.url('/login');
            }
            session.upVoteCount++;
        };

        $scope.downVoteSession = function(session) {
            if (!authenticationService.isAuthenticated()) {
                $location.url('/login');
            }
            session.upVoteCount--;
        };
    }
);