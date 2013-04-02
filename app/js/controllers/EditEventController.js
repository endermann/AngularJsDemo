'use strict';

eventsApp.controller('EditEventController',
    function EditEventController($scope, eventData, $location, $routeParams, authService) {
        var event = {};
        if (!authService.isAuthenticated()) {
            $location.url('/login');
            return;
        }

        $scope.editingEvent = $location.$$url.indexOf('/events/edit') > -1;

        if ($scope.editingEvent) {
            event = eventData.getEvent($routeParams.eventId, setEventOrRedirectIfNotAuthorized);
        }

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

        function setEventOrRedirectIfNotAuthorized(event)  {
            if (authService.userCanEditEvent) {
                $scope.event = event;
            } else {
                $location.url('/login');
            }
        }

        function saveNewEvent(event) {
            eventData.saveEvent(event);
        }

        function saveEvent(event) {
            eventData.save(event);
            $location.url('/event/' + event.id)
        }


    }
);