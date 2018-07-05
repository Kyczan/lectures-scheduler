'use strict';

/* Directives */

var app = angular.module('planer.directives', []);

app.directive('filterRow', function () {

  function controller ($scope) {
    $scope.search = {};
    //po wyczyszczeniu filtra nulle mają się znów pojawiać na liście
    $scope.clr_qry = function(search){
      if (search) {
        var fields = Object.keys(search);
        for (var i = fields.length - 1; i >= 0; i--) {
          if (search[fields[i]].length === 0) {
            delete search[fields[i]];
          }
        }
      }
    };
  }

  return {
    restrict: 'E',
    controller: controller,
    scope: {
      predicate: '=',
      reverse: '=',
      label: '@',
      name: '=',
      search: '='
    },
    templateUrl: 'partials/filter-row/filter-row.html'
  };
});

app.directive('headerRow', function () {

  return {
    restrict: 'E',
    transclude: true,
    scope: {
      title: '@',
      add: '=',
      addTitle: '@',
      data: '=',
      search: '='
    },
    templateUrl: 'partials/header-row/header-row.html'
  };
});