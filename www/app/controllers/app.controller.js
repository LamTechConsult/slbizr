
OBizR.controller('mainCtrl', function($scope,$localStorage,$cordovaGeolocation,$rootScope,$state) {
  $rootScope.ProvienceItem = [];
  $rootScope.DistrictItem = [];
  $rootScope.ChiefdomItem = [];
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
  $rootScope.weekdays = [
      {value:"mon"},
      {value:"tue"},
      {value:"wed"},
      {value:"thu"},
      {value:"fri"},
      {value:"sat"},
      {value:"sun"}
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
  
  $rootScope.storage = $localStorage;
  // $rootScope.serverErrors = [];
  // if(!$rootScope.storage){
  //   var posOptions = {timeout: 10000, enableHighAccuracy: false};
  //   $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
  //     var lat  = position.coords.latitude
  //     var long = position.coords.longitude
  //     console.log("lat:"+lat+"Log:"+long);
  //       $localStorage.lat = lat;
  //       $localStorage.long = long;
  //     }, function(err) {
  //       $rootScope.serverErrors.push('Unable to get loacation try manually.');
  //       console.log(err);
  //   });
  // }else{
  //   $rootScope.serverErrors.push('Unable to get loacation try manually.');
  // }
});

OBizR.controller('reviewDetailsCtrl', function($scope,$state,$ionicHistory,$rootScope,$stateParams,businessesService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });
  $scope.$on("$ionicView.enter", function(event, data){
    $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
    $rootScope.reviewsDetails = {};
    if($stateParams.rid){
      businessesService.getBusinessesReviewById($stateParams.rid)
        .then(function (bizReviewDetail) {
          $rootScope.reviewsDetails = bizReviewDetail;
          console.log($rootScope.reviewsDetails);
      }) .finally(function () { $rootScope.$broadcast('loading:hide');});
    } 
  });
 
});

