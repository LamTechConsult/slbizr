/*
 * Add bisuness controller
 */
OBizR.controller('addBizCtrl', function($scope,$http,$state,CameraService,$ionicHistory,$ionicLoading,$rootScope,$localStorage,ProfileService,businessesService) {
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

  $scope.setBizValFor = function (caseStr) {
    $rootScope.currentFieldName = caseStr;
    $state.go('app.addBizsetBizFieldValue');
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
            {"day": "0", "starthours": "", "endhours": "", "daydelta": "1"}]},
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
      console.log(errorResult);
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
OBizR.controller('editBizCtrl', function($scope,$http,$state,CameraService,$stateParams,$ionicHistory,$ionicLoading,$rootScope,$localStorage,ProfileService,businessesService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });
  $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
  businessesService.getCategory()
    .then(function (category) {
      $rootScope.category = category;
  });
    
  businessesService.getKeywords()
    .then(function (keywords) {
      $rootScope.keywords = keywords;
  }).finally(function () { $rootScope.$broadcast('loading:hide');});
  
  $scope.$on("$ionicView.enter", function(event, data){
    $scope.serverErrors = [];
    $scope.initializeBizData();
      
  });

  $scope.doCancel = function () {
    $ionicHistory.goBack();
  }
  $scope.doSaveBizFieldValue = function () {
    $ionicHistory.goBack();

  }
  $scope.initializeBizData = function () {
    if($rootScope.editBizData == ''){
      $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
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
        $rootScope.editBizData.field_ltc_biz_address_geo = {und:[{}]};
        $rootScope.editBizData.field_ltc_biz_admin_location = {und:[{}]};
        $rootScope.editBizData.field_ltc_business_keywords = {und:[{}]};
        $rootScope.editBizData.field_ltc_biz_category = {};
        $scope.setDefaultFieldValue();
      });
    }
  }
  $scope.setDefaultFieldValue = function () {
    
    if($rootScope.bizDetails.title){
      $rootScope.editBizData.title = $rootScope.bizDetails.title;
    }
    if($rootScope.bizDetails.field_ltc_biz_address){
      $rootScope.editBizData.field_ltc_biz_address.und[0].locality = $rootScope.bizDetails.field_ltc_biz_address.und[0].locality;
      $rootScope.editBizData.field_ltc_biz_address.und[0].premise = $rootScope.bizDetails.field_ltc_biz_address.und[0].premise;
      $rootScope.editBizData.field_ltc_biz_address.und[0].thoroughfare = $rootScope.bizDetails.field_ltc_biz_address.und[0].thoroughfare;
    }
    if($rootScope.bizDetails.field_ltc_biz_email){
      $rootScope.editBizData.field_ltc_biz_email.und[0].email = $rootScope.bizDetails.field_ltc_biz_email.und[0].email;
    }
    if($rootScope.bizDetails.field_ltc_biz_telephone){
      $rootScope.editBizData.field_ltc_biz_telephone.und[0].value = $rootScope.bizDetails.field_ltc_biz_telephone.und[0].value;
    }
    if($rootScope.bizDetails.field_ltc_biz_description){
      $rootScope.editBizData.field_ltc_biz_description.und[0].value = $rootScope.bizDetails.field_ltc_biz_description.und[0].value;
    }
    if($rootScope.bizDetails.field_ltc_biz_website){
      $rootScope.editBizData.field_ltc_biz_website.und[0].url = $rootScope.bizDetails.field_ltc_biz_website.und[0].url;
    }
    if($rootScope.bizDetails.field_ltc_biz_address_geo){
      $rootScope.editBizData.field_ltc_biz_address_geo = $rootScope.bizDetails.field_ltc_biz_address_geo;//{"und":[{"value":"", "geom": {"lat": ""}, "geom": {"lon": ""}}]};
    }
    if($rootScope.bizDetails.field_ltc_biz_admin_location){
      $rootScope.editBizData.field_ltc_biz_admin_location = $rootScope.bizDetails.field_ltc_biz_admin_location;//{"und":[{"tid":3}]};//chiefdom field
    }
    if($rootScope.bizDetails.field_ltc_business_keywords.und.length >0){
      $rootScope.editBizData.field_ltc_business_keywords = $rootScope.bizDetails.field_ltc_business_keywords;
    }
    if($rootScope.bizDetails.field_ltc_biz_category){
      $rootScope.editBizData.field_ltc_biz_category = $rootScope.bizDetails.field_ltc_biz_category.und;
    }
    $rootScope.editBizData.nid = $rootScope.bizDetails.nid;
    $rootScope.editBizData.type = $rootScope.bizDetails.type;
  }

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

  $scope.setBizValFor = function (caseStr) {
    $rootScope.currentFieldName = caseStr;
    $state.go('app.editBizsetBizFieldValue');
  }
  /////////////////////Autocomplete fuctionality///////////////////////////////
  
  $scope.setModel = function (item) {
    $scope.selectedItem = item;
    if($rootScope.currentFieldName == 'Category'){
      $rootScope.editBizData.field_ltc_biz_category = $scope.selectedItem.node.categoryid;
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

  /////////////////////////////////////////////////////////////////////////////
    $scope.useCamera = function(){
      var options = {
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        quality: 80,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 200,
        targetHeight: 200,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
      };

      CameraService.getPicture(options).then(function(imageData) {

        $rootScope.pictureURL =  imageData;
        $ionicHistory.goBack();
      }, function(err) {
          alert(JSON.stingify(error));
      });
  }
  $scope.useGallery = function(){
        var options = {
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: 0,
        quality: 80,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
      };

      CameraService.getPicture(options).then(function(imageData) {
        $rootScope.pictureURL =  imageData;
        $ionicHistory.goBack();
      }, function(err) {
          alert(JSON.stingify(error));
      });
  }

  $scope.updateBiz = function () {
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
      {"day": "0", "starthours": "", "endhours": "", "daydelta": "1"}]},

      //$rootScope.newBizData.field_image = {base64: false};
      console.log($rootScope.editBizData);
      
      $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
      businessesService.editBiz($rootScope.editBizData).then(function (data) {
        console.log(data);
        $rootScope.editBizData = {};
        $state.go('app.businessDetails',{bid:data.nid});
      },function (errorResult) {
        console.log(errorResult);
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