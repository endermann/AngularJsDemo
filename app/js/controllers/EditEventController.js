'use strict';

eventsApp.controller('EditEventController',
    function EditEventController($scope, eventData, $location, $routeParams, eventResource, authenticationService) {
        var event = {};
        if (!authenticationService.isAuthenticated()) {
            $location.url('/login');
            return;
        }

        $scope.editingEvent = $location.$$url.indexOf('/events/edit') > -1;

        if ($scope.editingEvent) {
            event = eventResource.get({id:$routeParams.eventId}, function(event) {
                if (authenticationService.getCurrentUserName() != event.creator) {
                    $location.url('/login');
                }
            });
        }

        $scope.event = event;

        $scope.saveEvent = function (event, form) {
            if (!form.$valid) return;

            if ($scope.editingEvent) {
                saveEvent(event);
            } else {
                saveNewEvent(event);
            }
        };

        $scope.cancelEdit = function () {
            $location.url("/events");
        };

        function saveNewEvent(event) {
            eventResource.queryAll(function(events) {
                event.creator = authenticationService.getCurrentUserName();
                event.id = eventData.getNextEventId(events);
                event.sessions = [];
                saveEvent(event);
            });
        }

        function saveEvent(event) {
            eventResource.save(event);
            $location.url('/event/' + event.id)
        }


    }
);