OBizR.controller('writeReviewCtrl', function($scope,$state,CameraService,$ionicHistory,$rootScope,$stateParams,$localStorage,businessesService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });
      
  // set the rate and max variables
  $scope.rating = {};
  $scope.rating.rate = 0;
  $scope.rating.max = 5;

  $scope.writeReviewData={
    // subject:'',
    //comment_body:{und:[{value:''}]},
    nid:parseInt($stateParams.bid),
    //uid:1,
    //field_ltc_biz_photos:{und:[{rating:$scope.rating,target:null}]}
  };
  
  $scope.serverErrors = [];
  $scope.saveWriteReview = function () {
    if($scope.rating.rate>0){
       var percentRating = $scope.rating.rate*20;
    }
    $scope.writeReviewData.field_ltc_biz_rating = {und:[{rating:percentRating,target:null}]}
    $scope.serverErrors = [];
    if($scope.writeReviewData.subject == undefined){
      $scope.serverErrors.push('subject is required');
    }
    if($scope.writeReviewData.comment_body == undefined || $scope.writeReviewData.comment_body.und[0].value == '' ){
      $scope.serverErrors.push('review is required');
    }else{
      console.log($scope.writeReviewData);
      $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
      businessesService.postReviews($scope.writeReviewData).then(function (data) {
        $scope.writeReviewData = {};
        $state.go('app.businessDetails',{bid:$stateParams.bid});
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
  }

  $scope.takePicture = function(){
    $state.go('app.camSource',{bid:$stateParams.bid});
  }
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
});

OBizR.controller('bizCtrl', function($scope,$state,$ionicHistory,$rootScope,$stateParams,$localStorage,$cordovaGeolocation,ProfileService,businessesService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
    $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
  });
  $scope.$on("$ionicView.enter", function(event, data){
    $rootScope.businessesReview = [];
    $rootScope.businessesDetails = null;
    
    if($stateParams.bid){
      businessesService.searchedBusinessDetails($stateParams.bid).then(function (biz) {
        $rootScope.businessesDetails = biz.nodes[0].node;
        var latm  = $rootScope.businessesDetails.geocode_lat
        var longm = $rootScope.businessesDetails.geocode_long
        //console.log("lat:"+lat+"Log:"+long);
        $localStorage.latm = latm;
        $localStorage.longm = longm;
        businessesService.getBusinessesReview($stateParams.bid).then(function(review) {
          $rootScope.businessesReview = review;
        });
        console.log($rootScope.businessesDetails);
      }).finally(function () { $rootScope.$broadcast('loading:hide');});
      // businessesService.getBusinesses().then(function (biz) {
      //   // for (a=0;a<biz.nodes.length;a++){
      //   //   if(biz.nodes[a].node.nid === $stateParams.bid){
      //   //     flag = false;
      //   //     $rootScope.businessesDetails = biz.nodes[a].node;
			   //   //  var latm  = $rootScope.businessesDetails.geocode_lat
      // 	 //    var longm = $rootScope.businessesDetails.geocode_long
      //   //     //console.log("lat:"+lat+"Log:"+long);
      //   //     $localStorage.latm = latm;
      //   //     $localStorage.longm = longm;
			   //   //  businessesService.getBusinessesReview($stateParams.bid).then(function(review) {
      //   //       $rootScope.businessesReview = review;
      //   //     });
      //   //     console.log($rootScope.businessesDetails);
      //   //     break;
      //   //   }
      //   // }
      // });
    } 
  });

  $scope.showMoreDetails = false;
  $scope.showMoreBizDetail = function () {
    return $scope.showMoreDetails = !$scope.showMoreDetails;
  }
  $scope.writeReviewClick = function () {
    $state.go('app.writeReview',{bid:$stateParams.bid});
  }
  $scope.reviewerDetails = function (rid) {
    console.log(rid);
    $state.go('app.reviewDetails',{rid:rid});
  }
  $scope.reviewerProfile = function(uid){
    $state.go('app.reviewerProfile',{uid:uid});
  }
  $scope.reviewerProfile = function(uid){
    $state.go('app.reviewerProfile',{uid:uid});
  }
  $scope.editBusinessClick = function () {
    $rootScope.editBizData = '';
    $state.go('app.editBusiness',{bid:$stateParams.bid});
  }

  $scope.businessDetailsMapClick = function(){
    $state.go('app.businessDetailsMap',{bid:$stateParams.bid});
  }
  $scope.showDirectionMapClick = function () {
    $state.go('app.businessDirectionsMapOptions',{bid:$stateParams.bid});
  }

  ///////////////////// Show map on business detail page/////////////////////
  var mapOptions = {
    zoom: 15,
    center: new google.maps.LatLng($localStorage.latm, $localStorage.longm),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  //Data
  var latlong = [{
      lat : $localStorage.latm,
      long : $localStorage.longm
    }];

	$scope.window = new google.maps.event.trigger(map, 'resize');
  $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    
  $scope.markers = [];
  var createMarker = function (info){
    var marker = new google.maps.Marker({
      map: $scope.map,
      position: new google.maps.LatLng(info.lat, info.long),
    });     
    $scope.markers.push(marker);  
  }  
  createMarker(latlong[0]); 
});

OBizR.controller('bizCtrlMap', function($scope,$state,$ionicHistory,$rootScope,$stateParams,$localStorage,$cordovaGeolocation,ProfileService,businessesService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });
  $scope.$on("$ionicView.enter", function(event, data){
    if($stateParams.bid){
      $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
	  businessesService.getBusinesses()
        .then(function (biz) {

          for (a=0;a<biz.nodes.length;a++){
            if(biz.nodes[a].node.nid === $stateParams.bid){
              $rootScope.businessesDetailsMap = biz.nodes[a].node;
			   var latm  = $rootScope.businessesDetailsMap.geocode_lat
      		   var longm = $rootScope.businessesDetailsMap.geocode_long
			   var city = $rootScope.businessesDetailsMap.city
			   var title = $rootScope.businessesDetailsMap.title
               //console.log("lat:"+lat+"Log:"+long);
               $localStorage.latm = latm;
               $localStorage.longm = longm;
			   $localStorage.city = city;
			   $localStorage.title = title;
			   
			   console.log($rootScope.businessesDetailsMap);
			   break;
            }
          }
      }) .finally(function () { $rootScope.$broadcast('loading:hide');});
    } 
  });
  
  $scope.reviewerProfile = function(uid){
    $state.go('app.reviewerProfile',{uid:uid});
  }
  
  $scope.showDirectionMapClick = function () {
    $state.go('app.businessDirectionsMapOptions',{bid:$stateParams.bid});
  }
  //////////////////////////////////////////////////////// map
  // Show map on business detail page
  $scope.$on('mapInitialized', function (event, map) {
    window.setTimeout(function() {
        map.setCenter(new google.maps.LatLng($localStorage.latm, $localStorage.longm));
    	}, 100)
	});
  
   var mapOptions = {
        zoom: 15,
        center: new google.maps.LatLng($localStorage.latm, $localStorage.longm),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

  //Data
  var latlong = [{
      lat : $localStorage.latm,
      long : $localStorage.longm,
    	title: $localStorage.title
    }];
	
  $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

  $scope.markers = [];
  var infoWindow = new google.maps.InfoWindow();
  var createMarker = function (info){
      var marker = new google.maps.Marker({
        map: $scope.map,
        position: new google.maps.LatLng(info.lat, info.long),
  			title: info.title
      });
      marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';      
      google.maps.event.addListener(marker, 'click', function(){
      infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
      infoWindow.open($scope.map, marker);
    });
  $scope.markers.push(marker);      
  }  
  createMarker(latlong[0]);   
});

