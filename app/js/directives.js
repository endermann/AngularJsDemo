'use strict';

eventsApp
    .directive('gravatar', ['gravatarUrlBuilder', function (gravatarUrlBuilder) {
        return {
            restrict:"A",
            link:function (scope, element, attrs) {
                attrs.$observe('gravatar', function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        element.attr('src', gravatarUrlBuilder.buildUrlForEmail(newValue));
                    }
                });
            }
        }
    }])
    .directive('enterTarget', function () {
        return {
            restrict:"A",
            link:function (scope, element, attrs) {
                element.bind('keyup', function (event) {
                    var elementSelectors = "#" + attrs.enterTarget.split(",").join(",#");
                    var targetElements = angular.element(elementSelectors).filter(":visible");
                    if (event.keyCode === 13) {
                        targetElements.click();
                    }
                });
            }
        }
    })
    .directive('focus', function () {
        return {
            restrict:"A",
            link:function (scope, element, attrs) {
                angular.element(element).focus();
                }
            };
    });
