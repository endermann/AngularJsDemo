'use strict';

function MainMenuController($scope, authenticationService) {
    $scope.user = {};
    $scope.$watch(function() { return authenticationService.getCurrentUserName(); }, function() {  $scope.user = authenticationService.getCurrentUser(); });

    $scope.isAuthenticated = function () {
        var currentUser = authenticationService.getCurrentUser();
        return !!currentUser && !!currentUser.userName;
    };
    $scope.logout = function () {
        authenticationService.setCurrentUser({});
    };
}
MainMenuController.$inject = ['$scope', 'authenticationService'];

function EventListController($scope, eventData, $location, eventResource) {
    $scope.events = [];
    eventResource.queryAll(function(events) {
        $scope.events = events;
    });

    var s = '[{"id":1,"name":"Code Camp","date":"03/15/2013","time":"9:00am - 5:00pm","location":{"address":"123 Wall St","city":"New York","province":"NY"},"imageUrl":"http://blog.laptopmag.com/wpress/wp-content/uploads/2012/08/Code-Camp_sf.jpg","sessions":[{"id":1,"name":"How To Program","track":1,"duration":2,"abstract":"this session will teach you to program"},{"id":2,"name":"How To Dance","track":2,"duration":3,"abstract":"this session will teach you to dance"},{"id":3,"name":"How To Sing","track":1,"duration":1,"abstract":"this session will teach you to sing"}]},{"id":1,"name":"Code Camp","date":"03/15/2013","time":"9:00am - 5:00pm","location":{"address":"123 Wall St","city":"New York","province":"NY"},"imageUrl":"http://blog.laptopmag.com/wpress/wp-content/uploads/2012/08/Code-Camp_sf.jpg","sessions":[{"id":1,"name":"How To Program","track":1,"duration":2,"abstract":"this session will teach you to program"},{"id":2,"name":"How To Dance","track":2,"duration":3,"abstract":"this session will teach you to dance"},{"id":3,"name":"How To Sing","track":1,"duration":1,"abstract":"this session will teach you to sing"}]}]';

    $scope.stuff = function() {
        var q = eventResource.queryAll(function() {
            console.log(q);
        });
        var q2 = eventResource.get({id:1});
        console.log(q2);
        console.log(q2.location);
        console.log(q);
    }
//        var events = eventResource.get({id: 1}, function () {
//         if (!!user && user.password === $scope.user.password) {
//         authenticationService.setCurrentUser(user);
//         $location.url('/events');
//         }
//         });

    $scope.navigateToDetails = function(event) {
        $location.url('/event/' + event.id);
    }
}
EventListController.$inject = ['$scope', 'eventData', '$location', 'eventResource'];


function EventController($scope, $routeParams, eventData, $location, durations) {
    $scope.event = _.findWhere(eventData.events, {id: parseInt($routeParams.eventId)});
    $scope.getDuration = function(duration) {
        return durations.getDuration(duration);
    }
    //$scope.eventTrack = getDuration(event.duration);

    $scope.createNewSession = function(eventId) {
        $location.url("/events/" + eventId + "/sessions/new")
    }
}
EventController.$inject = ['$scope', '$routeParams', 'eventData', '$location', 'durations'];


function NewEventController($scope, eventData, $location, eventResource) {
    $scope.event = {};

    $scope.saveEvent = function(event, form) {
        if(form.$valid) {
            event.id = eventData.getNextId();
            console.log(event);
            eventData.events.push(event);
        }
        eventResource.save(event);
        console.dir(eventResource);

        console.dir(eventResource.get(1));
        console.log(eventResource.queryAll());

    }

    $scope.cancelEvent = function() {
        $location.url("/events");
    }
}
NewEventController.$inject = ['$scope', 'eventData', '$location', 'eventResource'];


function NewSessionController($scope, eventData, $routeParams) {
    $scope.event = _.findWhere(eventData.events, {id: parseInt($routeParams.eventId)});

    $scope.session = {}

    $scope.saveSession = function (session) {
        $scope.event.sessions.push(session);
    }
}
NewSessionController.$inject = ['$scope', 'eventData', '$routeParams'];

function EditProfileController($scope, $location, userResource, authenticationService) {
    $scope.user = {};
    $scope.$watch(function() { return authenticationService.getCurrentUserName(); }, function() {  $scope.user = authenticationService.getCurrentUser(); });

    $scope.isAuthenticated = function () {
        var currentUser = authenticationService.getCurrentUser();
        return !!currentUser && !!currentUser.userName;
    };

    $scope.registerUser = function () {
        userResource.save( $scope.user);
        authenticationService.setCurrentUser($scope.user);
        $location.url('/events');
    };

    $scope.updateProfile = function () {
        userResource.save($scope.user);
        authenticationService.setCurrentUser($scope.user);
    };
}
EditProfileController.$inject = ['$scope', '$location', 'userResource', 'authenticationService'];

function LoginController($scope, $location, userResource, authenticationService) {
    $scope.user = {userName: "", password: ""};
    $scope.login = function () {
        userResource.get({userName: $scope.user.userName}, function (user) {
            if (!!user && user.password === $scope.user.password) {
                authenticationService.setCurrentUser(user);
                $location.url('/events');
            }
        });
    };
}
LoginController.$inject = ['$scope', '$location', 'userResource', 'authenticationService'];