OBizR.controller('bizCtrlMapDirectionsOptions', function($scope,$state,$ionicHistory,$rootScope,$stateParams,$localStorage,$cordovaGeolocation,ProfileService,businessesService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });
  $scope.$on("$ionicView.enter", function(event, data){
    if($stateParams.bid){
      $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
	  businessesService.getBusinesses()
        .then(function (biz) {

          for (a=0;a<biz.nodes.length;a++){
            if(biz.nodes[a].node.nid === $stateParams.bid){
              $rootScope.businessesDetailsMap = biz.nodes[a].node;
			   var latm  = $rootScope.businessesDetailsMap.geocode_lat
      		   var longm = $rootScope.businessesDetailsMap.geocode_long
			   var city = $rootScope.businessesDetailsMap.city
			   var title = $rootScope.businessesDetailsMap.title
               //console.log("lat:"+lat+"Log:"+long);
               $localStorage.latm = latm;
               $localStorage.longm = longm;
			   $localStorage.city = city;
			   $localStorage.title = title;
			   
			   console.log($rootScope.businessesDetailsMap);
			   break;
            }
          }
      }) .finally(function () { $rootScope.$broadcast('loading:hide');});
    } 
  });
  
  $scope.directionStartPoint = function () {
    $state.go('app.businessDirectionsMapStartPoint',{bid:$stateParams.bid});
  }
  $scope.directionEndPoint = function () {
    $state.go('app.businessDirectionsMapEndPoint',{bid:$stateParams.bid});
  }
  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      var lat  = position.coords.latitude //here you get latitude
      var long = position.coords.longitude //here you get the longitude
	  $localStorage.lat=lat;
	  $localStorage.long=long;
          }
      // error
    );
	
	$scope.directionMap = function (choice) {
	 
	if(choice=="google"){
           var link = ""+"http://maps.google.com/maps?saddr="+$localStorage.latm+","+$localStorage.longm+" &daddr="+$localStorage.lat+","+$localStorage.long;
            window.location = link;
	 }
	 if(choice=="apple"){
           
		var link= ""+"http://maps.apple.com/?ll="+$localStorage.latm+","+$localStorage.longm+"&dirflg=d&t=h";
            window.location = link;
	 }
	 if(choice=="waze"){
           var link = ""+"waze://?ll="+$localStorage.latm+","+$localStorage.longm+"&navigate=yes";
            window.location = link;
	 }
	 
        } 
    
});

OBizR.controller('bizCtrlMapDirectionsStartPoint', function($scope,$state,$ionicHistory,$rootScope,$stateParams,$localStorage,$cordovaGeolocation,ProfileService,businessesService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });
  $scope.$on("$ionicView.enter", function(event, data){
    if($stateParams.bid){
      $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
	  businessesService.getBusinesses()
        .then(function (biz) {

          for (a=0;a<biz.nodes.length;a++){
            if(biz.nodes[a].node.nid === $stateParams.bid){
              $rootScope.businessesDetailsMap = biz.nodes[a].node;
			   console.log($rootScope.businessesDetailsMap);
			   break;
            }
          }
      }) .finally(function () { $rootScope.$broadcast('loading:hide');});
    } 
  });
  $scope.directionStartPointLocation = function () {
    $state.go('app.businessDirectionsMapStartPointLocation',{bid:$stateParams.bid});
  }
});

OBizR.controller('bizCtrlMapDirectionsStartPointLocation', function($scope,$state,$ionicHistory,$rootScope,$stateParams,$localStorage,$cordovaGeolocation,ProfileService,businessesService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });
  $scope.$on("$ionicView.enter", function(event, data){
    if($stateParams.bid){
      $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
	  businessesService.getBusinesses()
        .then(function (biz) {

          for (a=0;a<biz.nodes.length;a++){
            if(biz.nodes[a].node.nid === $stateParams.bid){
              $rootScope.businessesDetailsMap = biz.nodes[a].node;
			   console.log($rootScope.businessesDetailsMap);
			   break;
            }
          }
      }) .finally(function () { $rootScope.$broadcast('loading:hide');});
    } 
  });
});

