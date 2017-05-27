angular.module('mainApp', ['ui.router'])
		.config(function($stateProvider, $urlRouterProvider) {
				$urlRouterProvider.otherwise('/home');

				$stateProvider
					.state('home',{
						url : '/home',
						templateUrl : 'partials/home.html',
						controller :'homeController'
					})
					.state('works',{
						url : '/works',
						templateUrl : 'partials/works.html',
						controller :'worksController'
					})
					.state('contact',{
						url : '/contact',
						templateUrl : 'partials/contact.html',
						controller :'contactController'
					});
		});