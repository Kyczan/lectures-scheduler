'use strict';

/* Controllers */

var planerApp = angular.module('planer.controllers', ['ui.bootstrap','jsonData']);

planerApp.controller('MainCtrl', function($scope, $location, $route) {
  var activePath = null;
  $scope.$on('$routeChangeSuccess', function(){
    activePath = $location.path();
  });
  $scope.isActive = function( pattern ) {
    return (new RegExp( pattern )).test( activePath );
  };

  //zamień nule na puste
  $scope.ifnull = function(val){
    var res = (val === null || typeof val === 'undefined' ? '' : val);
    return res;
  };

  $scope.niepuste = function(data){
    return (data !== '') && (data !== null) && (typeof data !== 'undefined');
  };
    
});