OBizR.controller('bizCtrlMapDirectionsEndPointLocation', function($scope,$state,$ionicHistory,$rootScope,$stateParams,$localStorage,$cordovaGeolocation,ProfileService,businessesService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });
  $scope.$on("$ionicView.enter", function(event, data){
    if($stateParams.bid){
      $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
	  businessesService.getBusinesses()
        .then(function (biz) {

          for (a=0;a<biz.nodes.length;a++){
            if(biz.nodes[a].node.nid === $stateParams.bid){
              $rootScope.businessesDetailsMap = biz.nodes[a].node;
			   console.log($rootScope.businessesDetailsMap);
			   break;
            }
          }
      }) .finally(function () { $rootScope.$broadcast('loading:hide');});
    } 
  });
});

OBizR.controller('bizCtrlMapDirectionsEndPoint', function($scope,$state,$ionicHistory,$rootScope,$stateParams,$localStorage,$cordovaGeolocation,ProfileService,businessesService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });
  $scope.$on("$ionicView.enter", function(event, data){
    if($stateParams.bid){
      $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
	  businessesService.getBusinesses()
        .then(function (biz) {

          for (a=0;a<biz.nodes.length;a++){
            if(biz.nodes[a].node.nid === $stateParams.bid){
              $rootScope.businessesDetailsMap = biz.nodes[a].node;
			   console.log($rootScope.businessesDetailsMap);
			   break;
            }
          }
      }) .finally(function () { $rootScope.$broadcast('loading:hide');});
    } 
  });
  $scope.directionEndPointLocation = function () {
    $state.go('app.businessDirectionsMapEndPointLocation',{bid:$stateParams.bid});
  }
});
OBizR.controller('homeCtrl', function($scope,$state,$ionicHistory,$cordovaGeolocation,$rootScope,$localStorage,ProfileService,businessesService) {
  
  $scope.$on("$ionicView.enter", function(event, data){

      $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
      $ionicHistory.clearHistory(); //hide the back button.

      ProfileService.getProfile()
        .then(function (profile) {
          $rootScope.currentUser = profile;
          console.log($rootScope.currentUser);
      }) .finally(function () {});

      businessesService.getBusinesses()
        .then(function (biz) {
          $rootScope.displayBusinesses = biz.nodes;
          console.log($rootScope.displayBusinesses);
      }) .finally(function () { $rootScope.$broadcast('loading:hide');});
  });

  $scope.getTimeFormat = function (argument) {
    var val = argument.split('-');
    return val[1]+'-'+val[2];
  }
  $scope.getStatus = function (argument) {
    var val = argument.split('-');
    //var status = val[0].split(' ');
    return val[0];
  }
  $scope.businessDetails = function (bid) {
    $state.go('app.businessDetails',{bid:bid});
  }
  $scope.getFilterView = function () {
    $state.go('app.filter');
  }
});

OBizR.controller('SplashCtrl',function($rootScope,$scope,$state,$window,$ionicSlideBoxDelegate){
  $scope.signinClick = function () {
    $state.go('login');
  }
  $scope.signupClick = function () {
    $state.go('signup');
  }
  $scope.nextSlide = function () {
    $ionicSlideBoxDelegate.next();
  }
});

OBizR.controller('DashCtrl', function($scope,$state,$ionicHistory,$rootScope,$localStorage,ProfileService) {
  //$scope.currentUser = profile;
  $scope.$on("$ionicView.enter", function(event, data){
      $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
      $ionicHistory.clearHistory(); //hide the back button.
      ProfileService.getProfile()
        .then(function (profile) {
          $rootScope.currentUser = profile;
          console.log($rootScope.currentUser);
      }) .finally(function () { $rootScope.$broadcast('loading:hide');});
  });

});

