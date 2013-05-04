'use strict';

describe('eventThumbnail', function() {
    var el, stubNavigateToDetails;

    beforeEach(module('eventsApp'));
    beforeEach(module('partials/directives/eventThumbnail.html'));

    beforeEach(inject(function($compile, $rootScope) {
        // set up scope
        var scope = $rootScope;
        scope.event = {name: 'Event Name', date: '223', time: '334', location: {address: '1231', city: '1414', province: '1515'}};
        stubNavigateToDetails = sinon.stub();
        scope.navigateToDetails = stubNavigateToDetails;

        // create and compile directive
        el = angular.element('<event-thumbnail event="event" show-details="navigateToDetails(event)"/>');
        $compile(el)(scope);
        scope.$digest();
    }));

    it('should bind to the scope\'s event', function() {
        el.click();

        expect(stubNavigateToDetails.called).toBe(true);
    });

    it('should bind the data', function() {
        expect(el.text()).toContain('Event Name');
        expect(el.text()).not.toContain('{{');
        expect(el.find('.row').eq(3).text()).toContain('Location: 1231');
    });
});
