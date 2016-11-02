OBizR.controller('filterCtrl', function($scope,$state,$ionicHistory,$cordovaGeolocation,$rootScope,$localStorage,ProfileService,businessesService) {
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
    $scope.initializeFilterData();
  });
  
  $scope.setFilterValFor = function (caseStr) {
    $rootScope.currentFieldName = caseStr;
    $state.go('app.filterSetFieldValue');
  }
  $scope.doCancel = function () {
    $ionicHistory.goBack();
  }
  $scope.doSaveFilterFieldValue = function () {
    $ionicHistory.goBack();

  }
  $scope.initializeFilterData = function () {
    if($rootScope.filter == undefined){
      $rootScope.filter = {};
      //$rootScope.filter.openNow = true;
      $rootScope.filter.claimed = true;
    }
  }
  /////////////////////Autocomplete fuctionality///////////////////////////////
  $scope.setModel = function (item) {
    $scope.selectedItem = item;
     if($rootScope.currentFieldName == 'Category'){
      $rootScope.filter.category = $scope.selectedItem.node.categoryid;
    }else{
      $rootScope.filter.keywords = $scope.selectedItem.keyword.id;
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
  $scope.dofilterSerarch = function () {
    $state.go('app.searchResults',{srchId:'filter'});
  }
});

OBizR.controller('searchCtrl', function($scope,$state,$ionicHistory,$rootScope) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });
  $scope.$on("$ionicView.enter", function(event, data){
    $scope.initializeSearchData();
  });
  $scope.initializeSearchData = function () {
    if($rootScope.searchData == undefined){
        $rootScope.searchData = {};
    }
  }
  $scope.doSearch = function () {
    if ($rootScope.searchData.name == '' || $rootScope.searchData.name == undefined) {
      return;
    }
    $state.go('app.searchResults',{srchId:'search'});
  }
});

OBizR.controller('srchResCtrl', function($scope,$state,$stateParams,$ionicHistory,$rootScope,businessesService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });
  $scope.$on("$ionicView.enter", function(event, data){

    $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
    if($stateParams.srchId == 'search'){
      businessesService.searchBusinesses($rootScope.searchData.name)
        .then(function (biz) {
          $rootScope.searchedBusinesses = biz.nodes;
          console.log($rootScope.searchedBusinesses);
      }) .finally(function () { $rootScope.$broadcast('loading:hide');});
    }
    
  });
  $scope.businessDetails = function (bid) {
    $state.go('app.businessDetails',{bid:bid});
  }
  $scope.getFilterView = function () {
    $state.go('app.filter');
  }
});