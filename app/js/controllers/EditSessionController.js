'use strict';

eventsApp.controller('EditSessionController',
    function EditSessionController($scope, eventData, $routeParams, eventResource, $location, authenticationService) {
        if (!authenticationService.isAuthenticated()) {
            $location.url('/login');
            return;
        }

        $scope.editingSession = $location.$$url.indexOf('/sessions/edit') > -1;
        $scope.session = {};

        if(!$scope.editingSession) {
            $scope.session.duration = "1";
        }

        $scope.event = eventResource.get({id:parseInt($routeParams.eventId)}, function(event) {
            if($scope.editingSession) {
                $scope.session = _.findWhere(event.sessions, {id:parseInt($routeParams.sessionId)});
            }
        });

        $scope.saveSession = function (session, form) {
            if (!form.$valid) return;

            session.creator = authenticationService.getCurrentUserName();
            session.creatorName = authenticationService.getCurrentUser().name;
            session.duration = parseInt(session.duration);
            if (!$scope.editingSession) {
                session.id = eventData.getNextSessionId($scope.event);
                session.upVoteCount = 0;
                $scope.event.sessions.push(session);
            }
            eventResource.save($scope.event);
            $location.url('/event/' + $routeParams.eventId);
        }
    }
);