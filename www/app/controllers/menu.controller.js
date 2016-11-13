
OBizR.controller('menuCtrl',function($rootScope,$sce,$scope,$localStorage,$state,pageService,$cordovaGeolocation){
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });
  $scope.$on("$ionicView.enter", function(event, data){
    $rootScope.serverErrors = [];
  	$rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
      pageService.getAboutPage()
        .then(function (aboupage) {
          $scope.aboupage = aboupage[0].node;
      });
      pageService.getAboutPressKitPage()
        .then(function (aboutpresskitpage) {
          $scope.aboutpresskitpage = aboutpresskitpage[0].node;
      });
      pageService.getAboutProfesSrvPage()
        .then(function (aboutprofessrvpage) {
          $scope.aboutprofessrvpage = aboutprofessrvpage[0].node;
      });
      pageService.getAboutBizSubsPage()
        .then(function (aboutbizsubspage) {
          $scope.aboutbizsubspage = aboutbizsubspage[0].node;
      });
      //////////////////////////////////////////////
      
      pageService.getGSReviverPage()
        .then(function (gsreviverpage) {
          $scope.gsreviverpage = gsreviverpage[0].node;
      });
      pageService.getGSBizPage()
        .then(function (gsbizpage) {
          $scope.gsbizpage = gsbizpage[0].node;
      });
      pageService.getGSBuildPage()
        .then(function (gsbuildpage) {
          $scope.gsbuildpage = gsbuildpage[0].node;
      });
      pageService.getGSLearnPage()
        .then(function (gslearnpage) {
          $scope.gslearnpage = gslearnpage[0].node;
      });
      pageService.getGSPubSevPage()
        .then(function (gspubsevpage) {
          $scope.gspubsevpage = gspubsevpage[0].node;
      });
      
      //////////////////////////////////////////////
      pageService.getSupportPage()
        .then(function (supportpage) {
          $scope.supportpage = supportpage;
      });

      //////////////////////////////////////////////
      pageService.getPrivacyPolicyPage()
        .then(function (privacypolicypage) {
          $scope.privacypolicypage = privacypolicypage[0].node;
      });
      pageService.getTermUsePage()
        .then(function (termusepage) {
          $scope.termusepage = termusepage[0].node;
      }) .finally(function () { $rootScope.$broadcast('loading:hide');});     
  });
  $scope.trustAsHtml = function(string) {
    return $sce.trustAsHtml(string);
  };
  $scope.captureCurrentLocation = function () {
    console.log($rootScope.storage);
    $rootScope.serverErrors = [];
    $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
      var posOptions = {timeout: 10000, enableHighAccuracy: false};
      $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
        var lat  = position.coords.latitude
        var long = position.coords.longitude

          var geocoder = new google.maps.Geocoder();
          var latlng = new google.maps.LatLng(lat, long);
          var request = {
            latLng: latlng
          };
          geocoder.geocode(request, function(data, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              if (data[0] != null) {
                $scope.$apply(function() {
                  $localStorage.lat = data[0].geometry.location.lat();
                  $localStorage.long = data[0].geometry.location.lng();
                  $localStorage.address = data[0].formatted_address;
                  $rootScope.storage = $localStorage;
                });
              } else {
                alert("No address available");
              }
            }
          });
        }, function(err) {
          $rootScope.serverErrors.push('Unable to get loacation try after sometime.');
    }).finally(function () { $rootScope.$broadcast('loading:hide');});
  }
  $scope.newLocation = {};
  $scope.newLocation.country = 'Sierra Leone';

  $scope.enterNewLocation = function() {
    $rootScope.serverErrors = [];
    if($scope.newLocation.city == undefined || $scope.newLocation.city == ''){
      $rootScope.serverErrors.push('City is required.');
      return;
    }
    if($scope.newLocation.street == undefined || $scope.newLocation.street == ''){
      $rootScope.serverErrors.push('Street is required.');
      return;
    }else{
      $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
      var commaSeparateVal = $scope.newLocation.street+","+$scope.newLocation.city+","+$scope.newLocation.country;
          var request = {
            address: commaSeparateVal
          };
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode(request, function(data, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          $rootScope.$broadcast('loading:hide');
          if (data[0] != null) {
            $scope.$apply(function() {
              $localStorage.lat = data[0].geometry.location.lat();
              $localStorage.long = data[0].geometry.location.lng();
              $localStorage.address = data[0].formatted_address;
              $rootScope.storage = $localStorage;
            });

          } else {
            $rootScope.$broadcast('loading:hide');
            $rootScope.serverErrors.push('Unable to set loacation try after sometime.');
          }
        }
      });

    }
  }
});