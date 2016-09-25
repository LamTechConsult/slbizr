
SLBizReviews.controller('MainCtrl', function($scope,$localStorage,$rootScope,$state) {
  $rootScope.currentUser = '';
  $rootScope.profile = '';
  $localStorage.isLogedin = 'false';
  $rootScope.isLogedin = 'false';
});

SLBizReviews.controller('writeReviewCtrl', function($scope,$state,$ionicHistory,$rootScope,$stateParams,$localStorage,businessesService) {
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
    //field_ltc_biz_rating:{und:[{rating:$scope.rating,target:null}]}
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
});

SLBizReviews.controller('bizCtrl', function($scope,$state,$ionicHistory,$rootScope,$stateParams,$localStorage,ProfileService,businessesService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });
  $scope.$on("$ionicView.enter", function(event, data){
    $rootScope.businessesReview = [];
    if($stateParams.bid){
      $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
      businessesService.getBusinesses()
        .then(function (biz) {
          console.log($stateParams.bid);
          for (a=0;a<biz.nodes.length;a++){
            if(biz.nodes[a].node.nid === $stateParams.bid){
              $rootScope.businessesDetails = biz.nodes[a].node;
              businessesService.getBusinessesReview($stateParams.bid).then(function(review) {
                $rootScope.businessesReview = review;
              });
              console.log($rootScope.businessesDetails);
              break;
            }
          }
      }) .finally(function () { $rootScope.$broadcast('loading:hide');});
    }
     
  });
  $scope.getTimeFormat = function (argument) {
    if(!argument)
      return;
    var val = argument.split('-');
    return val[1]+'-'+val[2];
  }
  $scope.getStatus = function (argument) {
    if(!argument)
      return;
    var val = argument.split('-');
    //var status = val[0].split(' ');
    return val[0];
  }
  $scope.showMoreDetails = false;
  $scope.showMoreBizDetail = function () {
    return $scope.showMoreDetails = !$scope.showMoreDetails;
  }
  $scope.writeReviewClick = function () {
    $state.go('app.writeReview',{bid:$stateParams.bid});
  }
  
});
SLBizReviews.controller('homeCtrl', function($scope,$state,$ionicHistory,$rootScope,$localStorage,ProfileService,businessesService) {
  
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
});

SLBizReviews.controller('SplashCtrl',function($rootScope,$scope,$state,$window,$ionicSlideBoxDelegate){
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

SLBizReviews.controller('menuCtrl',function($rootScope,$scope,$state,$window,$ionicSlideBoxDelegate){
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });
});

SLBizReviews.controller('DashCtrl', function($scope,$state,$ionicHistory,$rootScope,$localStorage,ProfileService) {
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
SLBizReviews.controller('otherCtrl', function($scope,$state,$ionicHistory,$rootScope,$localStorage,ProfileService) {

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

SLBizReviews.controller('AccountCtrl', function($scope,AuthenticationService,$localStorage,$ionicHistory,$stateParams,$state,$rootScope,myAccountService) {
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

SLBizReviews.controller('subProfileCtrl', function($scope,$state,$rootScope,$localStorage,ProfileService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });
});

SLBizReviews.controller('ProfileCtrl', function($scope,$rootScope,ProfileService,$ionicHistory,$localStorage,$state,AuthenticationServiceConstant, AuthenticationService) {
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

SLBizReviews.controller('ForgetPassCtrl',function($rootScope,$scope,$state,$window,$ionicSlideBoxDelegate){
  $rootScope.doSignup = function () {
    console.log($state.is);
  }
});

SLBizReviews.controller('LoginCtrl',function($scope,$rootScope,AuthService,$ionicPopup,$state,$ionicLoading,$localStorage,AuthenticationService){
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
         template: 'Allow SLBizReviews to access your location while you use the app?',
         cancelText:"Don't Allow",
         okText: 'Allow',
         cancelType:'button button-clear button-positive',
         okType:'button button-clear button-positive'
      });

      confirmPopup.then(function(res) {
        if(res) {
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
SLBizReviews.controller('SocialCtrl',function($rootScope,$cordovaOauth,$scope,$state,$window,$ionicSlideBoxDelegate){
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