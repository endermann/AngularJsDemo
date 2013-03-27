'use strict';

eventsApp.controller('EventController',
    function EventController($scope, $routeParams) {
        $scope.event = {
            name: 'my event',
            date: '1/1/2013',
            time: '10:30 am',
            location: {
                address: '123 fake st',
                city: 'SLC',
                province: 'UT'
            },
            imageUrl: 'http://blog.laptopmag.com/wpress/wp-content/uploads/2012/08/Code-Camp_sf.jpg',
            sessions: [
                {
                    name: 'Learn to Program',
                    creatorName: 'Bob Martin',
                    duration: '1hr',
                    abstract: 'In this session you will learn to Program like a champ!'
                }
            ]
        }

        $scope.upVoteSession = function() {
        };

        $scope.downVoteSession = function() {
        };
    }
);