OBizR.controller('AccountCtrl', function($scope,AuthenticationService,$localStorage,$ionicHistory,$stateParams,$state,$rootScope,myAccountService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });
  
  $scope.myFriends = function (uid) {
    $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
    myAccountService.getMyFriends($rootScope.currentUser.uid).then(function (data) {
      $rootScope.friends = data.relationships;
      console.log(data.relationships);
    }).finally(function () { $rootScope.$broadcast('loading:hide');});
  } 
  $scope.myFollowers = function (uid) {
    $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
    myAccountService.getMyFollowers($rootScope.currentUser.uid).then(function (data) {
      $rootScope.followers = data.relationships;
      console.log(data);
    }).finally(function () { $rootScope.$broadcast('loading:hide');});
  }
  $scope.myFollowings = function (uid) {
    $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
    myAccountService.getMyFollowings($rootScope.currentUser.uid).then(function (data) {
      $rootScope.followings = data.relationships;
      console.log(data);
    }).finally(function () { $rootScope.$broadcast('loading:hide');});
  }
  $scope.myMessages = function () {
    $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
    myAccountService.getMyMessages($rootScope.currentUser.uid).then(function (data) {
      $rootScope.messages = data;
      console.log(data);
    }).finally(function () { $rootScope.$broadcast('loading:hide');});
  }
  $scope.myBookmarks = function () {
    $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
    myAccountService.getMyBookmarks().then(function (data) {
      $rootScope.bookmarks = data.nodes;
      console.log(data);
    }).finally(function () { $rootScope.$broadcast('loading:hide');});
  }
  $scope.showMyDetails = function (fid) {
    console.log();
  }
  $scope.showProfile = function () {
    $state.go('app.viewProfile');
  }

  $scope.doLogout = function () {
    $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
    AuthenticationService.logout().then(function (data) {
      //$localStorage.$reset({isLogedin:false});
      delete $localStorage.isLogedin;
      $state.go('splash', {}, {reload: true});
      $ionicHistory.clearHistory();
    }).finally(function () {$rootScope.$broadcast('loading:hide');});
  }
});

OBizR.controller('reviewerProfileCtrl', function($scope,$state,$stateParams,businessesService,$rootScope,$localStorage,ProfileService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });
  $scope.$on("$ionicView.enter", function(event, data){
    $rootScope.reviewerProfile = {};
    if($stateParams.uid){
      $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
      businessesService.getReviewerProfile($stateParams.uid)
        .then(function (data) {
          $rootScope.reviewerProfile = data;
          console.log($rootScope.reviewerProfile);
      }) .finally(function () { $rootScope.$broadcast('loading:hide');});
    } 
  });
});

OBizR.controller('ProfileCtrl', function($scope,$rootScope,ProfileService,$ionicHistory,$localStorage,$state,AuthenticationServiceConstant, AuthenticationService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });
  $scope.profileUpdate = {};

  $rootScope.$on('profile:changed', function(e,data) {
    ProfileService.getUpdatedProfile().then(function (updateProfile) {
            $rootScope.profile = updateProfile;
            $rootScope.currentUser = updateProfile;
    }).finally(function () {
       $rootScope.$broadcast('loading:hide');
    });
  });

  $scope.$on("$ionicView.enter", function(event, data){
     ProfileService.getProfile().then(function (profile) {
          $rootScope.profile = profile;
          $scope.profileUpdate = {"uid": profile.uid};
          if(!angular.isArray(profile.field_user_nick_name)){
            $scope.profileUpdate.field_user_nick_name = {"und":[{"value":profile.field_user_nick_name.und[0].value}]};
          }
          if(angular.isArray(profile.field_user_nick_name)){
            $scope.profileUpdate.field_user_nick_name = {"und":[{"value":''}]};
          }
          if(!angular.isArray(profile.field_mobile_user_telephone)){
            $scope.profileUpdate.field_mobile_user_telephone = {"und":[{"value": profile.field_mobile_user_telephone.und[0].value}]};
          }
          if(angular.isArray(profile.field_mobile_user_telephone)){
            $scope.profileUpdate.field_mobile_user_telephone = {"und":[{"value":''}]};
          }
          if(!angular.isArray(profile.field_user_about_me)){
            $scope.profileUpdate.field_user_about_me = {"und":[{"value":profile.field_user_about_me.und[0].value}]};
          }
          if(angular.isArray(profile.field_user_about_me)){
            $scope.profileUpdate.field_user_about_me = {"und":[{"value":""}]};
          }
      }) .finally(function () { });
  });

  $scope.editProfile = function () {
    $state.go('app.updateProfile');
  }

  $scope.saveProfile = function (editProfileForm) {
    $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
    ProfileService.updateProfile($scope.profileUpdate).then(function (profile) {
        $rootScope.$broadcast('profile:changed');
    });
    $state.go('app.viewProfile');
  }
});

