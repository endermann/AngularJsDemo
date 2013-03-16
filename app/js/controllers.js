'use strict';

function MainMenuController($scope, authenticationService) {
    $scope.user = {};
    $scope.$watch(authenticationService.getCurrentUserName, function () {
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
    $scope.events = eventResource.queryAll();

    $scope.navigateToDetails = function (event) {
        $location.url('/event/' + event.id);
    };
}
EventListController.$inject = ['$scope', 'eventData', '$location', 'eventResource'];


function EventController($scope, $routeParams, eventData, userData, $location, durations, authenticationService, eventResource) {
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
            return;
        }
    };

    $scope.downVoteSession = function(session) {
        if (!authenticationService.isAuthenticated()) {
            $location.url('/login');
            return;
        }
    };
}
EventController.$inject = ['$scope', '$routeParams', 'eventData', 'userData', '$location', 'durations', 'authenticationService', 'eventResource'];


function EditEventController($scope, eventData, $location, $routeParams, eventResource, authenticationService) {
    var event = {};
    if (!authenticationService.isAuthenticated()) {
        $location.url('/login');
        return;
    }

    $scope.editingEvent = $location.$$url.indexOf('/events/edit') > -1;
    console.log($scope.editingEvent);

    if ($scope.editingEvent) {
        var event = eventResource.get({id:$routeParams.eventId}, function(event) {
            if (authenticationService.getCurrentUserName() != event.creator) {
                $location.url('/login');
                return;
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
            saveEvent(event);
        });
    }

    function saveEvent(event) {
        eventResource.save(event);
        $location.url('/event/' + event.id)
    }


}
EditEventController.$inject = ['$scope', 'eventData', '$location', '$routeParams', 'eventResource', 'authenticationService'];


function EditSessionController($scope, eventData, $routeParams, eventResource, $location, authenticationService) {
    if (!authenticationService.isAuthenticated()) {
        $location.url('/login');
        return;
    }

    $scope.editingSession = $location.$$url.indexOf('/sessions/edit') > -1;
    $scope.event = eventResource.get({id:parseInt($routeParams.eventId)}, function(event) {
        $scope.session = _.findWhere(event.sessions, {id:parseInt($routeParams.sessionId)});
    });

    $scope.saveSession = function (session) {
        session.creator = authenticationService.getCurrentUserName();
        session.creatorName = authenticationService.getCurrentUser().name;
        if (!$scope.editingSession) {
            session.id = eventData.getNextSessionId($scope.event);
            $scope.event.sessions.push(session);
        }
        eventResource.save($scope.event);
        $location.url('/event/' + $routeParams.eventId);
    }
}
EditSessionController.$inject = ['$scope', 'eventData', '$routeParams', 'eventResource', '$location', 'authenticationService'];

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
