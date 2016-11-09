OBizR.controller('filterCtrl', function($scope,$state,$ionicHistory,$cordovaGeolocation,$rootScope,$localStorage,ProfileService,businessesService,taxonomyService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });
  $scope.$on("$ionicView.enter", function(event, data){
  	$rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
      taxonomyService.getCategory()
        .then(function (category) {
          $rootScope.category = category;
      }) .finally(function () { $rootScope.$broadcast('loading:hide');}); 
    taxonomyService.getKeywords()
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
        $rootScope.lastSearchName = '';
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
    if($stateParams.srchId == 'search'){
      $rootScope.$broadcast('loading:show', {loading_settings: {template: "<p><ion-spinner></ion-spinner><br/>Loading...</p>"}});
      businessesService.searchBusinesses($rootScope.searchData.name)
        .then(function (biz) {
          $rootScope.searchedBusinesses = biz.nodes;
          console.log($rootScope.searchedBusinesses);
      }) .finally(function () { $rootScope.$broadcast('loading:hide');});
    }else{
      $rootScope.searchedBusinesses = [];
    }
    
  });
  $scope.businessDetails = function (bid) {
    $state.go('app.businessDetails',{bid:bid});
  }
  $scope.getFilterView = function () {
    $state.go('app.filter');
  }
  $scope.getMapView = function () {
    $state.go('app.mapView');
  }
});

OBizR.controller('otherCtrl', function($scope,$state,$filter,$ionicHistory,$cordovaGeolocation,$rootScope,$localStorage,ProfileService,businessesService,taxonomyService) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  });
  $scope.$on("$ionicView.enter", function(event, data){
    $scope.initializeMap();
  });
  $scope.listBizView = function () {
    $state.go('app.nearBy');
  }
  $scope.getFilterView = function () {
   $state.go('app.filter');
  }

  //////////////////////////Map View///////////////////////////////////
  $scope.initializeMap = function () {
    var options = {timeout: 10000, enableHighAccuracy: true};
    $cordovaGeolocation.getCurrentPosition(options).then(function(position){
      var myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
        var mapOptions = {
          center: myLatLng,
          zoom: 5,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        $scope.map = new google.maps.Map(document.getElementById("map-view"), mapOptions);

        // Additional Markers
        $scope.markers = [];
        var infoWindow = new google.maps.InfoWindow();
        var createMarker = function (biz){
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(biz.geocode_lat, biz.geocode_long),
            map: $scope.map,
            animation: google.maps.Animation.DROP,
            title: biz.title,
            icon: 'assets/img/map-marker.png'
          });

          //Creating marker content
          var createMarkerContent = '<em>' + marker.title + '</em>';
          createMarkerContent += '<div class="biz-ratings '+$filter('ratingClass')(biz.ratings)+'">';
          createMarkerContent += '<div class="star-rating"><span style="width:'+biz.ratings+'"></span></div>';
          createMarkerContent += biz.reviewcount+' Reviews</div>';
          createMarkerContent += '<p>'+biz.street+','+biz.city+'</p>';
          createMarkerContent += '<p>'+biz.distance+' mi'+'</p>';

          marker.content = createMarkerContent;
          google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent(marker.content);
            infoWindow.open($scope.map, marker);
          });
          $scope.markers.push(marker);
        }  
        //Taking 20 nearest biz for standard
        for (i = 0; i < 20; i++){
            createMarker($rootScope.displayBusinesses[i].node);
        }
        console.log($rootScope.displayBusinesses);
      }, function(error){
        console.log("Could not get location");
    });
  }
});