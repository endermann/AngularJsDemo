'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('event registration app', function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
  });


  xit('should automatically redirect to /events when location hash/fragment is empty', function() {
    expect(browser().location().url()).toBe("/events");
  });


  describe('events', function() {

    beforeEach(function() {
      browser().navigateTo('/events');
    });


    it('should render events when user navigates to /events', function() {
      expect(element('[ng-view] h1:first').text()).
        toMatch(/Events/);
    });

  });



});
