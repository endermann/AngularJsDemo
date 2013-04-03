'use strict';

eventsApp.factory('eventData', function (eventResource, authService, $q) {
    return {
        getEvent: function(eventId) {
//            var deferred = $q.defer();
            var r = eventResource.get({id:eventId}, function(event) {
//                deferred.resolve(event);
            });
//            console.log('hi');
//            console.log(r);
//            return deferred.promise;
            return r;
        },
        getAllEvents: function(callback) {
            return eventResource.queryAll(callback);
        },
        getNextSessionId:function (event) {
            var max = 0;
            for (var idx = 0; idx < event.sessions.length; idx++) {
                if (event.sessions[idx].id > max) {
                    max = event.sessions[idx].id;
                }
            }
            return max+1;
        },
        save: function(event) {
            eventResource.queryAll(function(events) {
                event.creator = authService.getCurrentUserName();
                event.id = getNextEventId(events);
                event.sessions = [];
                eventResource.save(event);
            });
        }
    };

    function getNextEventId(events) {
        var max = 0;
        for (var idx = 0; idx < events.length; idx++) {
            if (events[idx].id > max) {
                max = events[idx].id;
            }
        }
        return max+1;
    }
});