OBizR.controller('ForgetPassCtrl',function($rootScope,$scope,$state,$window,$ionicSlideBoxDelegate){
  $rootScope.doSignup = function () {
    console.log($state.is);
  }
});

OBizR.controller('LoginCtrl',function($scope,$rootScope,$cordovaGeolocation,AuthService,$ionicPopup,$state,$ionicLoading,$localStorage,AuthenticationService){
  //data for vm.loginForm
  $scope.user = {};
  $scope.serverErrors = [];
  $scope.doLogin = function(loginForm) {
    $scope.serverErrors = [];
    console.log(loginForm);
    if (loginForm.$valid) {
      $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Connecting...</p>"}});
      AuthenticationService.login($scope.user).then(function (data) {
          console.log(data);
          $rootScope.currentUser = data.user;
          $localStorage.isLogedin = true;
          $rootScope.$broadcast('loading:hide');
          if($localStorage.isLocationAllowed){
            $state.go('app.nearBy', {}, {reload: true});
          }else{
            $state.go('location');
          }
          
        },
        //error
        function (errorResult) {
          if (errorResult.status >= 400 && errorResult.status < 500) {
              $scope.serverErrors.push(errorResult.data[0]);
          }
          if(errorResult.status == -1){
              $scope.serverErrors.push("The 'Access-Control-Allow-Origin' header has a value that is not equal to the supplied origin.");
          }
          else {
            $scope.serverErrors.push(errorResult.statusText);
          }

        }).finally(function() {$rootScope.$broadcast('loading:hide'); });
    } else {
        $scope.serverErrors.push('Username and Password is required');
    }
  }
  $scope.iAgree = function () {
    var confirmPopup = $ionicPopup.confirm({
         template: 'Allow OBizR to access your location while you use the app?',
         cancelText:"Don't Allow",
         okText: 'Allow',
         cancelType:'button button-clear button-positive',
         okType:'button button-clear button-positive'
      });

      confirmPopup.then(function(res) {
        if(res) {
            var posOptions = {timeout: 10000, enableHighAccuracy: false};
            $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
                var lat  = position.coords.latitude
                var long = position.coords.longitude
                console.log("lat:"+lat+"Log:"+long);
                $localStorage.lat = lat;
                $localStorage.long = long;
              }, function(err) {
                console.log(err);
              });
            $state.go('app.nearBy', {}, {reload: true});
            $localStorage.isLocationAllowed = true;
         } else {
            console.log('Not sure!');
         }
      });
  }

  $scope.userEmail = {};
  $scope.passwordReset = function (passwordResetForm){
    $scope.serverErrors = [];
    console.log(passwordResetForm);
    if(passwordResetForm.$valid){
      $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Connecting...</p>"}});
      AuthService.requestNewPassword($scope.userEmail).success(function (res) {
        console.log(res[0]);
        if(res[0] == false){
          $scope.serverErrors.push('Temporarily, service is not available.');
        }else{
          $scope.serverErrors.push('Password reset link has been sent to your email address');
        }
      }).error(function (error) {
        $scope.serverErrors.push(error[0]);       
      }).finally(function () {
        $rootScope.$broadcast('loading:hide');
      });
    }else{
      $scope.serverErrors.push('Please provide Username or Email');
    }
    
  }
  
});
OBizR.controller('SocialCtrl',function($rootScope,$cordovaOauth,$scope,$state,$window,$ionicSlideBoxDelegate){
  $scope.data = [];
  $scope.facebookLogin = function() {
    $cordovaOauth.facebook("325681044294287", ["email"]).then(function(result) {
            // results
            console.log(result);
            alert(JSON.stringify(result));
        }, function(error) {
          alert(JSON.stringify(error));
            // error
    });
  }
  $scope.twitterLogin = function() {

    $cordovaOauth.twitter('YzRRNJ4GvW66ukutM57g','XN181qoow0hrqVoEMnDdb1qnGRo0KK1O7cKmyvV2LM').then(function(result) {
        alert(JSON.stringify(result));
    }, function(error) {
      alert(JSON.stringify(error));
    });
  }
  $scope.googleLogin = function() {
    $cordovaOauth.google('763923498182-4rt0vruclqkc0itb6k4tvl0h3ec2bt95.apps.googleusercontent.com',$scope.data).then(function(result) {
      alert(JSON.stringify(result));
    }, function(error) {
      alert(JSON.stringify(error));
    });
  }

});