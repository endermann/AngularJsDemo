'use strict';

eventsApp.directive('gravatar', ['gravatarUrlBuilder', function (gravatarUrlBuilder) {
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            attrs.$observe('gravatar', function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    element.attr('src', gravatarUrlBuilder.buildUrlForEmail(newValue));
                }
            });
        }
    }
}]);
