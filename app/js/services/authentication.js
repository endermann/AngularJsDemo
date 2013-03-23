'use strict';

eventsApp.factory('authenticationService', function () {
    var currentUser = {};

    function cloneObject(object) {
        return JSON.parse(JSON.stringify(object));
    };

    return {
        getCurrentUserName:function () {
            return currentUser.userName
        },
        getCurrentUser:function () {
            return cloneObject(currentUser);
        },
        setCurrentUser:function (user) {
            currentUser = cloneObject(user);
        },
        isAuthenticated:function() {
            return !!currentUser && !!currentUser.userName;
        }
    };
})