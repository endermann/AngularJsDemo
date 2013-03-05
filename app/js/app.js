'use strict';


angular.module('eventsApp', ['eventsApp.filters', 'eventsApp.services', 'eventsApp.directives', 'ngResource']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/events', {templateUrl: '/partials/eventList.html', controller: EventListController});
    $routeProvider.when('/events/:eventId/sessions/new', {templateUrl: '/partials/newSession.html', controller: NewSessionController});
    $routeProvider.when('/event/:eventId', {templateUrl: '/partials/event.html', controller: EventController});
    $routeProvider.when('/events/new', {templateUrl: '/partials/newEvent.html', controller: NewEventController});
    $routeProvider.when('/register', {templateUrl: '/partials/editProfile.html', controller: EditProfileController});
    $routeProvider.when('/editProfile', {templateUrl: '/partials/editProfile.html', controller: EditProfileController});
    $routeProvider.when('/login', {templateUrl: '/partials/login.html', controller: LoginController});
    $routeProvider.otherwise({redirectTo: '/events'});
    $locationProvider.html5Mode(true);
  }]);
