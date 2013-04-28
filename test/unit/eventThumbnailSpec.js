'use strict';

/* jasmine specs for directives go here */

describe('eventThumbnail', function() {
    var $httpBackend, el, el2;

    beforeEach(module('eventsApp'));

    beforeEach(module('partials/directives/eventThumbnail.html'))

    beforeEach(inject(function($compile, $rootScope, $injector) {
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', '/partials/directives/eventThumbnail.html').respond('<div class="replacement" ng-click="showDetails()">{{event.name}}</div>');

        var scope = $rootScope.$new();

        scope.event = {name: 'Event Name'};
        scope.navigateToDetails = function() { console.log('hi'); }

        el = angular.element('<event-thumbnail event="event" show-details="navigateToDetails(event)"/>');
        $compile(el)(scope);
        $httpBackend.flush();
        scope.$digest();
    }));

    it('should bind to the scope\'s event', function() {
        expect(el.text()).toEqual('Event Name');

        var ch = el.children();
        ch.click();


        console.log('outer html: ' + el[0].outerHTML);
    });
});
