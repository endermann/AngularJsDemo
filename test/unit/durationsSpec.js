'use strict';

describe('durations', function() {

    beforeEach(module('eventsApp'));

    it('should replace a number with the correct duration', inject(function(durationsFilter) {
        expect(durationsFilter(1)).toEqual('Half Hour');
    }))
})