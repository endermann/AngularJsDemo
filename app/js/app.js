'use strict';


angular.module('eventsApp', ['eventsApp.filters', 'eventsApp.services', 'eventsApp.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/events', {templateUrl: '/partials/eventList.html', controller: EventListController});
    $routeProvider.when('/events/:eventId/sessions/new', {templateUrl: '/partials/newSession.html', controller: NewSessionController});
    $routeProvider.when('/event/:eventId', {templateUrl: '/partials/event.html', controller: EventController});
    $routeProvider.when('/events/new', {templateUrl: '/partials/newEvent.html', controller: NewEventController});
    $routeProvider.otherwise({redirectTo: '/view1'});
    $locationProvider.html5Mode(true);
  }]);
