'use strict';

describe('userResource', function() {
    var $httpBackend;

    beforeEach(module('eventsApp'));

    beforeEach(inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');

    }));

    describe('get', function() {

        it('should issue a GET request to /data/user', inject(function(userResource) {
            $httpBackend.when('GET', '/data/user/bob').respond({name: 'Robert'});
            var user = userResource.get({userName: 'bob'});
            $httpBackend.flush();

            expect(user.name).toBe('Robert');
        }));
    })

});