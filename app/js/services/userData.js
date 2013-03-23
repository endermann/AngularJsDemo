'use strict';

eventsApp.factory('userData', ['userResource', function (userResource) {
    return {
        users:function () {
            return userResource.queryAll(function(users) {
                return users;
            });
        }
    };
}]);