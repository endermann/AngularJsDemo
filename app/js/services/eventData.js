'use strict';

eventsApp.factory('eventData', function () {
    return {
        getNextEventId:function (events) {
            var max = 0;
            for (var idx = 0; idx < events.length; idx++) {
                if (events[idx].id > max) {
                    max = events[idx].id;
                }
            }
            return max+1;
        },
        getNextSessionId:function (event) {
            var max = 0;
            for (var idx = 0; idx < event.sessions.length; idx++) {
                if (event.sessions[idx].id > max) {
                    max = event.sessions[idx].id;
                }
            }
            return max+1;
        }
    };
});