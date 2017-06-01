angular.module('mainApp', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/rooms');
        $stateProvider
            .state('rooms', {
                url: '/rooms',
                templateUrl: 'partials/rooms.html',
                controller: 'roomsController',
            })
            .state('rooms.add', {
                url: '/add',
                templateUrl: 'partials/add.html',
                controller: 'addController'
            })
            .state('readme',{
            	url:'/readme',
            	templateUrl : 'partials/readmecontent.html'
            })
            .state('room', {
                url: '/room/:id',
                templateUrl: 'partials/room.html',
                controller: 'roomController'
            });
    });
