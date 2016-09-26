/**
 * BiZ Services :
 */
SLBizReviews.service('businessesService', function($q,$filter,$rootScope,$http,DrupalApiConstant,DataService,NodeResource,CommentResource) {
    var businessesService = {
		  getBusinesses: getBusinesses,
		  getBusinessesReview:getBusinessesReview,
		  sortBusinessesByDistance:sortBusinessesByDistance,
		  postReviews:postReviews,
		  saveBizDistance:saveBizDistance
		}
    var lastFetched = null;
    var businesses = null;
    var reviews = null;
	var defer = $q.defer();

//////////////////////////////////////////////////////////
	function postReviews(reviewData){
		console.log(reviewData);
		var defer = $q.defer();
			CommentResource
	          .create(reviewData)
	          .success(function (data) {
	            defer.resolve(data);
	          })
	          .catch(function (error) {
	            defer.reject(error);
	          });
        return defer.promise;
	}
	function getBusinessesReview(bid) {
		var defer = $q.defer();
			NodeResource
	          .comments({nid: bid})
	          .success(function (data) {
	          	reviews = data;	 
	          	console.log(data);     
	            defer.resolve(reviews);
	          })
	          .catch(function (error) {
	            defer.reject(error);
	          });
        return defer.promise;
	}

	function getBusinesses() {
		var defer = $q.defer();
		if (businesses == null || (Date.now() - lastFetched) > 60 * 10000) {
			DataService.fetchBusinesses().success(function (data) {
		       businesses = data;
		       //saveBizDistance(businesses.nodes);
		       //sortBusinessesByDistance(businesses.nodes);
		        defer.resolve(businesses);
		        lastFetched = Date.now();
		    }).catch(function (error) {
		        defer.reject(error);
		    });
		}else{
			defer.resolve(businesses);
		}
        return defer.promise;
	}
	function saveBizDistance(biz){
		for (a=0;a<biz.length;a++){
			biz[a].node.distance = $filter('distance')($rootScope.storage.lat,$rootScope.storage.long,biz[a].node.geocode_lat,biz.node[a].geocode_long,"N");
		}
		businesses = biz;
	}
	function sortBusinessesByDistance(businesses) {
		// console.log("sortBusinessesByDistance: "+businesses.length);
  //   	for (a=0;a<businesses.length;a++){
  //   		for (b=a+1;b<businesses.length;b++){
  //   			bsA=businesses[a].node;
  //   			bsB=businesses[b].node;
  //   			if (bsA.distance>bsB.distance){
  //   				tmp=businesses[a].node;
  //   				businesses[a].node=bsB;
  //   				businesses[b].node=tmp;
  //   			}
  //   		}
  //   	}
	}

	return businessesService;	
});

/**
 * myAccountService :
 */
SLBizReviews.service('myAccountService', function($q,$http,DrupalApiConstant,DataService) {
	var myAccountService = {
		  getMyFriends: getMyFriends,
		  getMyFollowers:getMyFollowers,
		  getMyFollowings:getMyFollowings,
		  getMyMessages:getMyMessages,
		  getMyBookmarks:getMyBookmarks
	};
	var myFriends = null;
	var myFollowers = null;
	var myFollowings = null;
	var myMessages = null;
	var myBookmarks = null;
	
	
	var lastFetched = null;
	var defer = $q.defer();

	function getMyFriends(uid) {
		var defer = $q.defer();
		if (myFriends == null || (Date.now() - lastFetched) > 60 * 10000) {
			DataService.fetchMyFriends(uid).success(function (data) {
		       myFriends = data;
		        defer.resolve(myFriends);
		        lastFetched = Date.now();
		    }).catch(function (error) {
		        defer.reject(error);
		    });
		}else{
			defer.resolve(myFriends);
		}
        return defer.promise;
	}


	function getMyFollowers(uid) {
		var defer = $q.defer();
		if (myFollowers == null || (Date.now() - lastFetched) > 60 * 10000) {
			DataService.fetchFollowers(uid).success(function (data) {
		        myFollowers = data;
		        defer.resolve(myFollowers);
		        lastFetched = Date.now();
		    }).catch(function (error) {
		        defer.reject(error);
		    });
		}else{
			defer.resolve(myFollowers);
		}
        return defer.promise;
	}
	function getMyFollowings(uid) {
		var defer = $q.defer();
		if (myFollowings == null || (Date.now() - lastFetched) > 60 * 10000) {
			DataService.fetchMyFollowings(uid).success(function (data) {
		        myFollowings = data;
		        defer.resolve(myFollowings);
		        lastFetched = Date.now();
		    }).catch(function (error) {
		        defer.reject(error);
		    });
		}else{
			defer.resolve(myFollowings);
		}
        return defer.promise;
	}
	function getMyMessages(uid) {
		var defer = $q.defer();
		if (myMessages == null || (Date.now() - lastFetched) > 60 * 10000) {
			DataService.fetchMyMessages(uid).success(function (data) {
		         myMessages = data;
		         defer.resolve(myMessages);
		        lastFetched = Date.now();
		    }).catch(function (error) {
		        defer.reject(error);
		    });
		}else{
			defer.resolve(myMessages);
		}
        return defer.promise;
	}
	function getMyBookmarks() {
		var defer = $q.defer();
		if (myBookmarks == null || (Date.now() - lastFetched) > 60 * 10000) {
			DataService.fetchMyBookmarks().success(function (data) {
		         myBookmarks = data;
		         defer.resolve(myBookmarks);
		        lastFetched = Date.now();
		    }).catch(function (error) {
		        defer.reject(error);
		    });
		}else{
			defer.resolve(myBookmarks);
		}
        return defer.promise;
	}

	
	return myAccountService;
});
