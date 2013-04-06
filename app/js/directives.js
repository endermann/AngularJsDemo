'use strict';

eventsApp
    .directive('enterTarget', function () {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
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
            restrict: "A",
            link: function (scope, element, attrs) {
                angular.element(element).focus();
            }
        };
    })
    .directive('ngFocus', function ($parse) {
        return  function (scope, element, attrs) {
            var fn = $parse(attrs.ngFocus);
            element.bind('focus', function (event) {
                scope.$apply(function () {
                    fn(scope, {$event: event});
                });
            });

        };
    })
    .directive('ngBlur', function ($parse) {
        return  function (scope, element, attrs) {
            var fn = $parse(attrs.ngBlur);
            element.bind('blur', function (event) {
                scope.$apply(function () {
                    fn(scope, {$event: event});
                });
            });

        };
    })
    .directive('gravatar', ['gravatarUrlBuilder', function (gravatarUrlBuilder) {
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
    }])
    .directive('datePicker', function (calendarHelper) {
        return {
            restrict: "E",
            templateUrl: "/partials/directives/datePicker.html",
            scope: {
                date: '=',
                setDate: '='
            },
            link: function (scope) {
                scope.calendar = {
                    year: new Date().getFullYear(),
                    month: new Date().getMonth(),
                    monthName: calendarHelper.getMonthName(new Date().getMonth())
                };

                scope.days = calendarHelper.getCalendarDays(new Date().getFullYear(), new Date().getMonth());

                scope.nextMonth = function () {
                    if (scope.calendar.month === 11) {
                        scope.calendar.month = 0;
                        scope.calendar.year++;
                    } else {
                        scope.calendar.month++;
                    }
                    scope.calendar.monthName = calendarHelper.getMonthName(scope.calendar.month);
                    scope.days = calendarHelper.getCalendarDays(scope.calendar.year, scope.calendar.month);
                }

                scope.previousMonth = function () {
                    if (scope.calendar.month === 0) {
                        scope.calendar.month = 11;
                        scope.calendar.year--;
                    } else {
                        scope.calendar.month--;
                    }
                    scope.calendar.monthName = calendarHelper.getMonthName(scope.calendar.month);
                    scope.days = calendarHelper.getCalendarDays(scope.calendar.year, scope.calendar.month);
                }

                scope.nextYear = function () {
                    scope.calendar.year++;
                    scope.days = calendarHelper.getCalendarDays(scope.calendar.year, scope.calendar.month);
                }

                scope.previousYear = function () {
                    scope.calendar.year--;
                    scope.days = calendarHelper.getCalendarDays(scope.calendar.year, scope.calendar.month);
                }

                scope.selectDate = function (day) {
                    scope.setDate((scope.calendar.month + 1) + "/" + day + "/" + + scope.calendar.year);
                }
            }
        };
    })
    .directive('eventThumbnail', function () {
        return {
            restrict: "E",
            templateUrl: "/partials/directives/eventThumbnail.html",
            scope: {
                event: '=',
                showDetails: '&'
            }
        }
    })
    .directive('eventDetails',function () {
        return {
            restrict: "E",
            templateUrl: "/partials/directives/eventDetails.html",
            scope: {
                event: '=',
                editable: '=',
                edit: '&'
            }
        }
    }).directive('sessionThumbnail',function () {
        return {
            restrict: "E",
            templateUrl: "/partials/directives/sessionThumbnail.html",
            scope: {
                session: '=',
                editable: '=',
                edit: '&'
            }
        }
    }).directive('upvote', function () {
        return {
            restrict: "E",
            templateUrl: "/partials/directives/upvote.html",
            scope: {
                count: '@',
                upvote: '&',
                downvote: '&'
            }
        }
    });
