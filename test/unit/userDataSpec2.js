'use strict';

describe('userData', function() {
    var userDataSvc, mockUserResource;

    beforeEach(module('eventsApp'));

    beforeEach(function() {
        mockUserResource = sinon.stub({get: function() {}, save: function() {}});
        module(function($provide) {
            $provide.value('userResource', mockUserResource);
        });
    })


    describe('getUser', function() {

        it('should call resource.get with the username', function() {
            inject(function(userData) {
                userData.getUser('bob');

                expect(mockUserResource.get.args[0][0]).toEqual({userName: 'bob'});
            });
        } );
        it('should call resource.get with a callback as the second parameter', inject(function(userData) {
            userData.getUser('bob');

            expect(typeof mockUserResource.get.args[0][1]).toBe('function');
        }));
    });

    describe('save', function() {

        it('should call resource.save with the username', inject(function(userData) {
            userData.save('some value');

            expect(mockUserResource.save.calledWith('some value')).toBe(true);
        }));
    });
});