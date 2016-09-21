SLBizReviews.factory('AuthService', function($http, DrupalApiConstant,UserResourceConstant,AuthenticationHttpInterceptor) {
  var authService = {};
  //var today = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');

  authService.requestNewPassword = function(userEmail) {
    var requestNewPasswordPath = DrupalApiConstant.drupal_instance + DrupalApiConstant.api_endpoint + UserResourceConstant.resourcePath + '/' + UserResourceConstant.actions.request_new_password;
    var header = {"Content-Type": "application/json"};//AuthenticationHttpInterceptor.doRequestCongiguration;
    return $http.post(requestNewPasswordPath,userEmail,header);
  };

  return authService;
});

/**
 * DataService :
 */
SLBizReviews.factory('DataService', function($http,DrupalApiConstant) {
  var dataService = {};
  var basePath = DrupalApiConstant.drupal_instance +DrupalApiConstant.api_endpoint;
  var config = {};
 
  //fetchMyFriends
  dataService.fetchMyFriends = function(uid) {
    url = basePath + "slbiz/user/"+uid+"/friends.json";
    return $http.get(url,config);
  };
   //fetchFollowers
  dataService.fetchFollowers = function(uid) {
    url = basePath + "slbiz/user/"+uid+"/followers.json";
    return $http.get(url,config);
  }
   //fetchMyFollowings
  dataService.fetchMyFollowings = function(uid) {
    url = basePath + "slbiz/user/"+uid+"/following.json";
    return $http.get(url,config);
  }
  //fetchMyMessages
  dataService.fetchMyMessages = function(uid) {
    url = basePath + "slbiz/user/"+uid+"/messages.json";
    return $http.get(url,config);
  }
  //fetchMyBookmarks
  dataService.fetchMyBookmarks = function() {
    url = basePath + "slbiz/user/my-bookmarks.json";
    return $http.get(url,config);
  }

  return dataService;
});