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