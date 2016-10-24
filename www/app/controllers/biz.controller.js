/*
 * Add bisuness controller
 */
SLBizReviews.controller('addBizCtrl', function($scope,$http,$state,CameraService,$ionicHistory,$ionicLoading,$rootScope,$localStorage,ProfileService,businessesService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });

  $scope.$on("$ionicView.enter", function(event, data){
    $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
      businessesService.getCategory()
        .then(function (category) {
          $rootScope.category = category;
      }) .finally(function () { $rootScope.$broadcast('loading:hide');}); 
      $scope.serverErrors = [];
      $scope.initializeBizData();
      
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
  $scope.initializeBizData = function () {
    if($rootScope.newBizData == undefined){
      $rootScope.newBizData = {};
    }
  }
  $rootScope.ProvienceItem = [
      {label:'-select-', value:'null'},
      {label:'Eastern', value:'Eastern'},
      {label:'Northern', value:'Northern'},
      {label:'Southern', value:'Southern'},
      {label:'Western', value:'Western'},
    ];
  $rootScope.DistrictItem = [
      {label:'-select-', value:'null'},
      {label:'Kailahun', value:'Kailahun'},
      {label:'Kenema', value:'Kenema'},
      {label:'Kono', value:'Kono'},
    ];
  $rootScope.ChiefdomItem = [
      {label:'-select-', value:'null'},
      {label:'Dea', value:'Dea'},
      {label:'Jawei', value:'Jawei'},
      {label:'Kissi Kama', value:'Kissi Kama'},
      {label:'Kisi Teng', value:'Kisi Teng'},
      {label:'Kissi Tongi', value:'Kissi Tongi'},
      {label:'Luawa', value:'Luawa'},
      {label:'Malema', value:'Malema'},
      {label:'Mandu', value:'Mandu'},
      {label:'Peje Bongre', value:'Peje Bongre'},
      {label:'Peje West', value:'Peje West'},
      {label:'Penguia', value:'Penguia'},
      {label:'Upper Bambara', value:'Upper Bambara'},
      {label:'Yawei', value:'Yawei'},
    ];
  $rootScope.days = [
      {label:'Mon', value:'Mon'},
      {label:'Tue', value:'Tue'},
      {label:'Wed', value:'Wed'},
      {label:'Thu', value:'Thu'},
      {label:'Fri', value:'Fri'},
      {label:'Sat', value:'Sat'},
      {label:'Sun', value:'Sun'},
      {label:'Closed', value:'closed'}
    ];
  $rootScope.hours = [
      {label:'12:00 AM', value:'12:00 AM'},
      {label:'12:30 AM', value:'12:30 AM'},
      {label:'01:00 AM', value:'01:00 AM'},
      {label:'01:30 AM', value:'01:30 AM'},
      {label:'02:00 AM', value:'02:00 AM'},
      {label:'02:30 AM', value:'02:30 AM'},
      {label:'03:00 AM', value:'03:00 AM'},
      {label:'03:30 AM', value:'03:30 AM'},
      {label:'04:00 AM', value:'04:00 AM'},
      {label:'04:30 AM', value:'04:30 AM'},
      {label:'05:00 AM', value:'05:00 AM'},
      {label:'05:30 AM', value:'05:30 AM'},
      {label:'06:00 AM', value:'06:00 AM'},
      {label:'06:30 AM', value:'06:30 AM'},
      {label:'07:00 AM', value:'07:00 AM'},
      {label:'07:30 AM', value:'07:30 AM'},
      {label:'08:00 AM', value:'08:00 AM'},
      {label:'08:30 AM', value:'08:30 AM'},
      {label:'09:00 AM', value:'09:00 AM'},
      {label:'09:30 AM', value:'09:30 AM'},
      {label:'10:00 AM', value:'10:00 AM'},
      {label:'10:30 AM', value:'10:30 AM'},
      {label:'11:00 AM', value:'11:00 AM'},
      {label:'11:30 AM', value:'11:30 AM'},
      {label:'12:00 PM', value:'12:00 PM'},
      {label:'12:30 PM', value:'12:30 AM'},
      {label:'01:00 PM', value:'01:00 PM'},
      {label:'01:30 PM', value:'01:30 PM'},
      {label:'02:00 PM', value:'02:00 PM'},
      {label:'02:30 PM', value:'02:30 PM'},
      {label:'03:00 PM', value:'03:30 PM'},
      {label:'03:30 PM', value:'03:30 PM'},
      {label:'04:00 PM', value:'04:00 PM'},
      {label:'04:30 PM', value:'04:30 PM'},
      {label:'05:00 PM', value:'05:00 PM'},
      {label:'05:30 PM', value:'05:30 PM'},
      {label:'06:00 PM', value:'06:00 PM'},
      {label:'06:30 PM', value:'06:30 PM'},
      {label:'07:00 PM', value:'07:00 PM'},
      {label:'07:30 PM', value:'07:30 PM'},
      {label:'08:00 PM', value:'08:00 PM'},
      {label:'08:30 PM', value:'08:30 PM'},
      {label:'09:00 PM', value:'09:00 PM'},
      {label:'09:30 PM', value:'09:30 PM'},
      {label:'10:00 PM', value:'10:00 PM'},
      {label:'10:30 PM', value:'10:30 PM'},
      {label:'11:00 PM', value:'11:00 PM'},
      {label:'11:30 PM', value:'11:30 PM'},
      {label:'Closed', value:'closed'},
    ];

  $rootScope.weekdays = [
      {value:"mon"},
      {value:"tue"},
      {value:"wed"},
      {value:"thu"},
      {value:"fri"},
      {value:"sat"},
      {value:"sun"}
    ];

  $rootScope.Hours = {};
  $rootScope.Hours.days = {};
  $rootScope.Hours.closing = {};
  $rootScope.Hours.opening = {};
  $rootScope.Hours.days.mon = $rootScope.days[0];
  $rootScope.Hours.days.tue = $rootScope.days[1];
  $rootScope.Hours.days.wed = $rootScope.days[2];
  $rootScope.Hours.days.thu = $rootScope.days[3];
  $rootScope.Hours.days.fri = $rootScope.days[4];
  $rootScope.Hours.days.sat = $rootScope.days[5];
  $rootScope.Hours.days.sun = $rootScope.days[6];

  $rootScope.Hours.opening.mon = $rootScope.hours[18];
  $rootScope.Hours.opening.tue = $rootScope.hours[18];
  $rootScope.Hours.opening.wed = $rootScope.hours[18];
  $rootScope.Hours.opening.thu = $rootScope.hours[18];
  $rootScope.Hours.opening.fri = $rootScope.hours[18];
  $rootScope.Hours.opening.sat = $rootScope.hours[18];
  $rootScope.Hours.opening.sun = $rootScope.hours[18];

  $rootScope.Hours.closing.mon = $rootScope.hours[34];
  $rootScope.Hours.closing.tue = $rootScope.hours[34];
  $rootScope.Hours.closing.wed = $rootScope.hours[34];
  $rootScope.Hours.closing.thu = $rootScope.hours[34];
  $rootScope.Hours.closing.fri = $rootScope.hours[34];
  $rootScope.Hours.closing.sat = $rootScope.hours[34];
  $rootScope.Hours.closing.sun = $rootScope.hours[34];

  $rootScope.Provience = $rootScope.ProvienceItem[0];
  $rootScope.District = $rootScope.DistrictItem[0];
  $rootScope.Chiefdom = $rootScope.ChiefdomItem[0];

  // angular.forEach(category, function (value, key) {
  //     category[key].name = category[key].node.name;
  //   });

  $scope.setBizValFor = function (caseStr) {
    switch (caseStr) {
      case 'Name':
        $rootScope.currentFieldName = caseStr;
        $state.go('app.addBizsetBizFieldValue');
        break;
      case 'Category':
        $rootScope.currentFieldName = caseStr;
        $state.go('app.addBizsetBizFieldValue');
        break;
      case 'Keywords':
        $rootScope.currentFieldName = caseStr;
        $state.go('app.addBizsetBizFieldValue');
        break;
      case 'Address':
        $rootScope.currentFieldName = caseStr;
        $state.go('app.addBizsetBizFieldValue');
        break;
      case 'Geocode':
        $rootScope.currentFieldName = caseStr;
        $state.go('app.addBizsetBizFieldValue');
        break;
      case 'Chiefdom':
        $rootScope.currentFieldName = caseStr;
        $state.go('app.addBizsetBizFieldValue');
        break;
      case 'Email':
        $rootScope.currentFieldName = caseStr;
        $state.go('app.addBizsetBizFieldValue');
        break;
      case 'Phone':
        $rootScope.currentFieldName = caseStr;
        $state.go('app.addBizsetBizFieldValue');
        break;
      case 'Hours':
        $rootScope.currentFieldName = caseStr;
        $state.go('app.addBizsetBizFieldValue');
        break;
      case 'Description':
        $rootScope.currentFieldName = caseStr;
        $state.go('app.addBizsetBizFieldValue');
        break;
      case 'Bebsite':
        $rootScope.currentFieldName = caseStr;
        $state.go('app.addBizsetBizFieldValue');
        break;
      case 'Logo':
        $rootScope.currentFieldName = caseStr;
        $state.go('app.addBizsetBizFieldValue');
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
    if($rootScope.currentFieldName == 'Category'){
      $rootScope.newBizData.field_ltc_biz_category = {"und":$scope.selectedItem.node.categoryid};
    }else{
      $rootScope.newBizData.field_ltc_business_keywords = {"und":[{"tid":$scope.selectedItem.keyword.id}]};
    }
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

  $scope.addBiz = function () {
    $scope.serverErrors = [];

    if($rootScope.newBizData.title == undefined){
      $scope.serverErrors.push('Business name is required');
      return;
    }
    if($rootScope.newBizData.field_ltc_biz_category == undefined){
      $scope.serverErrors.push('Business category is required');
      return;
    }
    if($rootScope.newBizData.field_ltc_biz_address == undefined){
      $scope.serverErrors.push('Business Address is required');
      return;
    }
    // if($rootScope.newBizData.field_ltc_biz_admin_location == undefined){
    //   $scope.serverErrors.push('Business Chiefdom is required');
    //   return;
    // }
    if($rootScope.newBizData.field_ltc_biz_email == undefined){
      $scope.serverErrors.push('Business email is required');
      return;
    }    
    // if($rootScope.newBizData.field_ltc_biz_address.und[0].locality == undefined){
    //   $scope.serverErrors.push('Business Address locality is required');
    // }
    if($rootScope.newBizData.field_ltc_biz_description == undefined){
      $scope.serverErrors.push('Business Description is required');
      return;
    }
    // if($rootScope.newBizData.field_ltc_biz_business_hours == undefined){
    //   $scope.serverErrors.push('Business Hours is required');
    //   return;
    // }
     //console.log($rootScope.ChiefdomItem);
     //console.log($rootScope.Provience);
     //console.log($rootScope.District);
     //console.log($rootScope.Chiefdom);
     //console.log($rootScope.Hours);
     //console.log($rootScope.DistrictItem);

        $rootScope.newBizData.type = "ltc_business";
        $rootScope.newBizData.status = "1";
        //$rootScope.newBizData.title = "test";
        //$rootScope.newBizData.field_ltc_biz_category = {"und":219};
        //$rootScope.newBizData.field_ltc_business_keywords = {"und":[{"tid":""}]};
        //$rootScope.newBizData.field_ltc_biz_address = {"und":[{"thoroughfare":"thoroughfare", "premise":"premise", "locality":"locality"}]};
        $rootScope.newBizData.field_ltc_biz_address_geo = {"und":[{"value":"", "geom": {"lat": ""}, "geom": {"lon": ""}}]};
        $rootScope.newBizData.field_ltc_biz_admin_location = {"und":[{"tid":3}]};//chiefdom field
        //$rootScope.newBizData.field_ltc_biz_email = {"und":[{"email":"chandan@gmail.com"}]};
        //$rootScope.newBizData.field_ltc_biz_telephone = {"und":[{"value":"123123123123"}]};
        $rootScope.newBizData.field_ltc_biz_business_hours = {"und":[
            {"day": "1", "starthours": "", "endhours": "", "daydelta": "0"}, 
            {"day": "2", "starthours": "", "endhours": "", "daydelta": "0"}, 
            {"day": "3", "starthours": "", "endhours": "", "daydelta": "0"}, 
            {"day": "4", "starthours": "", "endhours": "", "daydelta": "0"}, 
            {"day": "5", "starthours": "", "endhours": "", "daydelta": "0"}, 
            {"day": "6", "starthours": "", "endhours": "", "daydelta": "0"}, 
            {"day": "0", "starthours": "", "endhours": "", "daydelta": "0"},

            {"day": "1", "starthours": "", "endhours": "", "daydelta": "1"}, 
            {"day": "2", "starthours": "", "endhours": "", "daydelta": "1"}, 
            {"day": "3", "starthours": "", "endhours": "", "daydelta": "1"}, 
            {"day": "4", "starthours": "", "endhours": "", "daydelta": "1"}, 
            {"day": "5", "starthours": "", "endhours": "", "daydelta": "1"}, 
            {"day": "6", "starthours": "", "endhours": "", "daydelta": "1"}, 
            {"day": "0", "starthours": "", "endhours": "", "daydelta": "1"}]
          },
        //$rootScope.newBizData.field_ltc_biz_description = {"und":[{"value":"Say something nice about your business. This is your opportunity to tell it all."}]};
        //$rootScope.newBizData.field_ltc_biz_website = {"und":[{"url":"www.google.com"}]};
        //$rootScope.newBizData.field_image = {base64: false};
        console.log($rootScope.newBizData);
      
      $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
      businessesService.addBiz($rootScope.newBizData).then(function (data) {
        console.log(data);
        $rootScope.newBizData = {};
        $state.go('app.businessDetails',{bid:data.nid});
      },function (errorResult) {
          if (errorResult.status >= 400 && errorResult.status < 500) {
            $scope.serverErrors.push(errorResult.data[0]);
          }
          else {
            $scope.serverErrors.push(errorResult.statusText);
          }
      }).finally(function () { 
        $rootScope.$broadcast('loading:hide');
      });
  }
});

/*
 * Edit bisuness controller
 */
SLBizReviews.controller('editBizCtrl', function($scope,$http,$state,CameraService,$stateParams,$ionicHistory,$ionicLoading,$rootScope,$localStorage,ProfileService,businessesService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });

  $scope.$on("$ionicView.enter", function(event, data){
    $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
      businessesService.getCategory()
        .then(function (category) {
          $rootScope.category = category;
      });
      $scope.serverErrors = [];
      $scope.initializeBizData();
      
      businessesService.getKeywords()
        .then(function (keywords) {
          $rootScope.keywords = keywords;
      }).finally(function () { $rootScope.$broadcast('loading:hide');});
      
  });

  $scope.doCancel = function () {
    $ionicHistory.goBack();
  }
  $scope.doSaveBizFieldValue = function () {
    $ionicHistory.goBack();

  }
  $scope.initializeBizData = function () {
    if($rootScope.editBizData == undefined){
      businessesService.businessDetails($stateParams.bid).then(function(bizDetails) {
        $rootScope.bizDetails = bizDetails;
        console.log(bizDetails);
      }).finally(function () { $rootScope.$broadcast('loading:hide');
        $rootScope.editBizData = {};
        $rootScope.editBizData.field_ltc_biz_address = {und:[{}]};
        $rootScope.editBizData.field_ltc_biz_email = {und:[{}]};
        $rootScope.editBizData.field_ltc_biz_telephone = {und:[{}]};
        $rootScope.editBizData.field_ltc_biz_description = {und:[{}]};
        $rootScope.editBizData.field_ltc_biz_website = {und:[{}]};
      }); 
      
    }
  }
  $rootScope.ProvienceItem = [
      {label:'-select-', value:'null'},
      {label:'Eastern', value:'Eastern'},
      {label:'Northern', value:'Northern'},
      {label:'Southern', value:'Southern'},
      {label:'Western', value:'Western'},
    ];
  $rootScope.DistrictItem = [
      {label:'-select-', value:'null'},
      {label:'Kailahun', value:'Kailahun'},
      {label:'Kenema', value:'Kenema'},
      {label:'Kono', value:'Kono'},
    ];
  $rootScope.ChiefdomItem = [
      {label:'-select-', value:'null'},
      {label:'Dea', value:'Dea'},
      {label:'Jawei', value:'Jawei'},
      {label:'Kissi Kama', value:'Kissi Kama'},
      {label:'Kisi Teng', value:'Kisi Teng'},
      {label:'Kissi Tongi', value:'Kissi Tongi'},
      {label:'Luawa', value:'Luawa'},
      {label:'Malema', value:'Malema'},
      {label:'Mandu', value:'Mandu'},
      {label:'Peje Bongre', value:'Peje Bongre'},
      {label:'Peje West', value:'Peje West'},
      {label:'Penguia', value:'Penguia'},
      {label:'Upper Bambara', value:'Upper Bambara'},
      {label:'Yawei', value:'Yawei'},
    ];
  $rootScope.days = [
      {label:'Mon', value:'Mon'},
      {label:'Tue', value:'Tue'},
      {label:'Wed', value:'Wed'},
      {label:'Thu', value:'Thu'},
      {label:'Fri', value:'Fri'},
      {label:'Sat', value:'Sat'},
      {label:'Sun', value:'Sun'},
      {label:'Closed', value:'closed'}
    ];
  $rootScope.hours = [
      {label:'12:00 AM', value:'12:00 AM'},
      {label:'12:30 AM', value:'12:30 AM'},
      {label:'01:00 AM', value:'01:00 AM'},
      {label:'01:30 AM', value:'01:30 AM'},
      {label:'02:00 AM', value:'02:00 AM'},
      {label:'02:30 AM', value:'02:30 AM'},
      {label:'03:00 AM', value:'03:00 AM'},
      {label:'03:30 AM', value:'03:30 AM'},
      {label:'04:00 AM', value:'04:00 AM'},
      {label:'04:30 AM', value:'04:30 AM'},
      {label:'05:00 AM', value:'05:00 AM'},
      {label:'05:30 AM', value:'05:30 AM'},
      {label:'06:00 AM', value:'06:00 AM'},
      {label:'06:30 AM', value:'06:30 AM'},
      {label:'07:00 AM', value:'07:00 AM'},
      {label:'07:30 AM', value:'07:30 AM'},
      {label:'08:00 AM', value:'08:00 AM'},
      {label:'08:30 AM', value:'08:30 AM'},
      {label:'09:00 AM', value:'09:00 AM'},
      {label:'09:30 AM', value:'09:30 AM'},
      {label:'10:00 AM', value:'10:00 AM'},
      {label:'10:30 AM', value:'10:30 AM'},
      {label:'11:00 AM', value:'11:00 AM'},
      {label:'11:30 AM', value:'11:30 AM'},
      {label:'12:00 PM', value:'12:00 PM'},
      {label:'12:30 PM', value:'12:30 AM'},
      {label:'01:00 PM', value:'01:00 PM'},
      {label:'01:30 PM', value:'01:30 PM'},
      {label:'02:00 PM', value:'02:00 PM'},
      {label:'02:30 PM', value:'02:30 PM'},
      {label:'03:00 PM', value:'03:30 PM'},
      {label:'03:30 PM', value:'03:30 PM'},
      {label:'04:00 PM', value:'04:00 PM'},
      {label:'04:30 PM', value:'04:30 PM'},
      {label:'05:00 PM', value:'05:00 PM'},
      {label:'05:30 PM', value:'05:30 PM'},
      {label:'06:00 PM', value:'06:00 PM'},
      {label:'06:30 PM', value:'06:30 PM'},
      {label:'07:00 PM', value:'07:00 PM'},
      {label:'07:30 PM', value:'07:30 PM'},
      {label:'08:00 PM', value:'08:00 PM'},
      {label:'08:30 PM', value:'08:30 PM'},
      {label:'09:00 PM', value:'09:00 PM'},
      {label:'09:30 PM', value:'09:30 PM'},
      {label:'10:00 PM', value:'10:00 PM'},
      {label:'10:30 PM', value:'10:30 PM'},
      {label:'11:00 PM', value:'11:00 PM'},
      {label:'11:30 PM', value:'11:30 PM'},
      {label:'Closed', value:'closed'},
    ];

  $rootScope.weekdays = [
      {value:"mon"},
      {value:"tue"},
      {value:"wed"},
      {value:"thu"},
      {value:"fri"},
      {value:"sat"},
      {value:"sun"}
    ];

  $rootScope.Hours = {};
  $rootScope.Hours.days = {};
  $rootScope.Hours.closing = {};
  $rootScope.Hours.opening = {};
  $rootScope.Hours.days.mon = $rootScope.days[0];
  $rootScope.Hours.days.tue = $rootScope.days[1];
  $rootScope.Hours.days.wed = $rootScope.days[2];
  $rootScope.Hours.days.thu = $rootScope.days[3];
  $rootScope.Hours.days.fri = $rootScope.days[4];
  $rootScope.Hours.days.sat = $rootScope.days[5];
  $rootScope.Hours.days.sun = $rootScope.days[6];

  $rootScope.Hours.opening.mon = $rootScope.hours[18];
  $rootScope.Hours.opening.tue = $rootScope.hours[18];
  $rootScope.Hours.opening.wed = $rootScope.hours[18];
  $rootScope.Hours.opening.thu = $rootScope.hours[18];
  $rootScope.Hours.opening.fri = $rootScope.hours[18];
  $rootScope.Hours.opening.sat = $rootScope.hours[18];
  $rootScope.Hours.opening.sun = $rootScope.hours[18];

  $rootScope.Hours.closing.mon = $rootScope.hours[34];
  $rootScope.Hours.closing.tue = $rootScope.hours[34];
  $rootScope.Hours.closing.wed = $rootScope.hours[34];
  $rootScope.Hours.closing.thu = $rootScope.hours[34];
  $rootScope.Hours.closing.fri = $rootScope.hours[34];
  $rootScope.Hours.closing.sat = $rootScope.hours[34];
  $rootScope.Hours.closing.sun = $rootScope.hours[34];

  $rootScope.Provience = $rootScope.ProvienceItem[0];
  $rootScope.District = $rootScope.DistrictItem[0];
  $rootScope.Chiefdom = $rootScope.ChiefdomItem[0];

  // angular.forEach(category, function (value, key) {
  //     category[key].name = category[key].node.name;
  //   });

  $scope.setBizValFor = function (caseStr) {
    switch (caseStr) {
      case 'Name':
        $rootScope.currentFieldName = caseStr;
        $rootScope.editBizData.title = $rootScope.bizDetails.title;
        $state.go('app.editBizsetBizFieldValue');
        break;
      case 'Category':
        $rootScope.currentFieldName = caseStr;
        $state.go('app.editBizsetBizFieldValue');
        break;
      case 'Keywords':
        $rootScope.currentFieldName = caseStr;
        $state.go('app.editBizsetBizFieldValue');
        break;
      case 'Address':
        $rootScope.currentFieldName = caseStr;
        $rootScope.editBizData.field_ltc_biz_address.und[0].locality = $rootScope.bizDetails.field_ltc_biz_address.und[0].locality;
        $rootScope.editBizData.field_ltc_biz_address.und[0].premise = $rootScope.bizDetails.field_ltc_biz_address.und[0].premise;
        $rootScope.editBizData.field_ltc_biz_address.und[0].thoroughfare = $rootScope.bizDetails.field_ltc_biz_address.und[0].thoroughfare;

        $state.go('app.editBizsetBizFieldValue');
        break;
      case 'Geocode':
        $rootScope.currentFieldName = caseStr;
        $state.go('app.editBizsetBizFieldValue');
        break;
      case 'Chiefdom':
        $rootScope.currentFieldName = caseStr;
        $state.go('app.editBizsetBizFieldValue');
        break;
      case 'Email':
        $rootScope.currentFieldName = caseStr;
        $rootScope.editBizData.field_ltc_biz_email.und[0].email = $rootScope.bizDetails.field_ltc_biz_email.und[0].email;
        $state.go('app.editBizsetBizFieldValue');
        break;
      case 'Phone':
        $rootScope.currentFieldName = caseStr;
        $rootScope.editBizData.field_ltc_biz_telephone.und[0].value = $rootScope.bizDetails.field_ltc_biz_telephone.und[0].value;
        $state.go('app.editBizsetBizFieldValue');
        break;
      case 'Hours':
        $rootScope.currentFieldName = caseStr;
        $state.go('app.editBizsetBizFieldValue');
        break;
      case 'Description':
        $rootScope.currentFieldName = caseStr;
        $rootScope.editBizData.field_ltc_biz_description.und[0].value = $rootScope.bizDetails.field_ltc_biz_description.und[0].value;
        $state.go('app.editBizsetBizFieldValue');
        break;
      case 'Bebsite':
        $rootScope.currentFieldName = caseStr;
        $rootScope.editBizData.field_ltc_biz_website.und[0].url = $rootScope.bizDetails.field_ltc_biz_website.und[0].url;
        $state.go('app.editBizsetBizFieldValue');
        break;
      case 'Logo':
        $rootScope.currentFieldName = caseStr;
        $state.go('app.editBizsetBizFieldValue');
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
    if($rootScope.currentFieldName == 'Category'){
      $rootScope.editBizData.field_ltc_biz_category = {"und":$scope.selectedItem.node.categoryid};
    }else{
      $rootScope.editBizData.field_ltc_business_keywords = {"und":[{"tid":$scope.selectedItem.keyword.id}]};
    }
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
  $scope.addBiz = function () {
    $scope.serverErrors = [];

    if($rootScope.editBizData.title == undefined){
      $scope.serverErrors.push('Business name is required');
      return;
    }
    if($rootScope.editBizData.field_ltc_biz_category == undefined){
      $scope.serverErrors.push('Business category is required');
      return;
    }
    if($rootScope.editBizData.field_ltc_biz_address == undefined){
      $scope.serverErrors.push('Business Address is required');
      return;
    }
    // if($rootScope.newBizData.field_ltc_biz_admin_location == undefined){
    //   $scope.serverErrors.push('Business Chiefdom is required');
    //   return;
    // }
    if($rootScope.editBizData.field_ltc_biz_email == undefined){
      $scope.serverErrors.push('Business email is required');
      return;
    }    
    // if($rootScope.newBizData.field_ltc_biz_address.und[0].locality == undefined){
    //   $scope.serverErrors.push('Business Address locality is required');
    // }
    if($rootScope.editBizData.field_ltc_biz_description == undefined){
      $scope.serverErrors.push('Business Description is required');
      return;
    }
    // if($rootScope.newBizData.field_ltc_biz_business_hours == undefined){
    //   $scope.serverErrors.push('Business Hours is required');
    //   return;
    // }


        $rootScope.editBizData.type = $rootScope.bizDetails.type;
        $rootScope.editBizData.status = "1";
        //$rootScope.newBizData.title = "test";
        //$rootScope.newBizData.field_ltc_biz_category = {"und":219};
        //$rootScope.newBizData.field_ltc_business_keywords = {"und":[{"tid":""}]};
        //$rootScope.newBizData.field_ltc_biz_address = {"und":[{"thoroughfare":"thoroughfare", "premise":"premise", "locality":"locality"}]};
        $rootScope.editBizData.field_ltc_biz_address_geo = $rootScope.bizDetails.field_ltc_biz_address_geo;//{"und":[{"value":"", "geom": {"lat": ""}, "geom": {"lon": ""}}]};
        $rootScope.editBizData.field_ltc_biz_admin_location = $rootScope.bizDetails.field_ltc_biz_admin_location;//{"und":[{"tid":3}]};//chiefdom field
        //$rootScope.newBizData.field_ltc_biz_email = {"und":[{"email":"chandan@gmail.com"}]};
        //$rootScope.newBizData.field_ltc_biz_telephone = {"und":[{"value":"123123123123"}]};
        $rootScope.editBizData.field_ltc_biz_business_hours = {"und":[
            {"day": "1", "starthours": "", "endhours": "", "daydelta": "0"}, 
            {"day": "2", "starthours": "", "endhours": "", "daydelta": "0"}, 
            {"day": "3", "starthours": "", "endhours": "", "daydelta": "0"}, 
            {"day": "4", "starthours": "", "endhours": "", "daydelta": "0"}, 
            {"day": "5", "starthours": "", "endhours": "", "daydelta": "0"}, 
            {"day": "6", "starthours": "", "endhours": "", "daydelta": "0"}, 
            {"day": "0", "starthours": "", "endhours": "", "daydelta": "0"},

            {"day": "1", "starthours": "", "endhours": "", "daydelta": "1"}, 
            {"day": "2", "starthours": "", "endhours": "", "daydelta": "1"}, 
            {"day": "3", "starthours": "", "endhours": "", "daydelta": "1"}, 
            {"day": "4", "starthours": "", "endhours": "", "daydelta": "1"}, 
            {"day": "5", "starthours": "", "endhours": "", "daydelta": "1"}, 
            {"day": "6", "starthours": "", "endhours": "", "daydelta": "1"}, 
            {"day": "0", "starthours": "", "endhours": "", "daydelta": "1"}]
          },
        //$rootScope.newBizData.field_ltc_biz_description = {"und":[{"value":"Say something nice about your business. This is your opportunity to tell it all."}]};
        //$rootScope.newBizData.field_ltc_biz_website = {"und":[{"url":"www.google.com"}]};
        //$rootScope.newBizData.field_image = {base64: false};
        console.log($rootScope.editBizData);
      
      // $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
      // businessesService.editBiz($rootScope.editBizData).then(function (data) {
      //   console.log(data);
      //   $rootScope.newBizData = {};
      //   $state.go('app.businessDetails',{bid:data.nid});
      // },function (errorResult) {
      //     if (errorResult.status >= 400 && errorResult.status < 500) {
      //       $scope.serverErrors.push(errorResult.data[0]);
      //     }
      //     else {
      //       $scope.serverErrors.push(errorResult.statusText);
      //     }
      // }).finally(function () { 
      //   $rootScope.$broadcast('loading:hide');
      // });
  }
})