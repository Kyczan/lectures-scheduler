'use strict';

/* Controllers - zbory */

planerApp.controller('CongregationsCtrl', function($scope, $rootScope, $modal, $log, dataService) {

  $rootScope.title = 'Zbory';
  $scope.predicate = 'name';
  $scope.congregations_list = {};

  //pobranie listy zborów
  dataService.getAllCongregationsFn(function(congregations){
    $scope.congregations_list = congregations;
  });

  //---------------------------------------------

  //nowy zbór
  $scope.open_new_congregation = function () {
    var modalInstance = $modal.open({
      templateUrl: 'partials/congregations/new_editCongregationModal.html',
      backdrop: true,
      windowClass: 'modal',
      controller: function ($scope, $modalInstance, $log) {
        $scope.modal_title = 'Dodaj zbór';
        $scope.modal_submit = 'Dodaj';
        $scope.submit = function (data) {
          $modalInstance.close(data);
        };
        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
        };
      }
    });
    modalInstance.result.then(function (congregation) {
      congregation.number = $scope.ifnull(congregation.number);
      congregation.name = $scope.ifnull(congregation.name);
      dataService.addNewCongregationFn(congregation, function(success){
        $scope.congregations_list.push(success);
      });
    }, function () { });
  };

  //---------------------------------------------

  //edycja zboru
  $scope.open_edit_congregation = function (congregation) {
    var modalInstance = $modal.open({
      templateUrl: 'partials/congregations/new_editCongregationModal.html',
      backdrop: true,
      windowClass: 'modal',
      controller: function ($scope, $modalInstance, $log) {
        $scope.modal_name = 'Edytuj zbór';
        $scope.modal_submit = 'Zapisz';
        $scope.congregation = {
          id: congregation.id,
          number: congregation.number,
          name: congregation.name
        };
        $scope.submit = function (data) {
          $modalInstance.close(data);
        };
        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
        };
      }
    });
    modalInstance.result.then(function (congregation) {
      congregation.number = $scope.ifnull(congregation.number);
      congregation.name = $scope.ifnull(congregation.name);
      dataService.editCongregationFn(congregation, function(success){
        for (var i = 0; i < $scope.congregations_list.length ; i++) {
          if ($scope.congregations_list[i].id == congregation.id) {
            $scope.congregations_list[i] = success;
            break;
          }
        }
      });
    }, function () { });
  };

  //---------------------------------------------

  //usuwanie zboru
  $scope.open_delete_congregation = function (congregation) {
    var modalInstance = $modal.open({
      templateUrl: 'partials/congregations/deleteCongregationModal.html',
      backdrop: true,
      windowClass: 'modal',
      controller: function ($scope, $modalInstance, $log) {
        $scope.number = congregation.number;
        $scope.name = congregation.name;
        $scope.ok = function () {
          $modalInstance.close(congregation.id);
        };
        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
        };
      }
    });
    modalInstance.result.then(function (id) {
      dataService.deleteCongregationFn(id, function(success){
        for (var i = 0; i < $scope.congregations_list.length ; i++) {
          if ($scope.congregations_list[i].id == id) {
            $scope.congregations_list.splice(i,1);
            break;
          }
        }
      });
    }, function () { });
  };

//---------------------------------------------

});