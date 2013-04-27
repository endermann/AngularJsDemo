'use strict';

/* jasmine specs for directives go here */

describe('eventThumbnail', function() {
    var $httpBackend, el, el2;

    beforeEach(module('eventsApp'));

    beforeEach(inject(function($injector, $compile, $rootScope) {
        $httpBackend = $injector.get('$httpBackend');
//        $httpBackend.when('GET', '/partials/directives/eventThumbnail.html').respond('<div ng-click="showDetails()">{{event.name}}</div>');
//        $httpBackend.when('GET', '/partials/directives/eventThumbnail.html').respond('<div><span>hi there</span></div>');

        var scope = $rootScope.$new();

        scope.evt = {name: 'hi'}

        el = angular.element('<event-thumbnail event="evt" show-details="somefunc(evt)" />');
//        el2 = $compile(el)(scope);
        scope.$digest();
    }));

    it('should print current version', function() {
//        inject(function($compile, $rootScope) {
//            var element = $compile('<event-thumbnail event="evt" show-details="somefunc(evt)"></span>')($rootScope);
//        debugger;
//            expect(el).toEqual('TEST_VER');
//            expect(el2[0].outerHTML).toEqual('TEST_VER');
//        });
    });
});
