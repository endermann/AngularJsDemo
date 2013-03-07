'use strict';

/* Directives */


angular.module('eventsApp.directives', [])
    .directive('appVersion', ['version', function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }])
    .directive('gravatar', ['gravatarUrlBuilder', function (gravatarUrlBuilder) {
        return {
            restrict:"A",
            link:function (scope, element, attrs) {
                attrs.$observe('gravatar', function(newValue, oldValue) {
                    console.log(newValue);
                    if (newValue !== oldValue) {
                        element.attr('src', gravatarUrlBuilder.buildUrlForEmail(newValue));
                    }
                });
            }
        }
    }]);
;
