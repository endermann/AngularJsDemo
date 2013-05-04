'use strict';

describe('eventThumbnail', function() {
    var el, stubShowDetails;

    beforeEach(module('eventsApp'));
    beforeEach(module('partials/directives/eventThumbnail.html'));

    beforeEach(inject(function($compile, $rootScope) {
        // set up scope
        var scope = $rootScope;
        scope.event = {name: 'Event Name', date: '223', time: '334', location: {address: '1234', city: '1414', province: '1515'}};
        stubShowDetails = sinon.stub();
        scope.myShowDetails = stubShowDetails;

        // create and compile directive
        el = angular.element('<event-thumbnail event="event" show-details="myShowDetails(event)" />');
        $compile(el)(scope);
        scope.$digest();
        console.log(el[0].outerHTML);
    }));

    it('should bind the data', function() {
        expect(el.text()).toContain('Event Name');
    });

    it('should bind to the scope\'s event', function() {
        el.click();

        expect(stubShowDetails.called).toBe(true);
    });
});
