
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
        console.log("lat:"+lat+"Log:"+long);
          $localStorage.lat = lat;
          $localStorage.long = long;
          $rootScope.storage = $localStorage;
        }, function(err) {
          $rootScope.serverErrors.push('Unable to get loacation try after sometime.');
    }).finally(function () { $rootScope.$broadcast('loading:hide');});
  }
  $scope.enterNewLocation = function() {
    // body...
  }
});