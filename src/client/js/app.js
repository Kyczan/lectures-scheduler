'use strict';

// Declare app level module which depends on filters, and services

angular.module('planer', [
  'ngRoute',
  'planer.filters',
  'planer.services',
  'planer.directives',
  'planer.controllers',
  'ui.bootstrap',
  'angular-loading-bar',
  'ngSanitize', 
  'ui.select'
]).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/',
      {
        templateUrl: 'partials/schedule/schedule.html',
        controller: 'ScheduleCtrl'
      });
    $routeProvider.when('/speakers',
      {
        templateUrl: 'partials/speakers/speakers.html',
        controller: 'SpeakersCtrl'
      });
    $routeProvider.when('/congregations',
      {
        templateUrl: 'partials/congregations/congregations.html',
        controller: 'CongregationsCtrl'
      });
    $routeProvider.when('/lectures',
      {
        templateUrl: 'partials/lectures/lectures.html',
        controller: 'LecturesCtrl'
      });
    $routeProvider.otherwise({redirectTo: '/'});
    //$locationProvider.html5Mode(true);
  }]).
  config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.latencyThreshold = 10;
  }]);