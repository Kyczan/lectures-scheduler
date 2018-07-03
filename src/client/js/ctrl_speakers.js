'use strict';

/* Controllers - mowcy */

planerApp.controller('SpeakersCtrl', function($scope, $rootScope, $modal, $log, dataService) {

  $rootScope.title = 'Mówcy';
  $scope.predicate = 'congregation';
  $scope.speakers_list = [];
  $scope.congregations = [];
  $scope.lectures = [];

  //pobranie listy mowców
  dataService.getAllSpeakersFn(function(speakers){
    $scope.speakers_list = speakers;
  });

  //pobranie listy zborów
  dataService.getAllCongregationsFn(function(congregations){
    $scope.congregations = congregations;
  });

  //pobranie listy wykładów
  dataService.getAllLecturesFn(function(lectures){
    $scope.lectures = lectures;
  });

  //---------------------------------------------

  //dodanie nowego mówcy
  $scope.open_new_speaker = function () {
    var modalInstance = $modal.open({
      templateUrl: 'partials/speakers/new_editSpeakerModal.html',
      backdrop: true,
      windowClass: 'modal',
      controller: function ($scope, $modalInstance, $log, congregations) {
        $scope.modal_title = 'Dodaj mówcę';
        $scope.modal_submit = 'Dodaj';
        $scope.congregations = congregations;
        $scope.submit = function (data) {
          $modalInstance.close(data);
        };
        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
        };
      },
      resolve: {
        congregations: function () {
          return $scope.congregations;
        }
      }
    });
    modalInstance.result.then(function (speaker) {
      if(!$scope.niepuste(speaker.congregation)){ //nie wybrano zboru
        speaker.congregation = {
          id: '',
          number: '',
          name: ''
        };
      }
      speaker.first_name = $scope.ifnull(speaker.first_name);
      speaker.last_name = $scope.ifnull(speaker.last_name);
      speaker.phone = $scope.ifnull(speaker.phone);
      speaker.email = $scope.ifnull(speaker.email);
      speaker.privilege = $scope.ifnull(speaker.privilege);
      speaker.note = $scope.ifnull(speaker.note);
      dataService.addNewSpeakerFn(speaker, function(success){
        $scope.speakers_list.push(success);
      });
    }, function () { });
  };

  //---------------------------------------------

  //edycja mowcy
  $scope.open_edit_speaker = function (speaker) {
    var modalInstance = $modal.open({
      templateUrl: 'partials/speakers/new_editSpeakerModal.html',
      backdrop: true,
      windowClass: 'modal',
      controller: function ($scope, $modalInstance, $log, congregations) {
        $scope.modal_title = 'Edytuj mówcę';
        $scope.modal_submit = 'Zapisz';
        $scope.congregations = congregations;
        for (var i = 0; i < congregations.length ; i++) {
          if (congregations[i].id == speaker.congregation_id) {
            break;
          }
        }
        $scope.speaker = {
          id: speaker.id,
          first_name: speaker.first_name,
          last_name: speaker.last_name,
          phone: speaker.phone,
          email: speaker.email,
          privilege: speaker.privilege,
          note: speaker.note,
          congregation: congregations[i]
        };
        $scope.submit = function (data) {
          $modalInstance.close(data);
        };
        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
        };
      },
      resolve: {
        congregations: function () {
          return $scope.congregations;
        }
      }
    });
    modalInstance.result.then(function (speaker) {
      if(!$scope.niepuste(speaker.congregation)){ //nie wybrano zboru
        speaker.congregation = {
          id: '',
          number: '',
          name: ''
        };
      }
      speaker.first_name = $scope.ifnull(speaker.first_name);
      speaker.last_name = $scope.ifnull(speaker.last_name);
      speaker.phone = $scope.ifnull(speaker.phone);
      speaker.email = $scope.ifnull(speaker.email);
      speaker.privilege = $scope.ifnull(speaker.privilege);
      speaker.note = $scope.ifnull(speaker.note);
      dataService.editSpeakerFn(speaker, function(success){
        for (var i = 0; i < $scope.speakers_list.length ; i++) {
          if ($scope.speakers_list[i].id == speaker.id) {
            $scope.speakers_list[i] = success;
            break;
          }
        }
      });
    }, function () { });
  };

  //---------------------------------------------

  //usunięcie mowcy
  $scope.open_delete_speaker = function (speaker) {
    var modalInstance = $modal.open({
      templateUrl: 'partials/speakers/deleteSpeakerModal.html',
      backdrop: true,
      windowClass: 'modal',
      controller: function ($scope, $modalInstance, $log) {
        $scope.name = speaker.name;
        $scope.ok = function () {
          $modalInstance.close(speaker.id);
        };
        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
        };
      }
    });
    modalInstance.result.then(function (id) {
      dataService.deleteSpeakerFn(id, function(success){
        for (var i = 0; i < $scope.speakers_list.length ; i++) {
          if ($scope.speakers_list[i].id == id) {
            $scope.speakers_list.splice(i,1);
            break;
          }
        }
      });
    }, function () { });
  }; 

  //---------------------------------------------

  //przygotowane wykłady przez mówcę
  $scope.open_prepared_lectures = function (speaker) {
    var modalInstance = $modal.open({
      templateUrl: 'partials/speakers/preparedLecturesModal.html',
      backdrop: true,
      size: 'lg',
      windowClass: 'modal',
      controller: function ($scope, $modalInstance, $log, lectures) {
        $scope.modal_title = speaker.last_name + ' ' + speaker.first_name + ' - przygotowane wykłady';
        $scope.modal_submit = 'Zapisz';
        $scope.predicate = 'number';
        $scope.lectures = lectures;
        $scope.prepared_lectures = [];
        //pobranie listy przygotowanych wykładów
        dataService.getPreparedLecturesFn(speaker.id, function(prepared_lectures){
          $scope.prepared_lectures = prepared_lectures;
        });
        $scope.delete_prepared = function(prepared){
          //usunięcie przygotowanego wykładu
          dataService.deletePreparedLectureFn(prepared, function(data){
            $scope.prepared_lectures = $scope.prepared_lectures.filter(item => item.lecture_id !== data.lecture_id);
          });
        };
        $scope.add_prepared = function(lecture){
          //dodanie przygotowanego wykładu
          if(typeof lecture !== 'undefined'){
            dataService.addPreparedLectureFn(lecture.id, speaker.id, function(prepared_lecture){
              $scope.prepared_lectures = $scope.prepared_lectures.filter(item => item.lecture_id !== prepared_lecture.lecture_id);
              $scope.prepared_lectures.push(prepared_lecture);
            });
          }
        };
        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
        };
      },
      resolve: {
        lectures: function () {
          return $scope.lectures;
        }
      }
    });
  };

//---------------------------------------------

});
