'use strict';

/* Controllers - wykłady */

planerApp.controller('LecturesCtrl', function($scope, $rootScope, $modal, $log, dataService) {

  $rootScope.title = 'Wykłady';
  $scope.predicate = 'number';
  $scope.lectures_list = [];

  //pobranie listy wykładów
  dataService.getAllLecturesFn(function(lectures){
    $scope.lectures_list = lectures;
  });

//---------------------------------------------

  //nowy wykład
  $scope.open_add_lecture = function () {
    var modalInstance = $modal.open({
      templateUrl: 'partials/lectures/new_editLectureModal.html',
      backdrop: true,
      windowClass: 'modal',
      controller: function ($scope, $modalInstance, $log) {
        $scope.modal_title = 'Dodaj wykład';
        $scope.modal_submit = 'Dodaj';
        $scope.submit = function (data) {
          $modalInstance.close(data);
        };
        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
        };
      }
    });
    modalInstance.result.then(function (data) {
      data.number = $scope.ifnull(data.number);
      data.title = $scope.ifnull(data.title);
      dataService.addNewLectureFn(data, function(success){
        $scope.lectures_list.push(success);
      });
    }, function () { });
  };

//---------------------------------------------

  //edycja wykładu
  $scope.open_edit_lecture = function (lecture) {
    var modalInstance = $modal.open({
      templateUrl: 'partials/lectures/new_editLectureModal.html',
      backdrop: true,
      windowClass: 'modal',
      controller: function ($scope, $modalInstance, $log) {
        $scope.modal_title = 'Edytuj wykład';
        $scope.modal_submit = 'Zapisz';
        $scope.lecture = {
          id: lecture.id,
          number: lecture.number,
          title: lecture.title
        };
        $scope.submit = function (data) {
          $modalInstance.close(data);
        };
        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
        };
      }
    });
    modalInstance.result.then(function (data) {
      dataService.editLectureFn(data, function(success){
        for (var i = 0; i < $scope.lectures_list.length ; i++) {
          if ($scope.lectures_list[i].id == data.id) {
            $scope.lectures_list[i] = success;
            break;
          }
        }
      });
    }, function () { });
  };

//---------------------------------------------

  //usunięcie wykładu
  $scope.open_delete_lecture = function (lecture) {
    var modalInstance = $modal.open({
      templateUrl: 'partials/lectures/deleteLectureModal.html',
      backdrop: true,
      windowClass: 'modal',
      controller: function ($scope, $modalInstance, $log) {
        $scope.number = lecture.number;
        $scope.title = lecture.title;
        $scope.ok = function () {
          $modalInstance.close(lecture.id);
        };
        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
        };
      }
    });
    modalInstance.result.then(function (id) {
      dataService.deleteLectureFn(id, function(success){
        for (var i = 0; i < $scope.lectures_list.length ; i++) {
          if ($scope.lectures_list[i].id == id) {
            $scope.lectures_list.splice(i,1);
            break;
          }
        }
      });
    }, function () { });
  };

//---------------------------------------------

});