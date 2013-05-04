'use strict';

describe('calendarHelper', function() {

    beforeEach(module('eventsApp'));

    describe('getMonthName', function() {

        it('should return January when given a zero', inject(function(calendarHelper) {
            expect(calendarHelper.getMonthName(0)).toBe('January');
        }));

    });
});