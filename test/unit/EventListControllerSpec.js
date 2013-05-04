'use strict';

describe('EventListController', function() {
    var scope, $controllerProvider, mockEventData, ctrl;

    beforeEach(module("eventsApp"));

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        mockEventData = sinon.stub({getAllEvents: function() {}});
        $controllerProvider = $controller;
    }));

    it('should set the scope events to the result of eventData.getAllEvents', function() {
        mockEventData.getAllEvents.returns(35);

        ctrl = $controllerProvider("EventListController", {$scope: scope, $location: {}, eventData: mockEventData});

        expect(scope.events).toBe(35);
    });

    it('should navigate to the correct url when navigateToDetails is called', function() {
        var mocklocation = sinon.stub({url: function() {}});
        ctrl = $controllerProvider("EventListController", {$scope: scope, $location: mocklocation, eventData: mockEventData});
        var event = {id: 23};

        scope.navigateToDetails(event);

        expect(mocklocation.url.calledWith("/event/23")).toBe(true);
    })

});