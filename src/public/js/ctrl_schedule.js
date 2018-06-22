'use strict';

/* Controllers - plan */

planerApp.controller('ScheduleCtrl', function($scope, $rootScope, $modal, $log, $timeout, dataService) {

  $rootScope.title = 'Plan wykładów';
  $scope.predicate = 'event_date';
  $scope.reverse = true;
  $scope.schedule_list = {};
  $scope.speakers = {};
  $scope.lectures = {};
  $scope.dane_pdf = [];
  $scope.default_event_time = '';

  //pobranie listy zaplanowanych wykładów
  dataService.getScheduleFn(function(schedule){
    $scope.schedule_list = schedule;
  });

  //pobranie listy mowców
  dataService.getAllSpeakersFn(function(speakers){
    $scope.speakers = speakers;
  });

  //pobranie listy wykładów
  dataService.getAllLecturesFn(function(lectures){
    $scope.lectures = lectures;
  });

  //pobranie parametru godziny rozpoczęcia zebrania
  dataService.getSettingFn('DEFAULT_EVENT_TIME', function(value){
    $scope.default_event_time = value;
  });

  //zwraca aktualną datę w formacie yyyy-mm-dd
  $scope.today = function () {
    return new Date().toJSON().slice(0,10);
  };
  
  //---------------------------------------------

  //dodanie nowego terminu
  $scope.open_new_event = function () {
    var modalInstance = $modal.open({
      templateUrl: 'partials/schedule/new_editScheduleModal.html',
      backdrop: true,
      windowClass: 'modal',
      size: 'lg',
      controller: function ($scope, $modalInstance, $log, $filter, speakers, lectures, default_event_time) {
        $scope.modal_title = 'Dodaj termin';
        $scope.modal_submit = 'Dodaj';
        $scope.speakers = speakers;
        $scope.lectures = lectures;
        $scope.setdate = function(){
          return new Date();
        };
        $scope.settime = function(){
          var t = default_event_time.split(':');
          var d = new Date();
          d.setHours( parseInt(t[0],10) );
          d.setMinutes( parseInt(t[1],10) );
          return d;
        };
        $scope.submit = function (data) {
          data.event_date = $filter('date')(data.event_date, 'yyyy-MM-dd');
          data.event_time = $filter('date')(data.event_time_pom, 'HH:mm');
          delete data.event_time_pom;
          $modalInstance.close(data);
        };
        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
        };
      },
      resolve: {
        speakers: function () {
          return $scope.speakers;
        },
        lectures: function () {
          return $scope.lectures;
        },
        default_event_time: function () {
          return $scope.default_event_time;
        } 
      }
    });
    modalInstance.result.then(function (event) {
      if(!$scope.niepuste(event.speaker)){ //nie wybrano mówcy
        event.speaker = {
          id: ''
        };
      }
      if(!$scope.niepuste(event.lecture)){ //nie wybrano wykładu
        event.lecture = {
          id: ''
        };
      }
      event.note = $scope.ifnull(event.note);
      dataService.addNewEventFn(event, function(success){
        $scope.schedule_list.push(success);
      });
    }, function () { });
  };

  //---------------------------------------------

  //edycja terminu
  $scope.open_edit_event = function (event) {
    var modalInstance = $modal.open({
      templateUrl: 'partials/schedule/new_editScheduleModal.html',
      backdrop: true,
      windowClass: 'modal',
      size: 'lg',
      controller: function ($scope, $modalInstance, $log, $filter, speakers, lectures) {
        $scope.modal_title = 'Edytuj termin';
        $scope.modal_submit = 'Zapisz';
        $scope.speakers = speakers;
        $scope.lectures = lectures;
        for (var i = 0; i < speakers.length ; i++) {
          if (speakers[i].id == event.speaker_id) {
            break;
          }
        }
        for (var j = 0; j < lectures.length ; j++) {
          if (lectures[j].id == event.lecture_id) {
            break;
          }
        }
        $scope.setdate = function(){
          return new Date(event.event_date);
        };
        $scope.settime = function(){
          var t = event.event_time.split(':');
          var d = new Date();
          d.setHours( parseInt(t[0],10) );
          d.setMinutes( parseInt(t[1],10) );
          return d;
        };
        $scope.event = {
          id: event.id,
          note: event.note,
          speaker: speakers[i],
          lecture: lectures[j]
        };
        $scope.submit = function (data) {
          data.event_date = $filter('date')(data.event_date, 'yyyy-MM-dd');
          data.event_time = $filter('date')(data.event_time_pom, 'HH:mm');
          delete data.event_time_pom;
          $modalInstance.close(data);
        };
        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
        };
      },
      resolve: {
        speakers: function () {
          return $scope.speakers;
        },
        lectures: function () {
          return $scope.lectures;
        }
      }
    });
    modalInstance.result.then(function (event) {
      if(!$scope.niepuste(event.speaker)){ //nie wybrano mówcy
        event.speaker = {
          id: ''
        };
      }
      if(!$scope.niepuste(event.lecture)){ //nie wybrano wykładu
        event.lecture = {
          id: ''
        };
      }
      event.note = $scope.ifnull(event.note);
      dataService.editEventFn(event, function(success){
        for (var i = 0; i < $scope.schedule_list.length ; i++) {
          if ($scope.schedule_list[i].id == event.id) {
            $scope.schedule_list[i] = success;
            break;
          }
        }
      });
    }, function () { });
  };

  //---------------------------------------------

  //usunięcie terminu
  $scope.open_delete_event = function (event) {
    var modalInstance = $modal.open({
      templateUrl: 'partials/schedule/deleteScheduleModal.html',
      backdrop: true,
      windowClass: 'modal',
      controller: function ($scope, $modalInstance, $log) {
        $scope.event = event;
        $scope.ok = function () {
          $modalInstance.close(event.id);
        };
        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
        };
      }
    });
    modalInstance.result.then(function (id) {
      dataService.deleteEventFn(id, function(success){
        for (var i = 0; i < $scope.schedule_list.length ; i++) {
          if ($scope.schedule_list[i].id == id) {
            $scope.schedule_list.splice(i,1);
            break;
          }
        }
      });
    }, function () { });
  };

  //--------------------------------------------- 

  //edycja parametru godziny rozpoczęcia zebrania 
  $scope.open_edit_default_event_time = function (default_event_time) {
    var modalInstance = $modal.open({
      templateUrl: 'partials/schedule/editDefaultEventTimeModal.html',
      backdrop: true,
      windowClass: 'modal',
      controller: function ($scope, $modalInstance, $log, $filter) {
        $scope.modal_title = 'Ustawienia';
        $scope.modal_submit = 'Zapisz';
        $scope.settime = function(){
          var t = default_event_time.split(':');
          var d = new Date();
          d.setHours( parseInt(t[0],10) );
          d.setMinutes( parseInt(t[1],10) );
          return d;
        };
        $scope.submit = function (data) {
          $modalInstance.close($filter('date')(data, 'HH:mm'));
        };
        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
        };
      }
    });
    modalInstance.result.then(function (default_event_time) {
      dataService.setSettingFn('DEFAULT_EVENT_TIME', default_event_time, function(success){
        $scope.default_event_time = default_event_time;
      });
    }, function () { });
  };

});
