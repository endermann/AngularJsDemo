'use strict';

xdescribe('userData', function() {
    var userDataSvc, mockUserResource;

    beforeEach(module('eventsApp'));

    beforeEach(inject(function(userData, userResource) {
        mockUserResource = userResource;
        userResource.get = sinon.stub();
        userResource.save = sinon.stub();
        userDataSvc = userData;
    }));

    describe('getUser', function() {

        it('should call resource.get with the username', inject(function(userData) {
            userData.getUser('bob');

            expect(mockUserResource.get.args[0][0]).toEqual({userName: 'bob'});
        }));
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