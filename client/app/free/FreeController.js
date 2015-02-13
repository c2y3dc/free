(function () {
  'use strict';
  //
  
  angular
  .module('app.free')
  .controller('FreeController', FreeController);

  FreeController.$inject = ['FreeFactory', 'MapFactory', '$scope', '$rootScope', '$stateParams', '$q', '$timeout', '$http'];

  function FreeController(FreeFactory, MapFactory, $scope, $rootScope, $stateParams, $q, $timeout, $http){
    var vm = this;
    vm.free = [];

    vm.events = {
      'click': function(Marker, eventName, model, args) {
        console.log(Marker);
      }
    }

    // $scope.map = { center: { latitude: 37.774929, longitude: -122.419416 }, zoom: 13, bounds: {} };

    function init() {
      FreeFactory.getFree('events',function(events){
        angular.forEach(events, function(event,index) {
          console.log('event')
          vm.free.push(event); 
          MapFactory.map.markers.push(MapFactory.creatMarker(event, index));        
        })

        FreeFactory.getFree('places', function(places) {
          angular.forEach(places, function(place,index) {
            console.log('place')
            vm.free.push(place);
            MapFactory.map.markers.push(MapFactory.creatMarker(place, index));              
          })          
        })
      })
    }

    $timeout(function() {
      init();
    },400);  
  }
})();
    

