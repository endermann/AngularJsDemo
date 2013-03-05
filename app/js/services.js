'use strict';

angular.module('eventsApp.services', [])
    .factory('eventData', ['eventResource', function(eventResource) {
        return {
            events: (function() {
                var results = [];
                var r1 = eventResource.get({id:1}, function() {
                    results.push(r1);
                });
                var r2 = eventResource.get({id:2}, function() {
                    results.push(r2);
                });
                return results;
            })(),
/*            events: [
                {id: 1, name: 'Code Camp',  date: '03/15/2013', time: '9:00am - 5:00pm',
                    location: {address: "123 Wall St", city: "New York", province: "NY"},
                    imageUrl: 'http://blog.laptopmag.com/wpress/wp-content/uploads/2012/08/Code-Camp_sf.jpg',
                    sessions: [
                        {id:1, name: "How To Program", track: 1, duration: 2, abstract: "this session will teach you to program"},
                        {id:2, name: "How To Dance", track: 2, duration: 3, abstract: "this session will teach you to dance"},
                        {id:3, name: "How To Sing", track: 1, duration: 1, abstract: "this session will teach you to sing"},
                    ]
                },
                {
                    id: 2, name: 'Code Retreat',  date: '03/16/2013', time: '8:00am - 4:30pm',
                    location: {address: "42 Wallaby Way", city: "Sydney", province: "AU"},
                    imageUrl: 'http://api.ning.com/files/2vzV35vB8k5SPm92v9bGA0ng9DP2h-ONIcgPoDUThiIk1roHMF4eVjzlN2o3z9S5aU*wKgn9jZpdxEekNQCYvnOumr-beV44/cnlogo.png'
                },
                {
                    id: 3, name: 'Agile Roundtable',  date: '04/02/2013', time: '2:00pm - 5:00pm',
                    location: {address: "10 Downing St", city: "London", province: "UK"},
                    imageUrl: 'http://2.bp.blogspot.com/_gLnOWFiJhI8/SzfU7icq4SI/AAAAAAAAAAw/uPYwoNfPQHU/S1600-R/cart.jpg'
                }
                ],*/
            getNextId: function() {
                var max = 1;
                for(var event in this.events) {
                    if(event.id > max) {
                        max = event.id;
                    }
                }
                return max;
            }
        };
    }])
    .factory('eventResource', ['$resource', function ($resource) {
        var service =  $resource('/event/:id', {id: '@id'});

        service.queryAll = function(cb) { service.query({all:true}, cb) };

        return service;
    }])
    .factory('userResource', ['$resource', function ($resource) {
        var service =  $resource('user/:userName', {userName: '@userName'}, { });

        service.queryAll = function(callback) { service.query({all:true}, callback) };

        return service;
    }])
    .factory('authenticationService', function() {
        var currentUser = {};

        function cloneObject(object) {
            return JSON.parse(JSON.stringify(object));
        };

        return {
            getCurrentUserName: function() { return currentUser.userName },
            getCurrentUser: function() { return cloneObject(currentUser);  },
            setCurrentUser: function(user) { currentUser = cloneObject(user); }
        };
    })
    .factory('durations', function() {
        return {
            getDuration: function() {
                return "way too long";
            }
        }
    });
