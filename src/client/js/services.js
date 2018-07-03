'use strict';

/* Services */

angular.module('planer.services', []);

angular.module('jsonData', ['ngResource']).
  factory('dataService', function ($http) {
    return {

      //----------ustawienia:

      getSettingFn: function (parameter, ans) {
        $http({
          url: 'api/settings/'+parameter,
          method: 'GET'
        }).
          success(function (data) {
            ans(data.value);
          });
      },

      setSettingFn: function (parameter, value, ans) {
        var q = '{"value":"' + value + '"}';
        $http({
          url: 'api/settings/'+parameter,
          method: 'PUT',
          data: q
        }).
          success(function (data) {
            ans(data);
          });
      },

      //----------wykłady:

      getAllLecturesFn: function (ans) {
        $http({
          url: 'api/lectures',
          method: 'GET'
        }).
          success(function (data) {
            ans(data);
          });
      },

      addNewLectureFn: function (object, ans) {
        var q = '{"number":"' + object.number + '", "title":"' + object.title + '"}';
        $http({
          url: 'api/lectures',
          method: 'POST',
          data: q
        }).
          success(function (data) {
            ans(data);
          });
      },

      deleteLectureFn: function (id, ans) {
        $http({
          url: 'api/lectures/'+id,
          method: 'DELETE',
        }).
          success(function (data) {
            ans(data);
          });
      },

      editLectureFn: function (object, ans) {
        var q = '{"number":"' + object.number +
                    '", "title":"' + object.title + '"}';
        $http({
          url: 'api/lectures/'+object.id,
          method: 'PUT',
          data: q
        }).
          success(function (data) {
            ans(data);
          });
      },

      //----------zbory:

      getAllCongregationsFn: function (ans) {
        $http({
          url: 'api/congregations',
          method: 'GET'
        }).
          success(function (data) {
            ans(data);
          });
      },

      addNewCongregationFn: function (object, ans) {
        var q = '{"number":"' + object.number +
                    '", "name":"' + object.name + '"}';
        $http({
          url: 'api/congregations',
          method: 'POST',
          data: q
        }).
          success(function (data) {
            ans(data);
          });
      },

      deleteCongregationFn: function (id, ans) {
        $http({
          url: 'api/congregations/'+id,
          method: 'DELETE'
        }).
          success(function (data) {
            ans(data);
          });
      },

      editCongregationFn: function (object, ans) {
        var q = '{"number":"' + object.number +
                    '", "name":"' + object.name + '"}';
        $http({
          url: 'api/congregations/'+object.id,
          method: 'PUT',
          data: q
        }).
          success(function (data) {
            ans(data);
          });
      },

      //----------mówcy:

      getAllSpeakersFn: function (ans) {
        $http({
          url: 'api/speakers',
          method: 'GET'
        }).
          success(function (data) {
            ans(data);
          });
      },

      addNewSpeakerFn: function (object, ans) {
        var q = '{"first_name":"' + object.first_name +
                    '", "last_name":"' + object.last_name +
                    '", "phone":"' + object.phone +
                    '", "email":"' + object.email +
                    '", "privilege":"' + object.privilege +
                    '", "note":"' + object.note +
                    '", "congregation_id":"' + object.congregation.id +
                    '"}';
        $http({
          url: 'api/speakers',
          method: 'POST',
          data: q
        }).
          success(function (data) {
            ans(data);
          });
      },

      deleteSpeakerFn: function (id, ans) {
        $http({
          url: 'api/speakers/'+id,
          method: 'DELETE'
        }).
          success(function (data) {
            ans(data);
          });
      },

      editSpeakerFn: function (object, ans) {
        var q = '{"first_name":"' + object.first_name +
                    '", "last_name":"' + object.last_name +
                    '", "phone":"' + object.phone +
                    '", "email":"' + object.email +
                    '", "privilege":"' + object.privilege +
                    '", "note":"' + object.note +
                    '", "congregation_id":"' + object.congregation.id +
                    '"}';
        $http({
          url: 'api/speakers/'+object.id,
          method: 'PUT',
          data: q
        }).
          success(function (data) {
            ans(data);
          });
      },

      //----------przygotowane wykłady przez mówców:

      getPreparedLecturesFn: function (id, ans) {
        $http({
          url: 'api/speakers/'+id+'/prepared',
          method: 'GET'
        }).
          success(function (data) {
            ans(data);
          });
      },

      deletePreparedLectureFn: function (object, ans) {
        $http({
          url: 'api/speakers/'+object.speaker_id+'/prepared/'+object.lecture_id,
          method: 'DELETE'
        }).
          success(function (data) {
            ans(data);
          });
      },

      addPreparedLectureFn: function (lecture, speaker, ans) {
        var q = '{"lecture_id":"' + lecture + '"}';
        $http({
          url: 'api/speakers/'+speaker+'/prepared',
          method: 'POST',
          data: q
        }).
          success(function (data) {
            ans(data);
          });
      },

      //----------zaplanowane wykłady:

      getScheduleFn: function (ans) {
        $http({
          url: 'api/events',
          method: 'GET'
        }).
          success(function (data) {
            ans(data);
          });
      },

      addNewEventFn: function (object, ans) {
        var q = '{"event_date":"' + object.event_date +
                    '", "event_time":"' + object.event_time +
                    '", "lecture_id":"' + object.lecture.id +
                    '", "speaker_id":"' + object.speaker.id +
                    '", "note":"' + object.note +
                    '"}';
        $http({
          url: 'api/events',
          method: 'POST',
          data: q
        }).
          success(function (data) {
            ans(data);
          });
      },

      deleteEventFn: function (id, ans) {
        $http({
          url: 'api/events/'+id,
          method: 'DELETE'
        }).
          success(function (data) {
            ans(data);
          });
      },

      editEventFn: function (object, ans) {
        var q = '{"event_date":"' + object.event_date +
                    '", "event_time":"' + object.event_time +
                    '", "lecture_id":"' + object.lecture.id +
                    '", "speaker_id":"' + object.speaker.id +
                    '", "note":"' + object.note +
                    '"}';
        $http({
          url: 'api/events/'+object.id,
          method: 'PUT',
          data: q
        }).
          success(function (data) {
            ans(data);
          });
      }

    };
  });
