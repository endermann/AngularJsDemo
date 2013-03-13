'use strict';

function MainMenuController($scope, authenticationService) {
    $scope.user = {};
    $scope.$watch(function () {
        return authenticationService.getCurrentUserName();
    }, function () {
        $scope.user = authenticationService.getCurrentUser();
    });

    $scope.isAuthenticated = function () {
        return authenticationService.isAuthenticated();
    };

    $scope.logout = function () {
        authenticationService.setCurrentUser({});
    };
}
MainMenuController.$inject = ['$scope', 'authenticationService'];

function EventListController($scope, eventData, $location, eventResource) {
    $scope.events = eventData.events;

    $scope.navigateToDetails = function (event) {
        $location.url('/event/' + event.id);
    };
}
EventListController.$inject = ['$scope', 'eventData', '$location', 'eventResource'];


function EventController($scope, $routeParams, eventData, userData, $location, durations, authenticationService) {
    $scope.event = _.findWhere(eventData.events, {id:parseInt($routeParams.eventId)});
    console.log($scope.event);
    $scope.getDuration = function (duration) {
        return durations.getDuration(duration);
    };
    //$scope.eventTrack = getDuration(event.duration);

    $scope.editEvent = function () {
        $location.url('/events/edit/' + $scope.event.id);
    };

    $scope.createNewSession = function (eventId) {
        $location.url("/events/" + eventId + "/sessions/new")
    };

    $scope.allowUserToEditEvent = function () {
        return authenticationService.getCurrentUserName() === $scope.event.creator
    };

    $scope.getSessionCreatorName = function (userName) {
        if (!userName) {
            return "";
        }
        console.log(userName);
        console.log(userData.users);
        return _.findWhere(userData.users, {userName:userName}).name;
    };
}
EventController.$inject = ['$scope', '$routeParams', 'eventData', 'userData', '$location', 'durations', 'authenticationService'];


function EditEventController($scope, eventData, $location, $routeParams, eventResource, authenticationService) {
    var event = {};
    if (!authenticationService.isAuthenticated()) {
        $location.url('/login');
        return;
    }

    $scope.editingEvent = $location.$$url.indexOf('/events/edit') > -1;

    if ($scope.editingEvent) {
        event = _.findWhere(eventData.events, {id:parseInt($routeParams.eventId)});
        if (authenticationService.getCurrentUserName() != event.creator) {
            $location.url('/login');
            return;
        }
    }

    $scope.event = event;

    $scope.saveEvent = function (event, form) {
        if (form.$valid) {
            event.creator = authenticationService.getCurrentUserName();
            if (!$scope.editingEvent) {
                event.id = eventData.getNextId();
                eventData.events.push(event);
            }
            eventResource.save(event);
            $location.url('/event/' + event.id)
        }
    };

    $scope.cancelEvent = function () {
        $location.url("/events");
    };
}
EditEventController.$inject = ['$scope', 'eventData', '$location', '$routeParams', 'eventResource', 'authenticationService'];


function NewSessionController($scope, eventData, $routeParams, eventResource, $location, authenticationService) {
    if (!authenticationService.isAuthenticated()) {
        $location.url('/login');
        return;
    }

    $scope.event = _.findWhere(eventData.events, {id:parseInt($routeParams.eventId)});

    $scope.session = {}

    $scope.saveSession = function (session) {
        session.creator = authenticationService.getCurrentUserName();
        $scope.event.sessions.push(session);
        eventResource.save($scope.event);
        $location.url('/event/' + $routeParams.eventId);
    }
}
NewSessionController.$inject = ['$scope', 'eventData', '$routeParams', 'eventResource', '$location', 'authenticationService'];

function EditProfileController($scope, $location, userResource, authenticationService) {
    $scope.user = {};
    $scope.$watch(function () {
        return authenticationService.getCurrentUserName();
    }, function () {
        $scope.user = authenticationService.getCurrentUser();
    });

    $scope.isAuthenticated = function () {
        return authenticationService.isAuthenticated();
    };

    $scope.registerUser = function (user, form) {
        if (!form.$valid) {
            return;
        }
        userResource.save(user);
        authenticationService.setCurrentUser(user);
        $location.url('/viewProfile/' + user.userName);
    };

    $scope.updateProfile = function (user, form) {
        if (!form.$valid) {
            return;
        }
        userResource.save(user);
        authenticationService.setCurrentUser(user);
        $location.url('/viewProfile/' + user.userName);
    };
}
EditProfileController.$inject = ['$scope', '$location', 'userResource', 'authenticationService'];

function ViewProfileController($scope, $routeParams, userResource, authenticationService) {
    userResource.get({userName:$routeParams.userName}, function (user) {
        $scope.user = user;
    });
}
ViewProfileController.$inject = ['$scope', '$routeParams', 'userResource', 'authenticationService'];

function LoginController($scope, $location, userResource, authenticationService) {
    $scope.user = {userName:"", password:""};
    $scope.login = function () {
        userResource.get({userName:$scope.user.userName}, function (user) {
            if (!!user && user.password === $scope.user.password) {
                authenticationService.setCurrentUser(user);
                $location.url('/events');
            }
        });
    };
}
LoginController.$inject = ['$scope', '$location', 'userResource', 'authenticationService'];
