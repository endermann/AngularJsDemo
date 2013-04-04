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
    })
    .directive('eventDetails', function() {
        return {
            restrict:"E",
            templateUrl:"/partials/directives/eventDetails.html",
            scope: {
                event: '=',
                editable: '=',
                edit: '&'
            }
        }
    }).directive('sessionThumbnail', function() {
        return {
            restrict:"E",
            templateUrl:"/partials/directives/sessionThumbnail.html",
            scope: {
                session: '=',
                editable: '=',
                edit: '&'
            }
        }
    }).directive('upvote', function() {
        return {
            restrict:"E",
            templateUrl:"/partials/directives/upvote.html",
            scope: {
                count: '@',
                upvote: '&',
                downvote: '&'
            }
        }
    });
