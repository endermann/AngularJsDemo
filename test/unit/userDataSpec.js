'use strict';

describe('userData', function() {

    beforeEach(module('eventsApp'));

    describe('getUser', function() {

        it('should call resource.get with the username', inject(function(userData) {
            userData.getUser('username');

            expect()
        }));
    });
});