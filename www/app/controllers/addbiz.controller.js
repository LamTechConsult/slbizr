SLBizReviews.controller('otherCtrl', function($scope,$http,$state,CameraService,$ionicHistory,$ionicLoading,$rootScope,$localStorage,ProfileService,businessesService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });

  $scope.$on("$ionicView.enter", function(event, data){
    $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
      
      businessesService.getCategory()
        .then(function (category) {
          $rootScope.category = category;
      }) .finally(function () { $rootScope.$broadcast('loading:hide');}); 

      businessesService.getKeywords()
        .then(function (keywords) {
          $rootScope.keywords = keywords;
      }) .finally(function () { $rootScope.$broadcast('loading:hide');}); 
  });

  $scope.doCancel = function () {
    $ionicHistory.goBack();
  }
  $scope.doSaveBizFieldValue = function () {
    $ionicHistory.goBack();
  }
  // $rootScope.Provience = '- select -';
  // $rootScope.District = '- select -';
  // $rootScope.Chiefdom = '- select -';

  $rootScope.ProvienceItem = [{
      id: 1,
      label: 'Eastern',
      subItem: { name: 'Eastern' }
      }, {
      id: 2,
      label: 'Northern',
      subItem: { name: 'Northern' }
      }, {
      id: 3,
      label: 'Southern',
      subItem: { name: 'Southern' }
      }, {
      id: 4,
      label: 'Western',
      subItem: { name: 'Western' }
      }
  ];
    $rootScope.Provience = $rootScope.ProvienceItem[0];
  $scope.setBizValFor = function (caseStr) {
    switch (caseStr) {
          case 'Name':
            $rootScope.currentFieldName = caseStr;
            $state.go('app.setBizFieldValue');
            break;
          case 'Category':
            $rootScope.currentFieldName = caseStr;
            $state.go('app.setBizFieldValue');
            break;
          case 'Keywords':
            $rootScope.currentFieldName = caseStr;
            $state.go('app.setBizFieldValue');
            break;
          case 'Category':
            $rootScope.currentFieldName = caseStr;
            $state.go('app.setBizFieldValue');
            break;
          case 'Address':
            $rootScope.currentFieldName = caseStr;
            $state.go('app.setBizFieldValue');
            break;
          case 'Geocode':
            $rootScope.currentFieldName = caseStr;
            $state.go('app.setBizFieldValue');
            break;
          case 'Chiefdom':
            $rootScope.currentFieldName = caseStr;
            $state.go('app.setBizFieldValue');
            break;
          case 'Email':
            $rootScope.currentFieldName = caseStr;
            $state.go('app.setBizFieldValue');
            break;
          case 'Phone':
            $rootScope.currentFieldName = caseStr;
            $state.go('app.setBizFieldValue');
            break;
          case 'Hours':
            $rootScope.currentFieldName = caseStr;
            $state.go('app.setBizFieldValue');
            break;
          case 'Description':
            $rootScope.currentFieldName = caseStr;
            $state.go('app.setBizFieldValue');
            break;
          case 'Bebsite':
            $rootScope.currentFieldName = caseStr;
            $state.go('app.setBizFieldValue');
            break;
          case 'Logo':
            $rootScope.currentFieldName = caseStr;
            $state.go('app.setBizFieldValue');
            break;
        }
  }
  
  /////////////////////////////////////////////////////////////////////////////
    $scope.useCamera = function(){
      var options = {
        destinationType: Camera.DestinationType.DATA_URL,//Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        quality: 80,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 200,
        targetHeight: 200,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        //correctOrientation:true
      };

      CameraService.getPicture(options).then(function(imageData) {

        $rootScope.pictureURL =  imageData;
        $ionicHistory.goBack();
      }, function(err) {
          alert(JSON.stingify(error));
      });
     //$cordovaCamera.cleanup().then(); // only for FILE_URI
  }
  $scope.useGallery = function(){
        var options = {
        destinationType: Camera.DestinationType.DATA_URL,//Camera.DestinationType.FILE_URI,
        sourceType: 0,
        quality: 80,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        //correctOrientation:true
      };

      CameraService.getPicture(options).then(function(imageData) {

        $rootScope.pictureURL =  imageData;
        $ionicHistory.goBack();
      }, function(err) {
          alert(JSON.stingify(error));
      });
     //$cordovaCamera.cleanup().then(); // only for FILE_URI
  }

/////////////////////Autocomplete fuctionality///////////////////////////////
  $scope.setModel = function (item) {
    $scope.selectedItem = item;
  };

  $scope.autocompleteInput = {
    'propNameToDisplay': 'name',
    'placeholder': 'Education, Professional Services, NGO and Government  ',
    'ID':'StaicData',
    'listClass': ['border-energized'], //optional cutsom classes for matched items
    'labelContainerClass': ['bottom-border'] //optional
  };
  $scope.autocompleteInput.itemSelectCallback = $scope.setModel;
  if($rootScope.currentFieldName == 'Category'){
    $scope.autocompleteInput.searchlist = $rootScope.category;
  }else{
    $scope.autocompleteInput.searchlist = $rootScope.keywords;
  }
  
  $scope.$root.$broadcast($scope.autocompleteInput.ID);
  ///////////////////////////////////////////////////

});
